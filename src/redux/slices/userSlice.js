import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getUser = createAsyncThunk('me',
    (accessToken, thunkAPI) => {
        try {
            let url = 'https://api.spotify.com/v1/me';
            let headers = {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            };

            return axios
                .get(url, {headers})
                .then(response => response.data);
        }
        catch (error) {
            return thunkAPI.rejectWithValue({error: error.message});
        }
    }
);

export const userSlice = createSlice({
    name: 'user',

    initialState: {
        user: {}
    },

    extraReducers: builder => {
        builder.addCase(getUser.fulfilled,
            (state, {payload}) => {
                state.user = payload;
            }
        );
    }
});

export default userSlice.reducer;