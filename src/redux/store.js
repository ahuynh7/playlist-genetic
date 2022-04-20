import { configureStore } from '@reduxjs/toolkit';

import authorizationReducer from './slices/authorizationSlice';

//selector states which hold its respective data
const storeParameter = {
    reducer: {
        authorization: authorizationReducer
    }
};

//redux store; buffer storage
const store = configureStore(storeParameter);

export default store;