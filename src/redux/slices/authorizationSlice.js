import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const TOKEN = 'https://accounts.spotify.com/api/token';

export const requestAccessToken = createAsyncThunk('api/token',
        async (code, thunkAPI) => {
            try {
                let x = Buffer.from(process.env.REACT_APP_CLIENT_ID + ':' + process.env.REACT_APP_CLIENT_SECRET);
                console.log(x)
                let url = TOKEN;
                let body = {
                    Authorization: 'Basic' + Buffer.from(process.env.REACT_APP_CLIENT_ID + ':' + process.env.REACT_APP_CLIENT_SECRET).toString('base64'),
                    Content_Type: 'application/x-www-form-urlencoded'
                
                };
                let params = {
                    grant_type: 'authorization_code',
                    code: code,
                    redirect_uri: process.env.REACT_APP_REDIRECT_URI + 'login'
                };

                return await axios
                    .post(url, {params})
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