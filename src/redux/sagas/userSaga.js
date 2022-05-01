import { delay, put, take } from 'redux-saga/effects';

import { getUser, getUserTopArtists, getUserTopTracks } from '../slices/userSlice';
import { requestAccessToken } from '../slices/authorizationSlice';

//perform check if user exists within database or not

function* userSaga() {
    //once user data has been fetched, dispatch thunks to get playlist, artists, track data
    const {payload} = yield take(requestAccessToken.fulfilled);
    const accessToken = payload.access_token;
    const terms = ['short_term', 'medium_term', 'long_term'];

    yield put(getUser(accessToken));
    
    for (let timeRange of terms) {
        yield put(getUserTopTracks({accessToken, timeRange}));
        yield put(getUserTopArtists({accessToken, timeRange}));
        yield delay(420);
    }
    
    return;
}

export default userSaga;