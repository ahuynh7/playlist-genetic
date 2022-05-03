import { delay, put, take } from 'redux-saga/effects';

import { getUser, getUserTopArtists, getUserTopTracks } from '../slices/userSlice';
import { requestAccessToken } from '../slices/authorizationSlice';

//handle 503 errors?

function* userSaga() {
    //once user data has been fetched, dispatch thunks to get playlist, artists, track data
    yield take(requestAccessToken.fulfilled);

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