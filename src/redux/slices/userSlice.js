import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const SPOTIFY = 'https://api.spotify.com/v1';
const ME = 'https://api.spotify.com/v1/me';

export const getUser = createAsyncThunk('me',
    async (accessToken, {rejectWithValue}) => {
        try {
            let url = ME;
            let headers = {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            };

            return await axios
                .get(url, {headers})
                .then(({data}) => data);
        }
        catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getUserTopTracks = createAsyncThunk('top/tracks',
    async ({accessToken, next=null, timeRange}, {rejectWithValue}) => {
        try {
            let url = ME + '/top/tracks';
            let headers = {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            };
            let params = {
                limit: 50,
                //if next is being passed, use offset param, else keep null
                offset: next ? new URLSearchParams(new URL(next).search).get('offset') : null,
                time_range: timeRange
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
        //only execute on first accessToken 
        condition: ({accessToken}, {getState}) => getState().authorization.initialAccessToken === accessToken
    }
);

export const getUserTopArtists = createAsyncThunk('top/artists',
    async ({accessToken, next=null, timeRange}, {rejectWithValue}) => {
        try {
            let url = ME + '/top/artists';
            let headers = {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            };
            let params = {
                limit: 50,
                //if next is being passed, use offset param, else keep null
                offset: next ? new URLSearchParams(new URL(next).search).get('offset') : null,
                time_range: timeRange
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
        //only execute on first accessToken 
        condition: ({accessToken}, {getState}) => getState().authorization.initialAccessToken === accessToken
    }
);

export const getUserPlaylists = createAsyncThunk('playlists',
    async ({accessToken, next=null}, {rejectWithValue}) => {
        try {
            let url = ME + '/playlists';
            let headers = {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            };
            let params = {
                limit: 50,
                //if next is being passed, use offset param, else keep null
                offset: next ? new URLSearchParams(new URL(next).search).get('offset') : null
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
        //only execute on first accessToken 
        condition: ({accessToken}, {getState}) => getState().authorization.initialAccessToken === accessToken
    }
);

export const getPlaylistTracks = createAsyncThunk('playlists/{playlist_id}/tracks',
    async ({accessToken, next=null, playlistId}, {rejectWithValue}) => {
        try {
            let url = SPOTIFY + '/playlists/' + playlistId + '/tracks';
            let headers = {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
                //because so many calls are made per second, api will limit calls; retry after 1 second
            };
            let params = {
                fields: 'items(track(id,is_local,name,popularity,release_date)),next,total',
                limit: 100,      //groups of 100 is max
                //if next is being passed, use offset param, else keep null
                offset: next ? new URLSearchParams(new URL(next).search).get('offset') : null
            };
            
            return await axios                
                .get(url, {headers, params})
                .then(({data}) => data);
        }
        catch (error) {
            return rejectWithValue(Object.assign(error.response.data, error.response.headers));
        }
    },
    {
        //if the playlist is not owned by user and not collaborative
        condition: ({collaborative, ownerId}, {getState}) => (ownerId === getState().user.user.id) && !collaborative
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
        playlists: {},
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
                //then appends to state as key: id and value: playlist pair
                payload.items.filter(e => (e.owner.id === state.user.id) && !e.collaborative)
                    .forEach(e => {
                        e.tracks['items'] = [];        //adding items element to tracks
                        state.playlists[e.id] = e;
                    });
            }
        );

        builder.addCase(getPlaylistTracks.fulfilled,
            (state, {meta, payload}) => {
                state.playlists[meta.arg.playlistId].tracks.items.push.apply(
                    state.playlists[meta.arg.playlistId].tracks.items,
                    payload.items.filter(e => !e.track.is_local)     //remove local tracks
                );
            }
        );
    }
});

export default userSlice.reducer;