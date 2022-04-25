import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const SPOTIFY = 'https://api.spotify.com/v1';
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
    },
    {
        condition: (_, {getState}) => getState().user.top.tracks.length === 0
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
    },
    {
        condition: (_, {getState}) => getState().user.top.artists.length === 0
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
    },
    {
        condition: (_, {getState}) => getState().user.playlists.length === 0
    }
);

export const getPlaylistTracks = createAsyncThunk('playlists/{playlist_id}/tracks',
    ({accessToken, next=null, playlistId, ownerId, collaborative}, thunkAPI) => {
        try {
            //using the thunkAPI to access state values,
            //and throwing an exception if the playlist is not owned by user and not collaborative
            if ((ownerId !== thunkAPI.getState().user.user.id) || collaborative) throw {error: ''};

            let url = SPOTIFY + '/playlists/' + playlistId + '/tracks';
            let headers = {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json',
                'Retry-After': 1        //because so many calls are made per second, api will limit calls; retry after 1 second
            };
            let params = {
                fields: 'items(track(name)),next,total',
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