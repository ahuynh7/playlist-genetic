import { actionChannel, all, delay, fork, put, select, take, takeEvery } from "redux-saga/effects";
import { selectPlaylist } from "../../App";
import { requestAccessToken } from "../slices/authorizationSlice";

import { analyzePlaylist, completePlaylist, getPlaylistTracks, getTrackFeatures, getUserPlaylists } from "../slices/playlistSlice";
import { getUser } from "../slices/userSlice";

//make retry dynamic for getTrackFeatures?
//handles retry given a 429 error
function* retryGetPlaylistTracks({meta, payload}) {
    if (payload.error.status !== 429) return;

    yield delay(parseInt(payload["retry-after"]) * 1000);        //api returns "retry-after" in seconds
    yield put(getPlaylistTracks(meta.arg));
}

function* handleGetTrackFeatures({payload}) {
    let {playlists} = yield select(selectPlaylist);
    let trackList = Object.keys(playlists[payload].tracks.items);

    //splits trackList into 100 item chunks, which is the limit of api query
    for (let i = 0; i < trackList.length; i += 100) {
        yield put(getTrackFeatures({playlistId: payload, trackIds: trackList.slice(i, i + 100)}));
        yield delay(420);
    }

    yield put(analyzePlaylist(payload));        //confirms that playlist has all features fetched
}

//recursive idea which helps paginate api calls.  pass in AsyncThunkAction
function* paginate({meta, payload, thunk, type}) {
    let next = payload.next;
    
    //if getPlaylistTracks is at end of its pagination
    if (!next && (type === getPlaylistTracks.fulfilled.type)) {
        yield put(completePlaylist(meta.arg.playlistId));
    }

    if (!next) return;

    //accounts for some thunk arguments which may accept single values or an object
    yield put(thunk(typeof meta.arg === "string" ? next : {...meta.arg, next}));
}

//throttle concept: leaky-bucket, except the bucket has no limit
export function* throttle(pattern, thunk) {
    //actionChannel takes incoming action patterns to be sequentially executed
    const throttleChannel = yield actionChannel(pattern);
    const rate = 4;      //throttles requests time / second

    while (true) {
        let action = yield take(throttleChannel);
        
        //handle timeout here
        
        yield fork(paginate, {...action, thunk});
        yield delay(1000 / rate);
    }
}

function* playlistSaga() {
    yield take(requestAccessToken.fulfilled);

    //side effects to be throttled
    //template: fork(throttle, .fulfilled, ),
    yield all([
        fork(throttle, getUserPlaylists.fulfilled, getUserPlaylists),
        fork(throttle, getPlaylistTracks.fulfilled, getPlaylistTracks),
    ]);

    //initial fetch of playlists
    yield take(getUser.fulfilled);      //ensures user data is fetched first
    yield put(getUserPlaylists());

    //handle fetching tracks" features given getPlaylistTracks payload
    yield takeEvery(completePlaylist.type, handleGetTrackFeatures);

    //every rejection, send to be retried.  hopefully this shouldn"t execute
    yield takeEvery(getPlaylistTracks.rejected, retryGetPlaylistTracks);        
    
}

export default playlistSaga;