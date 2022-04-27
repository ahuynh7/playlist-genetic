import { putResolve, retry, takeEvery } from 'redux-saga/effects';

import { getPlaylistTracks } from '../slices/userSlice';

function* handleGetPlaylistTracks(args) {
    yield putResolve(getPlaylistTracks(args));
}

//handles retry given a 429 error
function* retryGetPlaylistTracks(action) {
    if (action.payload.error.status !== 429) return;

    yield retry(
        1, 
        parseInt(action.payload['retry-after']) * 1000,        //api return "retry-after" in seconds
        handleGetPlaylistTracks, 
        action.meta.arg
    );      
}

//functions to specifically limit getPlaylistTracks dispatches using throttle
function* userSaga() {
    yield takeEvery(getPlaylistTracks.rejected, retryGetPlaylistTracks);
}

export default userSaga;