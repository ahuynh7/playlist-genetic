import { put, take } from "redux-saga/effects";

import { getUser } from "../slices/userSlice";
import { requestAccessToken } from "../slices/authorizationSlice";

function* userSaga() {
    //once token is acquired, fetch user data
    yield take(requestAccessToken.fulfilled);
    yield put(getUser());
}

export default userSaga;