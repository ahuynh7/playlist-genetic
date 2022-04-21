import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUser, getUserPlaylists } from "../redux/slices/userSlice";
import { useAuthorization } from "./useAuthorization";

export const useUserFetch = () => {
    const accessToken = useAuthorization();
    const state = useSelector(state => state.user);
    const [user, setUser] = useState(state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (accessToken) dispatch(getUser(accessToken));
    }, [accessToken, dispatch]);

    useEffect(() => setUser(state.user), [state.user]);

    return user;
};

export const useUserPlaylistFetch = () => {
    const accessToken = useAuthorization();
    const state = useSelector(state => state.user);
    const [playlists, setPlaylists] = useState(state.playlists);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!accessToken) return;

        const fetch = async () => {
            let next = null;
            
            //do-while loop continues to get playlists if user's total playlists > 50
            //spotify response provides with the "next" url to request
            //if there are no more "next" urls to fetch, stop loop
            do {
                next = await dispatch(getUserPlaylists({accessToken, next}))
                    .then(({payload}) => payload.next);
            } while (next);
        };

        fetch();
        
    }, [accessToken, dispatch]);

    useEffect(() => setPlaylists(state.playlists), [state.playlists]);

    return playlists;
};