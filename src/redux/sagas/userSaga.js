import { put, take } from "redux-saga/effects";

import { getUser, userLoaded } from "../slices/userSlice";

function* userSaga() {
    //once token is acquired, fetch user data
    yield take(userLoaded);
    yield put(getUser());
}

export default userSaga;