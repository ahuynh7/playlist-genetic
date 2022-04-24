import { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
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
                .then(({payload}) => payload.next);
        } while (next);
    }, [accessToken, dispatch, timeRange]);

    useEffect(() => {
        if (isAuthorized && (topTracks.length === 0)) fetch();

    }, [isAuthorized, fetch, topTracks]);

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
                .then(({payload}) => payload.next);
        } while (next);
    }, [accessToken, dispatch, timeRange]);

    useEffect(() => {
        if (isAuthorized && (topArtists.length === 0)) fetch();

    }, [isAuthorized, fetch, topArtists]);

    useEffect(() => setTopArtists(state.top.artists), [state.top.artists]);

    return topArtists;
};
//todo: get tracks within playlists
export const useUserPlaylistFetch = () => {
    const {accessToken, isAuthorized} = useContext(AuthorizationContext);
    const state = useSelector(state => state.user);
    const [playlists, setPlaylists] = useState(state.playlists);
    const dispatch = useDispatch();

    const fetch = useCallback(async () => {
        let next = null;
        
        do {
            next = await dispatch(getUserPlaylists({accessToken, next}))
                .then(({payload}) => payload.next);
        } while (next);
    }, [accessToken, dispatch]);

    useEffect(() => {
        if (isAuthorized && (playlists.length === 0)) fetch();

    }, [isAuthorized, fetch, playlists]);

    useEffect(() => setPlaylists(state.playlists), [state.playlists]);

    return playlists;
};