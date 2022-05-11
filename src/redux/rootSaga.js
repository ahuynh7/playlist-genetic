import { all, fork } from "redux-saga/effects";

import playlistSaga from "./sagas/playlistSaga";
import topSaga from "./sagas/topSaga";
import userSaga from "./sagas/userSaga";

function* rootSaga() {
    yield all([
        fork(userSaga),
        fork(topSaga),
        fork(playlistSaga)
    ]);
}

export default rootSaga;