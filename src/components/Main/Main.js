import { createContext, useEffect, useRef } from "react";
import { BarChart, Bar, XAxis, YAxis } from "recharts";
import { usePlaylistTracksFetch } from "../../hooks/usePlaylist";
import { useUserFetch, useUserTopArtistFetch, useUserTopTrackFetch } from "../../hooks/useUser";

export const UserContext = createContext();

const Main = () => {
    const user = useUserFetch();
    const topTracks = useUserTopTrackFetch();
    const topArtists = useUserTopArtistFetch();
    const fetchPlaylistTracks = usePlaylistTracksFetch();

    const map = useRef({});

    useEffect(() => {
        const timer = setTimeout(() => {
            console.log(topTracks);
        }, 3000);

        return () => clearTimeout(timer);
    }, [topTracks]);



    return (
        <UserContext.Provider value={user}>
            <div>welcome {user.display_name}</div>
            <li>
                {Object.keys(topTracks).map((e, i) => 
                    <ul key={i}
                        onClick={() => fetchPlaylistTracks()}
                    >
                        {e}
                    </ul>
                )}
            </li>
            <BarChart width={932} height={400} data={Object.keys(map.current).map(e => ({name: e, freq: map.current[e]}))}>
                <XAxis dataKey='name' />
                <YAxis />
                <Bar dataKey='freq' fill='#1db954'/>
            </BarChart>
        </UserContext.Provider>
    );
};

export default Main;