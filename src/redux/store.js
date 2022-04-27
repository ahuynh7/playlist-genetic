import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';

import authorizationReducer from './slices/authorizationSlice';
import userReducer, { getPlaylistTracks } from './slices/userSlice';

//middleware to listen to certain dispatches and throttle api calls
const listenerMiddleware = createListenerMiddleware();      //similar to createSlice

listenerMiddleware.startListening({
    actionCreator: getPlaylistTracks.rejected,

    effect: async (action, listenerApi) => {
        console.log(listenerApi.getOriginalState())
    }
});

const store = configureStore({        //selector state slices which hold its respective data
    reducer: {
        authorization: authorizationReducer,
        user: userReducer
    },
    middleware: getDefaultMiddleware =>
        //listenerMiddleware is prepended to avoid errors in serializability checks
        getDefaultMiddleware().prepend(listenerMiddleware.middleware)
});

export default store;