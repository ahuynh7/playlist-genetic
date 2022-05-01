import { createContext, useEffect, useRef } from "react";
import { BarChart, Bar, XAxis, YAxis } from "recharts";
import { useUserFetch, useUserPlaylistFetch, useUserTopArtistFetch, useUserTopTrackFetch } from "../../hooks/useUser";

export const UserContext = createContext();

const Main = () => {
    const user = useUserFetch();
    const playlists = useUserPlaylistFetch();
    const topTracks = useUserTopTrackFetch('short_term');
    const topArtists = useUserTopArtistFetch('short_term');

    const contextPackage = {
        user,
        playlists,
        topTracks,
        topArtists
    };

    const map = useRef({});

    useEffect(() => {
        const timer = setTimeout(() => {
            console.log(topArtists);
        }, 3000);

        return () => clearTimeout(timer);
    }, [topArtists]);

    useEffect(() => {
        const timer = setTimeout(() => {
            for (let i = 0; i < 100; i++) {
                map.current[i] = 0
            }
            topTracks.forEach(item => {
                map.current[item.popularity.toString()]++;
            });

        }, 3000);

        return () => clearTimeout(timer);
    }, [topTracks]);

    return (
        <UserContext.Provider value={contextPackage}>
            <div>welcome {user.display_name}</div>
            <BarChart width={932} height={400} data={Object.keys(map.current).map(e => ({name: e, freq: map.current[e]}))}>
                <XAxis dataKey='name' />
                <YAxis />
                <Bar dataKey='freq' fill='#1db954'/>
            </BarChart>
        </UserContext.Provider>
    );
};

export default Main;