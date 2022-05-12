import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectPlaylist } from "../redux/store";
import { MainContext } from "../components/Main/Main";
import { getPlaylistTracks } from "../redux/slices/playlistSlice";

export const useUserPlaylistFetch = () => {
    const state = useSelector(selectPlaylist);
    const [playlists, setPlaylists] = useState(state);

    useEffect(() => {
        const timer = setTimeout(() => {
            setPlaylists(state);
        }, 222);
        
        return () => clearTimeout(timer);
    
    }, [state]);

    return playlists;
};

export const usePlaylistTracksFetch = () => {
    const {setIsLoading} = useContext(MainContext);
    const state = useSelector(selectPlaylist);
    const dispatch = useDispatch();

    //form of lazy loading a playlist.  return playlist given id
    const playlistTrackFetch = playlistId => {
        let playlist = state[playlistId];
        
        //do not dispatch new request if playlist is complete
        if (playlist.complete || playlist.analysis) return playlist;
        
        setIsLoading(true);     //bypass loading if playlist exists in store
        dispatch(getPlaylistTracks({playlistId}));
    };

    return playlistTrackFetch;
};
