import axios from 'axios';
import { Buffer } from 'buffer';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const TOKEN = 'https://accounts.spotify.com/api/token';

export const requestAccessToken = createAsyncThunk('api/token',
        async (code, thunkAPI) => {
            try {
                let url = TOKEN;
                let headers = {
                    'Authorization': 'Basic ' + Buffer.from(process.env.REACT_APP_CLIENT_ID + ':' + process.env.REACT_APP_CLIENT_SECRET).toString('base64'),
                    'Content-Type': 'application/x-www-form-urlencoded'
                
                };
                let params = {
                    grant_type: 'authorization_code',
                    code: code,
                    redirect_uri: process.env.REACT_APP_REDIRECT_URI + 'login'
                };

                return await axios
                    .post(url, null, {headers, params})
                    .then(x => console.log(x));
            }
            catch (error) {
                return thunkAPI.rejectWithValue({error: error.message});
            }
        }
    )

export const authorizationSlice = createSlice({
    name: 'authorization',
    initialState: {}
});

export default authorizationSlice.reducer;