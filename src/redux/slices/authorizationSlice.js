import axios from 'axios';
import { Buffer } from 'buffer';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const TOKEN = 'https://accounts.spotify.com/api/token';
const ENCODED_ID = Buffer.from(process.env.REACT_APP_CLIENT_ID + ':' + process.env.REACT_APP_CLIENT_SECRET).toString('base64');

export const requestAccessToken = createAsyncThunk('callback',
    async (code, thunkAPI) => {
        try {
            let url = TOKEN;
            let headers = {
                Authorization: 'Basic ' + ENCODED_ID,
                'Content-Type': 'application/x-www-form-urlencoded'
            };
            let params = {
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: process.env.REACT_APP_REDIRECT_URI + 'login'
            };

            return await axios
                .post(url, null, {headers, params})
                .then(response => response.data);
        }
        catch (error) {
            return thunkAPI.rejectWithValue({error: error.message});
        }
    }
);

export const refreshAccessToken = createAsyncThunk('refresh',
    async (refreshToken, thunkAPI) => {
        try {
            let url = TOKEN;
            let headers = {
                Authorization: 'Basic ' + ENCODED_ID,
                'Content-Type': 'application/x-www-form-urlencoded'
            };
            let params = {
                grant_type: 'refresh_token',
                refresh_token: refreshToken
            };

            return await axios
                .post(url, null, {headers, params})
                .then(response => response.data);
        }
        catch (error) {
            return thunkAPI.rejectWithValue({error: error.message});
        }
    }
);

export const authorizationSlice = createSlice({
    name: 'authorization',
    
    initialState: {
        isAuthorized: null,
        isPendingAuthorization: null,
        isExpired: null,
        accessToken: null,
        refreshToken: null,
    },

    //reducer to generate base64 encoded id? and save to state?
    reducers: {
        setExpired: (state, action) => {
            state.isExpired = action;
        }
    },

    extraReducers: builder => {
        builder.addCase(requestAccessToken.fulfilled, 
            (state, {payload}) => {
                state.isAuthorized = true;
                state.isPendingAuthorization = false;
                state.accessToken = payload.access_token;
                state.refreshToken = payload.refresh_token;
            }    
        );

        builder.addCase(requestAccessToken.pending,
            state => {
                state.isPendingAuthorization = true;
            }
        );

        builder.addCase(requestAccessToken.rejected,
            state => {
                state.isAuthorized = false;
                state.isPendingAuthorization = false;
            }
        );

        builder.addCase(refreshAccessToken.fulfilled,
            (state, {payload}) => {
                state.isExpired = false;
                state.accessToken = payload.access_token;
            }
        );
    }
});

export const {setExpired} = authorizationSlice.actions;
export default authorizationSlice.reducer;