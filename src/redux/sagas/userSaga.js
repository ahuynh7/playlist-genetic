import { delay, put, takeEvery } from 'redux-saga/effects';

import { getPlaylistTracks } from '../slices/userSlice';

//recursive idea which helps paginate api calls.  pass in AsyncThunkAction
function* paginate(action, {meta, payload}) {
    let next = payload.next;

    if (!next) return;

    meta.arg['next'] = next;      //modify arguments
    
    yield delay(1000);      //throttle concept!
    yield put(action(meta.arg));
}

//handles retry given a 429 error
function* retryGetPlaylistTracks(action) {
    if (action.payload.error.status !== 429) return;

    yield delay(parseInt(action.payload['retry-after']) * 1000);        //api returns "retry-after" in seconds
    yield put(getPlaylistTracks(action.meta.arg));
}

//functions to specifically limit getPlaylistTracks dispatches using throttle
function* userSaga() {
    yield takeEvery(getPlaylistTracks.rejected, retryGetPlaylistTracks);        //every rejection, send to be retried
    yield takeEvery(getPlaylistTracks.fulfilled, paginate, getPlaylistTracks);     //every fulfilled, send to be paginated
}

export default userSaga;