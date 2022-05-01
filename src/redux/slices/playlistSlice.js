import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const SPOTIFY = 'https://api.spotify.com/v1';

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

export const playlistSlice = createSlice({
    name: 'playlist',

    initialState: {
        playlists: {}
    },

    extraReducers: builder => {
        builder.addCase(getPlaylistTracks.fulfilled,
            (state, {meta, payload}) => {
                //track is null if item is an episode from podcast
                payload.items
                    .filter(({track}) => track ? !track.is_local : false)     //remove local tracks and episodes
                    .forEach(({track}) => {        //adding tracks in key: id and value: track pair
                        state.playlists[meta.arg.playlistId].tracks.items[track.id] = track;
                    })   
            }
        );
    }
});

export default playlistSlice.reducer;