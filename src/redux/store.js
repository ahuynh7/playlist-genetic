import { configureStore } from '@reduxjs/toolkit';

import authorizationReducer from './slices/authorizationSlice';
import userReducer from './slices/userSlice';

const storeParameter = {        //selector state slices which hold its respective data
    reducer: {
        authorization: authorizationReducer,
        user: userReducer
    },

};
const store = configureStore(storeParameter);

export default store;