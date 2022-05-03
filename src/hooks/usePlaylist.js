import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AuthorizationContext, selectPlaylist } from "../App";
import { getPlaylistTracks } from "../redux/slices/playlistSlice";

export const useUserPlaylistFetch = () => {
    const state = useSelector(selectPlaylist);
    const [playlists, setPlaylists] = useState(state.playlists);

    useEffect(() => setPlaylists(state.playlists), [state.playlists]);

    return playlists;
};

export const usePlaylistTracksFetch = () => {
    const {accessToken} = useContext(AuthorizationContext);
    const state = useSelector(selectPlaylist);
    const [targetPlaylist, setTargetPlaylist] = useState();
    const id = useRef('');
    const dispatch = useDispatch();

    //form of lazy loading a playlist
    const fetchPlaylistTracks = playlistId => {
        let playlist = state.playlists[playlistId];
        id.current = playlistId;
        
        if (Object.keys(playlist.tracks.items).length !== 0) {
            setTargetPlaylist(playlist);

            return;
        };

        dispatch(getPlaylistTracks({accessToken, playlistId}));
    };

    useEffect(() => 
        setTargetPlaylist(state.playlists[id.current])
    , [state.playlists]);

    return {fetchPlaylistTracks, targetPlaylist};
};
