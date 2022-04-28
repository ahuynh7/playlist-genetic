import { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    getPlaylistTracks,
    getUser, 
    getUserPlaylists, 
    getUserTopArtists, 
    getUserTopTracks
} from "../redux/slices/userSlice";
import { AuthorizationContext } from "../App";

//token refreshes must also not deploy fetches furthermore, after initial fetch
//      vvvvv
export const useUserFetch = () => {
    const {accessToken} = useContext(AuthorizationContext);
    const state = useSelector(state => state.user);
    const [user, setUser] = useState(state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (accessToken && (Object.keys(user).length === 0)) dispatch(getUser(accessToken));
    }, [accessToken, dispatch, user]);

    useEffect(() => setUser(state.user), [state.user]);

    return user;
};

//do-while loops below continues to get entities if user's total <entities> > 50
//spotify responses provide the "next" url to be request
//if there are no more "next" urls to fetch, stop loop
//      vvvvv
export const useUserTopTrackFetch = timeRange => {
    const {accessToken, isAuthorized} = useContext(AuthorizationContext);
    const state = useSelector(state => state.user);
    const [topTracks, setTopTracks] = useState(state.top.tracks);
    const dispatch = useDispatch();

    const fetch = useCallback(async () => {
        let next = null;
        
        do {
            next = await dispatch(getUserTopTracks({accessToken, next, timeRange}))
                .then(({payload}) => payload.next)
        } while (next);
    }, [accessToken, dispatch, timeRange]);

    useEffect(() => {
        if (isAuthorized) fetch();

    }, [isAuthorized, fetch]);

    useEffect(() => setTopTracks(state.top.tracks), [state.top.tracks]);

    return topTracks;
};

export const useUserTopArtistFetch = timeRange => {
    const {accessToken, isAuthorized} = useContext(AuthorizationContext);
    const state = useSelector(state => state.user);
    const [topArtists, setTopArtists] = useState(state.top.artists);
    const dispatch = useDispatch();
    
    const fetch = useCallback(async () => {
        let next = null;
        
        do {
            next = await dispatch(getUserTopArtists({accessToken, next, timeRange}))
                .then(({payload}) => payload.next)
        } while (next);
    }, [accessToken, dispatch, timeRange]);

    useEffect(() => {
        if (isAuthorized) fetch();

    }, [isAuthorized, fetch]);

    useEffect(() => setTopArtists(state.top.artists), [state.top.artists]);

    return topArtists;
};

export const useUserPlaylistFetch = () => {
    const {accessToken, isAuthorized} = useContext(AuthorizationContext);
    const state = useSelector(state => state.user);
    const [playlists, setPlaylists] = useState(state.playlists);
    const dispatch = useDispatch();

    const fetchTracks = useCallback(playlist => {
        dispatch(getPlaylistTracks({
            accessToken, playlistId: playlist.id,
            ownerId: playlist.owner.id, collaborative: playlist.collaborative
        }));

    }, [accessToken, dispatch]);

    const fetchPlaylists = useCallback(async () => {
        let next = null;
        
        do {
            next = await dispatch(getUserPlaylists({accessToken, next}))
                .then(({payload}) => {
                    //within playlist payload, fetch tracks for each
                    //[payload.items[0]].map(e => fetchTracks(e));
                    payload.items.map(e => fetchTracks(e));

                    return payload.next;
                })
        } while (next);

    }, [accessToken, dispatch, fetchTracks]);

    useEffect(() => {
        if (isAuthorized) fetchPlaylists();

    }, [isAuthorized, fetchPlaylists]);

    useEffect(() => setPlaylists(state.playlists), [state.playlists]);

    return playlists;
};