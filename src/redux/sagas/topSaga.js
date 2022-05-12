import { delay, put, take, takeEvery } from "redux-saga/effects";

import { getTopTrackFeatures, getUserTopArtists, getUserTopTracks } from "../slices/topSlice";
import { getUser } from "../slices/userSlice";

const terms = ["short_term", "medium_term", "long_term"];

//handles fetching toptrack audio features
function* handleGetTopTrackFeatures({meta, payload}) {
    //map track payload into an array of ids then dispatch
    yield put(getTopTrackFeatures({
        timeRange: meta.arg,
        trackIds: payload.items.map(track => track.id)
    }));
    yield delay(322);
}

function* retryGetUserTop(thunk, {meta, payload}) {
    if (payload !== 503 && payload !== null) return;        //handle timeouts?

    yield delay(2000);      //custom retry time of 2 seconds
    yield put(thunk(meta.arg));
}

function* topSaga() {
    //handle 503 errors, because they are common here
    yield takeEvery(getUserTopTracks.rejected, retryGetUserTop, getUserTopTracks);
    yield takeEvery(getUserTopArtists.rejected, retryGetUserTop, getUserTopArtists);

    //handle fetching top tracks' features given getUserTopTracks payload
    yield takeEvery(getUserTopTracks.fulfilled, handleGetTopTrackFeatures);

    //once user data has been fetched, dispatch thunks to get playlist, artists, track data
    yield take(getUser.fulfilled);
    
    for (let timeRange of terms) {
        yield put(getUserTopTracks(timeRange));
        yield put(getUserTopArtists(timeRange));
        yield delay(420);
    }
}

export default topSaga;