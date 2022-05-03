import { delay, put, take, takeEvery } from 'redux-saga/effects';

import { getUser, getUserTopArtists, getUserTopTracks } from '../slices/userSlice';
import { requestAccessToken } from '../slices/authorizationSlice';

function* retryGetUserTop(thunk, {meta, payload}) {
    if (payload.error.status !== 503) return;

    yield delay(2000);      //custom retry time
    yield put(thunk(meta.arg));
}

function* userSaga() {
    //once user data has been fetched, dispatch thunks to get playlist, artists, track data
    yield take(requestAccessToken.fulfilled);

    //handle 503 errors
    yield takeEvery(getUserTopTracks.rejected, retryGetUserTop, getUserTopTracks);
    yield takeEvery(getUserTopArtists.rejected, retryGetUserTop, getUserTopArtists);

    const terms = ['short_term', 'medium_term', 'long_term'];

    yield put(getUser());
    
    for (let timeRange of terms) {
        yield put(getUserTopTracks(timeRange));
        yield put(getUserTopArtists(timeRange));
        yield delay(420);
    }
    
    return;
}

export default userSaga;