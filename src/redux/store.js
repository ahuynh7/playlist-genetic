import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';

import authorizationReducer from './slices/authorizationSlice';
import userReducer from './slices/userSlice';
import userSaga from './sagas/userSaga';

//saga middleware to listen to certain dispatches and throttle api calls
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({        //selector state slices which hold its respective data
    reducer: {
        authorization: authorizationReducer,
        user: userReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware)
});

sagaMiddleware.run(userSaga);       //listener

export default store;