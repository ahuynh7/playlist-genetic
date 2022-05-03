import { all, fork } from 'redux-saga/effects';

import playlistSaga from "./sagas/playlistSaga";
import userSaga from "./sagas/userSaga";

function* rootSaga() {
    yield all([
        fork(playlistSaga),
        fork(userSaga)
    ]);
}

export default rootSaga;