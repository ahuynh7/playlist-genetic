import { actionChannel, all, delay, fork, put, take, takeEvery } from 'redux-saga/effects';
import { requestAccessToken } from '../slices/authorizationSlice';

import { getPlaylistTracks } from '../slices/playlistSlice';
import { getUserPlaylists } from '../slices/userSlice';

//handles retry given a 429 error
function* retryGetPlaylistTracks({meta, payload}) {
    if (payload.error.status !== 429) return;

    yield delay(parseInt(payload['retry-after']) * 1000);        //api returns "retry-after" in seconds
    yield put(getPlaylistTracks(meta.arg));
}

//recursive idea which helps paginate api calls.  pass in AsyncThunkAction
function* paginate({thunk, meta, payload}) {
    let next = payload.next;

    if (!next) return;

    meta.arg['next'] = next;      //modify arguments
    
    yield put(thunk(meta.arg));
}

//throttle concept: leaky-bucket, except the bucket has no limit
export function* throttle(pattern, thunk) {
    //actionChannel takes incoming action patterns to be sequentially executed
    const throttleChannel = yield actionChannel(pattern);
    const rate = 10;      //throttles requests time / second

    while (true) {
        let action = yield take(throttleChannel);

        yield fork(paginate, {...action, thunk});
        yield delay(1000 / rate);
    }
}

function* playlistSaga() {
    const {payload} = yield take(requestAccessToken.fulfilled);

    //side effects to be throttled
    //template: fork(throttle, .fulfilled, ),
    yield all([
        fork(throttle, getUserPlaylists.fulfilled, getUserPlaylists),
        fork(throttle, getPlaylistTracks.fulfilled, getPlaylistTracks),
    ]);

    //initial fetch of playlists
    yield put(getUserPlaylists({accessToken: payload.access_token}));

    //every rejection, send to be retried.  hopefully this shouldn't execute
    yield takeEvery(getPlaylistTracks.rejected, retryGetPlaylistTracks);        
    
}

export default playlistSaga;