import axios from "axios";
import { Buffer } from "buffer";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { TOKEN } from "../rootReducer";

const ENCODED_ID = Buffer.from(process.env.REACT_APP_CLIENT_ID + ":" + process.env.REACT_APP_CLIENT_SECRET).toString("base64");

export const requestAccessToken = createAsyncThunk("callback",
    async (code, {rejectWithValue}) => {
        try {
            let url = TOKEN;
            let headers = {
                Authorization: "Basic " + ENCODED_ID,
                "Content-Type": "application/x-www-form-urlencoded"
            };
            let params = {
                grant_type: "authorization_code",
                code: code,
                redirect_uri: process.env.REACT_APP_REDIRECT_URI + "login"
            };

            return await axios
                .post(url, null, {headers, params})
                .then(({data}) => data);
        }
        catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const refreshAccessToken = createAsyncThunk("refresh",
    async (refreshToken, {rejectWithValue}) => {
        try {
            let url = TOKEN;
            let headers = {
                Authorization: "Basic " + ENCODED_ID,
                "Content-Type": "application/x-www-form-urlencoded"
            };
            let params = {
                grant_type: "refresh_token",
                refresh_token: refreshToken
            };

            return await axios
                .post(url, null, {headers, params})
                .then(({data}) => data);
        }
        catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const authorizationSlice = createSlice({
    name: "authorization",
    
    initialState: {
        initialAccessToken: null,
        isAuthorized: null,
        isPendingAuthorization: null,
        accessToken: null,
        refreshToken: null,
    },

    //reducer to generate base64 encoded id? and save to state?

    extraReducers: builder => {
        builder.addCase(requestAccessToken.fulfilled, 
            (state, {payload}) => {
                state.initialAccessToken = payload.access_token;
                state.accessToken = payload.access_token;
                state.refreshToken = payload.refresh_token;
                state.isAuthorized = true;
                state.isPendingAuthorization = false;
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
                state.accessToken = payload.access_token;
            }
        );
    }
});

export default authorizationSlice.reducer;