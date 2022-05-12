import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { selectTop } from "../redux/store";

export const useUserTopTrackFetch = (timeRange=null) => {
    const state = useSelector(selectTop);
    const [topTracks, setTopTracks] = useState(state.tracks);

    useEffect(() => setTopTracks(state.tracks), [state.tracks]);

    return timeRange ? topTracks[timeRange] : topTracks;
};

export const useUserTopArtistFetch = (timeRange=null) => {
    const state = useSelector(selectTop);
    const [topArtists, setTopArtists] = useState(state.artists);

    useEffect(() => setTopArtists(state.artists), [state.artists]);

    return timeRange ? topArtists[timeRange] : topArtists;
};