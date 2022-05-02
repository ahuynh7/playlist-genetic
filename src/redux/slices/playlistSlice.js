import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const ME = 'https://api.spotify.com/v1/me';
const SPOTIFY = 'https://api.spotify.com/v1';

export const getUserPlaylists = createAsyncThunk('playlists',
    async (next=null, {fulfillWithValue, getState, rejectWithValue}) => {
        try {
            let url = ME + '/playlists';
            let headers = {
                Authorization: 'Bearer ' + getState().authorization.accessToken,
                'Content-Type': 'application/json'
            };
            let params = {
                limit: 50,      //only fetching playlist is limited to 50 items
                //if next is being passed, use offset param, else keep null
                offset: next ? new URLSearchParams(new URL(next).search).get('offset') : null
            };

            //using fulfillWithValue to inject extra meta data (userId)
            return fulfillWithValue(await axios
                .get(url, {headers, params})
                .then(({data}) => data)
            , {userId: getState().user.user.id});
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

export const getPlaylistTracks = createAsyncThunk('playlists/{playlist_id}/tracks',
    async ({next=null, playlistId}, {getState, rejectWithValue}) => {
        try {
            let url = SPOTIFY + '/playlists/' + playlistId + '/tracks';
            let headers = {
                Authorization: 'Bearer ' + getState().authorization.accessToken,
                'Content-Type': 'application/json'
                //because so many calls are made per second, api will limit calls; retry after 1 second
            };
            let params = {
                market: getState().user.user.country,       //specify market value to get accurate popularity index
                fields: 'items(track(id,is_local,restrictions,name,popularity)),next,total',
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
        condition: ({playlistId}, {getState}) => {
            let playlist = getState().playlist.playlists[playlistId];

            return (playlist.owner.id === getState().user.user.id) && !playlist.collaborative
        }
    }
);

export const getTrackFeatures = createAsyncThunk('audio-features',
    async ({trackIds}, {getState, rejectWithValue}) => {
        try {
            let url = SPOTIFY + '/audio-features';
            let headers = {
                Authorization: 'Bearer ' + getState().authorization.accessToken,
                'Content-Type': 'application/json'
            };
            let params = {
                //id of all tracks to be fetched
                ids: trackIds.join(',')
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
        //condition to check if playlist in store exists
        condition: ({playlistId}, {getState}) => getState().playlist.playlists[playlistId]
    }
);

export const playlistSlice = createSlice({
    name: 'playlist',

    initialState: {
        playlists: {}
    },

    reducers: {
        completePlaylist: (state, {payload}) => {
            state.playlists[payload].complete = true;
        }
    },

    extraReducers: builder => {
        builder.addCase(getPlaylistTracks.fulfilled,
            (state, {meta, payload}) => {
                //track is null if item is an episode from podcast
                payload.items
                    .filter(({track}) => track ?        //remove local tracks, episodes, and restricted tracks
                        !(track.is_local || track.restrictions)
                        :
                        false)     
                    .forEach(({track}) => {        //adding tracks in key: id and value: track pair
                        state.playlists[meta.arg.playlistId].tracks.items[track.id] = track;
                    })   
            }
        );

        builder.addCase(getUserPlaylists.fulfilled,
            (state, {meta, payload}) => {
                //filters only playlists own/created by the user; excludes followed playlists
                //then appends to state as key: id and value: playlist pair
                payload.items
                    .filter(e => (e.owner.id === meta.userId) && !e.collaborative)
                    .forEach(playlist => {
                        playlist['complete'] = null;        //boolean which monitors if all playlist tracks have been fetched
                        playlist.tracks['items'] = {};        //adding items element to tracks
                        state.playlists[playlist.id] = playlist;
                    });
            }
        );

        builder.addCase(getTrackFeatures.fulfilled,
            (state, {meta, payload}) => {
                //appends tracks with its audio features
                console.log(meta, payload)
                payload.audio_features.forEach(feature => {
                    Object.assign(
                        state.playlists[meta.arg.playlistId].tracks.items[feature.id],
                        feature
                    );
                });
            }
        );
    }
});

export const {completePlaylist} = playlistSlice.actions;
export default playlistSlice.reducer;