import { configureStore, createSelector } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";

import rootSaga from "./rootSaga";
import rootReducer from "./rootReducer";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const selectAuthorization = createSelector(state => state.authorization, i => i);
export const selectUser = createSelector(state => state.user, i => i);
export const selectTop = createSelector(state => state.top, i => i);
export const selectPlaylist = createSelector(state => state.playlist, i => i);

//persist redux store
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["authorization", "user"]
};

//saga middleware to listen to certain dispatches and throttle api calls
const sagaMiddleware = createSagaMiddleware();
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware)
});


sagaMiddleware.run(rootSaga);       //run listener

export const persistor = persistStore(store);
export default store;