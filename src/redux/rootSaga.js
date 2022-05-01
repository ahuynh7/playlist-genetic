import { all } from 'redux-saga/effects';

import playlistSaga from "./sagas/playlistSaga";
import userSaga from "./sagas/userSaga";

function* rootSaga() {
    yield all([
        playlistSaga,
        userSaga
    ]);
}

export default rootSaga;