import axios from 'axios';
import { Buffer } from 'buffer';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const TOKEN = 'https://accounts.spotify.com/api/token';

export const requestAccessToken = createAsyncThunk('request',
    async (code, thunkAPI) => {
        try {
            let url = TOKEN;
            let headers = {
                Authorization: 'Basic ' + Buffer.from(process.env.REACT_APP_CLIENT_ID + ':' + process.env.REACT_APP_CLIENT_SECRET).toString('base64'),
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
                Authorization: 'Basic ' + Buffer.from(process.env.REACT_APP_CLIENT_ID + ':' + process.env.REACT_APP_CLIENT_SECRET).toString('base64'),
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
                state.accessToken = payload.access_token;
                state.refreshToken = payload.refresh_token;
            }    
        );

        builder.addCase(requestAccessToken.rejected,
            state => {
                state.isAuthorized = false;
            }
        );

        builder.addCase(refreshAccessToken.fulfilled,
            (state, {payload}) => {
                state.setExpired = false;
                state.accessToken = payload.access_token;
            }
        );
    }
});

export const {setExpired} = authorizationSlice.actions;
export default authorizationSlice.reducer;