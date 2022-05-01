import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { selectUser } from "../App";

//token refreshes must also not deploy fetches furthermore, after initial fetch
//      vvvvv
export const useUserFetch = () => {
    const state = useSelector(selectUser);
    const [user, setUser] = useState(state.user);

    useEffect(() => setUser(state.user), [state.user]);

    return user;
};

export const useUserTopTrackFetch = (timeRange=null) => {
    const state = useSelector(selectUser);
    const [topTracks, setTopTracks] = useState(state.top.tracks);

    useEffect(() => setTopTracks(state.top.tracks), [state.top.tracks]);

    return timeRange ? topTracks[timeRange] : topTracks;
};

export const useUserTopArtistFetch = (timeRange=null) => {
    const state = useSelector(selectUser);
    const [topArtists, setTopArtists] = useState(state.top.artists);

    useEffect(() => setTopArtists(state.top.artists), [state.top.artists]);

    return timeRange ? topArtists[timeRange] : topArtists;
};