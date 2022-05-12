import { configureStore, createSelector } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";

import rootSaga from "./rootSaga";
import rootReducer from "./rootReducer";

export const selectAuthorization = createSelector(state => state.authorization, i => i);
export const selectUser = createSelector(state => state.user, i => i);
export const selectTop = createSelector(state => state.top, i => i);
export const selectPlaylist = createSelector(state => state.playlist, i => i);

//saga middleware to listen to certain dispatches and throttle api calls
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);       //run listener

export default store;