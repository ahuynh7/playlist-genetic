import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AuthorizationContext, selectPlaylist } from "../App";
import { MainContext } from "../components/Main/Main";
import { getPlaylistTracks } from "../redux/slices/playlistSlice";

export const useUserPlaylistFetch = () => {
    const state = useSelector(selectPlaylist);
    const [playlists, setPlaylists] = useState(state.playlists);

    useEffect(() => {
        const timer = setTimeout(() => {
            setPlaylists(state.playlists);
        }, 222);
        
        return () => clearTimeout(timer);
    
    }, [state.playlists]);

    return playlists;
};

export const usePlaylistTracksFetch = () => {
    const {accessToken} = useContext(AuthorizationContext);
    const {setIsLoading} = useContext(MainContext);
    const state = useSelector(selectPlaylist);
    const [targetPlaylist, setTargetPlaylist] = useState();
    const id = useRef("");
    const dispatch = useDispatch();

    //form of lazy loading a playlist
    const fetchPlaylistTracks = playlistId => {
        let playlist = state.playlists[playlistId];
        id.current = playlistId;
        
        //do not dispatch new request if playlist is complete
        if (playlist.complete || playlist.analysis) {
            setTargetPlaylist(playlist);

            return;
        };
        console.log(state.playlists)
        setIsLoading(true);     //bypass loading if playlist exists in store
        dispatch(getPlaylistTracks({accessToken, playlistId}));
    };

    useEffect(() => 
        setTargetPlaylist(state.playlists[id.current])
    , [state.playlists]);

    return {fetchPlaylistTracks, targetPlaylist};
};
