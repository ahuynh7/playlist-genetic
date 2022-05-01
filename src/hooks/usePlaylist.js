import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AuthorizationContext, selectUser } from "../App";
import { getPlaylistTracks } from "../redux/slices/playlistSlice";

export const useUserPlaylistFetch = () => {
    const state = useSelector(selectUser);
    const [playlists, setPlaylists] = useState(state.playlists);

    useEffect(() => setPlaylists(state.playlists), [state.playlists]);

    return playlists;
};

export const usePlaylistTracksFetch = () => {
    const {accessToken} = useContext(AuthorizationContext);
    const dispatch = useDispatch();

    const fetchPlaylistTracks = playlistId => {
        dispatch(getPlaylistTracks({accessToken, playlistId}));
    };

    return fetchPlaylistTracks;
};
