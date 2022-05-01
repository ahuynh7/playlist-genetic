import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const ME = 'https://api.spotify.com/v1/me';

const timeRangeEnum = {
    'short_term': 'shortTerm',
    'medium_term': 'mediumTerm',
    'long_term': 'longTerm'
};

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
    },
    {
        //only execute on first accessToken 
        condition: (accessToken, {getState}) => getState().authorization.initialAccessToken === accessToken
    }
);

export const getUserTopTracks = createAsyncThunk('top/tracks',
    async ({accessToken, timeRange}, {rejectWithValue}) => {
        try {
            let url = ME + '/top/tracks';
            let headers = {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
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
            return rejectWithValue(error.response.data);
        }
    },
    {
        //only execute on first accessToken 
        condition: ({accessToken}, {getState}) => getState().authorization.initialAccessToken === accessToken
    }
);

export const getUserTopArtists = createAsyncThunk('top/artists',
    async ({accessToken, timeRange}, {rejectWithValue}) => {
        try {
            let url = ME + '/top/artists';
            let headers = {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
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
                limit: 50,      //only fetching playlist is limited to 50 items
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

export const userSlice = createSlice({
    name: 'user',

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
            (state, {meta, payload}) => {
                payload.items.forEach(track => {
                    state.top.tracks[timeRangeEnum[meta.arg.timeRange]][track.id] = track;
                });
            }
        );

        builder.addCase(getUserTopArtists.fulfilled,
            (state, {meta, payload}) => {
                payload.items.forEach(artist => {
                    state.top.artists[timeRangeEnum[meta.arg.timeRange]][artist.id] = artist;
                });
            }
        );

        builder.addCase(getUserPlaylists.fulfilled,
            (state, {payload}) => {
                //filters only playlists own/created by the user; excludes followed playlists
                //then appends to state as key: id and value: playlist pair
                payload.items
                    .filter(e => (e.owner.id === state.user.id) && !e.collaborative)
                    .forEach(e => {
                        e.tracks['items'] = {};        //adding items element to tracks
                        state.playlists[e.id] = e;
                    });
            }
        );
    }
});

export default userSlice.reducer;