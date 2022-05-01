import { all, fork } from 'redux-saga/effects';

import { getUserTopArtists, getUserTopTracks } from '../slices/userSlice';
import { throttle } from './playlistSaga';

//perform check if user exists within database or not

function* userSaga() {
    yield all([
        fork(throttle, getUserTopTracks.fulfilled, getUserTopTracks),
        fork(throttle, getUserTopArtists.fulfilled, getUserTopArtists),
    ]);
}

export default userSaga;