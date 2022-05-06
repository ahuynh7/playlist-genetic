import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";

import authorizationReducer from "./slices/authorizationSlice";
import playlistReducer from "./slices/playlistSlice";
import userReducer from "./slices/userSlice";
import rootSaga from "./rootSaga";

//saga middleware to listen to certain dispatches and throttle api calls
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({        //selector state slices which hold its respective data
    reducer: {
        authorization: authorizationReducer,
        playlist: playlistReducer,
        user: userReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);       //run listener

export default store;