import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUserPlaylists } from "../redux/slices/userSlice";
import { AuthorizationContext, selectUser } from "../App";

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