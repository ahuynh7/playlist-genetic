import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';

import authorizationReducer from './slices/authorizationSlice';
import userReducer from './slices/userSlice';

//implement redux saga to manage and limit api calls
const sagaMiddleware = createSagaMiddleware();

//selector state slices which hold its respective data
const storeParameter = {
    reducer: {
        authorization: authorizationReducer,
        user: userReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
};

//redux store; buffer storage
const store = configureStore(storeParameter);

export default store;