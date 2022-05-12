
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const ME = "https://api.spotify.com/v1/me";
export const SPOTIFY = "https://api.spotify.com/v1";

const timeRangeEnum = {
    "short_term": "shortTerm",
    "medium_term": "mediumTerm",
    "long_term": "longTerm"
};

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
            return rejectWithValue(error.response.status);
        }
    },
    {
        //only execute on first accessToken 
        condition: (_, {getState}) => getState().authorization.initialAccessToken === getState().authorization.accessToken
    }
);

export const getTopTrackFeatures = createAsyncThunk("top/tracks/audio-features",
    async ({trackIds}, {getState, rejectWithValue}) => {
        try {
            let url = SPOTIFY + "/audio-features";
            let headers = {
                Authorization: "Bearer " + getState().authorization.accessToken,
                "Content-Type": "application/json"
            };
            let params = {
                //id of all tracks to be fetched
                ids: trackIds.join(",")
            };

            return await axios
                .get(url, {headers, params})
                .then(({data}) => data);
        }
        catch (error) {
            return rejectWithValue(error.response.data);
        }
    },
    {
        //condition to check if toptrack list in store exists
        condition: ({timeRange}, {getState}) => getState().top.tracks[timeRangeEnum[timeRange]]
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

export const topSlice = createSlice({
    name: "top",

    initialState: {
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
    },

    extraReducers: builder => {
        builder.addCase(getUserTopTracks.fulfilled,
            (state, {meta, payload}) => {
                payload.items.forEach(track => {
                    state.tracks[timeRangeEnum[meta.arg]][track.id] = track;
                });
            }
        );

        builder.addCase(getTopTrackFeatures.fulfilled,
            (state, {meta, payload}) => {
                //appends tracks with its audio features
                payload.audio_features
                    .filter(feature => feature)     //spotify 404 errors
                    .forEach(feature => {
                        Object.assign(
                            state.tracks[timeRangeEnum[meta.arg.timeRange]][feature.id],
                            feature
                        );
                    });
            }
        );

        builder.addCase(getUserTopArtists.fulfilled,
            (state, {meta, payload}) => {
                payload.items.forEach(artist => {
                    state.artists[timeRangeEnum[meta.arg]][artist.id] = artist;
                });
            }
        );
    }
});

export default topSlice.reducer;