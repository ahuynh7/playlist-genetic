import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ME } from "../rootReducer";

export const getUser = createAsyncThunk("me",
    async (_, {getState, rejectWithValue}) => {
        try {
            let url = ME;
            let headers = {
                Authorization: "Bearer " + getState().authorization.accessToken,
                "Content-Type": "application/json"
            };

            return await axios
                .get(url, {headers})
                .then(({data}) => data);
        }
        catch (error) {
            return rejectWithValue(error.response.data);
        }
    },
    {
        //only execute on first accessToken 
        condition: (_, {getState}) => getState().authorization.initialAccessToken === getState().authorization.accessToken
    }
);

export const userSlice = createSlice({
    name: "user",

    //data stored in states as dictionaries to be easily accessed
    initialState: {},

    extraReducers: builder => {
        builder.addCase(getUser.fulfilled,
            (state, {payload}) => {
                state = payload;
            }
        );
    }
});

export default userSlice.reducer;