import { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    getUser, 
    getUserPlaylists, 
    getUserTopArtists, 
    getUserTopTracks
} from "../redux/slices/userSlice";
import { AuthorizationContext, selectUser } from "../App";

//token refreshes must also not deploy fetches furthermore, after initial fetch
//      vvvvv
export const useUserFetch = () => {
    const {accessToken} = useContext(AuthorizationContext);
    const state = useSelector(selectUser);
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
    const state = useSelector(selectUser);
    const [topTracks, setTopTracks] = useState(state.top.tracks);
    const dispatch = useDispatch();

    const fetch = useCallback(() => 
        dispatch(getUserTopTracks({accessToken, timeRange}))

    , [accessToken, dispatch, timeRange]);

    useEffect(() => {
        if (isAuthorized) fetch();

    }, [isAuthorized, fetch]);

    useEffect(() => setTopTracks(state.top.tracks), [state.top.tracks]);

    return topTracks;
};

export const useUserTopArtistFetch = timeRange => {
    const {accessToken, isAuthorized} = useContext(AuthorizationContext);
    const state = useSelector(selectUser);
    const [topArtists, setTopArtists] = useState(state.top.artists);
    const dispatch = useDispatch();
    
    const fetch = useCallback(() => 
        dispatch(getUserTopArtists({accessToken, timeRange}))

    , [accessToken, dispatch, timeRange]);

    useEffect(() => {
        if (isAuthorized) fetch();

    }, [isAuthorized, fetch]);

    useEffect(() => setTopArtists(state.top.artists), [state.top.artists]);

    return topArtists;
};

export const useUserPlaylistFetch = () => {
    const {accessToken, isAuthorized} = useContext(AuthorizationContext);
    const state = useSelector(selectUser);
    const [playlists, setPlaylists] = useState(state.playlists);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isAuthorized) dispatch(getUserPlaylists({accessToken}));

    }, [accessToken, dispatch, isAuthorized]);

    useEffect(() => setPlaylists(state.playlists), [state.playlists]);

    return playlists;
};