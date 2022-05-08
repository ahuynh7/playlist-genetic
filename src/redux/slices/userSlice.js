import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const ME = "https://api.spotify.com/v1/me";

const timeRangeEnum = {
    "short_term": "shortTerm",
    "medium_term": "mediumTerm",
    "long_term": "longTerm"
};

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

export const getUserTopTracks = createAsyncThunk("top/tracks",
    async (timeRange, {getState, rejectWithValue}) => {
        try {
            let url = ME + "/top/tracks";
            let headers = {
                Authorization: "Bearer " + getState().authorization.accessToken,
                "Content-Type": "application/json"
            };
            let params = {
                limit: 50,
                time_range: timeRange
            };

            return await axios                
                .get(url, {headers, params})
                .then(({data}) => data);
        }
        catch (error) {
            console.log(error.toJSON())
            return rejectWithValue(error.response.status);
        }
    },
    {
        //only execute on first accessToken 
        condition: (_, {getState}) => getState().authorization.initialAccessToken === getState().authorization.accessToken
    }
);

export const getUserTopArtists = createAsyncThunk("top/artists",
    async (timeRange, {getState, rejectWithValue}) => {
        try {
            let url = ME + "/top/artists";
            let headers = {
                Authorization: "Bearer " + getState().authorization.accessToken,
                "Content-Type": "application/json"
            };
            let params = {
                limit: 50,
                time_range: timeRange
            };

            return await axios                
                .get(url, {headers, params})
                .then(({data}) => data);
        }
        catch (error) {
            return rejectWithValue(error.response.status);
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
    initialState: {
        user: {},
        top: {
            tracks: {
                shortTerm: {},
                mediumTerm: {},
                longTerm: {}
            },
            artists: {
                shortTerm: {},
                mediumTerm: {},
                longTerm: {}
            }
        }
    },

    //push.apply() joins elements of arrays together
    extraReducers: builder => {
        builder.addCase(getUser.fulfilled,
            (state, {payload}) => {
                state.user = payload;
            }
        );
        
        builder.addCase(getUserTopTracks.fulfilled,
            (state, {meta, payload}) => {
                payload.items.forEach(track => {
                    state.top.tracks[timeRangeEnum[meta.arg]][track.id] = track;
                });
            }
        );

        builder.addCase(getUserTopArtists.fulfilled,
            (state, {meta, payload}) => {
                payload.items.forEach(artist => {
                    state.top.artists[timeRangeEnum[meta.arg]][artist.id] = artist;
                });
            }
        );
    }
});

export default userSlice.reducer;