import { configureStore } from '@reduxjs/toolkit';

import authorizationReducer from './slices/authorizationSlice';
import userReducer from './slices/userSlice';

//selector states which hold its respective data
const storeParameter = {
    reducer: {
        authorization: authorizationReducer,
        user: userReducer
    }
};

//redux store; buffer storage
const store = configureStore(storeParameter);

export default store;