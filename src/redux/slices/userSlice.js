import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const ME = 'https://api.spotify.com/v1/me';

export const getUser = createAsyncThunk('me',
    (accessToken, thunkAPI) => {
        try {
            let url = ME;
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

export const getUserTopTracks = createAsyncThunk('top/tracks',
    ({accessToken, next=null, timeRange}, thunkAPI) => {
        try {
            let url = ME + '/top/tracks';
            let headers = {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            };
            let params = {
                limit: 50,      //groups of 50 is max
                //if next is being passed, use offset param, else keep null
                offset: next ? new URLSearchParams(new URL(next).search).get('offset') : null,
                time_range: timeRange
            };

            return axios                
                .get(url, {headers, params})
                .then(response => response.data);
        }
        catch (error) {
            return thunkAPI.rejectWithValue({error: error.message});
        }
    }
);

export const getUserTopArtists = createAsyncThunk('top/artists',
    ({accessToken, next=null, timeRange}, thunkAPI) => {
        try {
            let url = ME + '/top/artists';
            let headers = {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            };
            let params = {
                limit: 50,      //groups of 50 is max
                //if next is being passed, use offset param, else keep null
                offset: next ? new URLSearchParams(new URL(next).search).get('offset') : null,
                time_range: timeRange
            };

            return axios                
                .get(url, {headers, params})
                .then(response => response.data);
        }
        catch (error) {
            return thunkAPI.rejectWithValue({error: error.message});
        }
    }
);

export const getUserPlaylists = createAsyncThunk('playlists',
    ({accessToken, next=null}, thunkAPI) => {
        try {
            let url = ME + '/playlists';
            let headers = {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            };
            let params = {
                limit: 50,      //groups of 50 is max
                //if next is being passed, use offset param, else keep null
                offset: next ? new URLSearchParams(new URL(next).search).get('offset') : null
            };

            return axios                
                .get(url, {headers, params})
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
        user: {},
        top: {
            tracks: [],
            artists: []
        },
        playlists: [],
    },

    //push.apply() joins elements of arrays together
    extraReducers: builder => {
        builder.addCase(getUser.fulfilled,
            (state, {payload}) => {
                state.user = payload;
            }
        );
        
        builder.addCase(getUserTopTracks.fulfilled,
            (state, {payload}) => {
                state.top.tracks.push.apply(
                    state.top.tracks,
                    payload.items
                );
            }
        );

        builder.addCase(getUserTopArtists.fulfilled,
            (state, {payload}) => {
                state.top.artists.push.apply(
                    state.top.artists,
                    payload.items
                );
            }
        );

        builder.addCase(getUserPlaylists.fulfilled,
            (state, {payload}) => {
                //filters only playlists own/created by the user; excludes followed playlists
                state.playlists.push.apply(     
                    state.playlists, 
                    payload.items.filter(e => (e.owner.id === state.user.id) && !e.collaborative)
                );
            }
        );
    }
});

export default userSlice.reducer;