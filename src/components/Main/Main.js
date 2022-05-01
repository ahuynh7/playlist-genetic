import { createContext, useEffect, useMemo, useState } from "react";
import { BarChart, Bar, XAxis, YAxis } from "recharts";
import { usePlaylistTracksFetch } from "../../hooks/usePlaylist";
import { useUserFetch, useUserTopArtistFetch, useUserTopTrackFetch } from "../../hooks/useUser";

export const UserContext = createContext();

const Main = () => {
    const user = useUserFetch();
    const topTracks = useUserTopTrackFetch();
    const topArtists = useUserTopArtistFetch();
    const fetchPlaylistTracks = usePlaylistTracksFetch();

    const initialMap = useMemo(() => 
        Object.fromEntries(new Map([...Array(100).keys()].map(e => [e, 0])))
    , []);
    const [map, setMap] = useState(initialMap);

    const mapTrackList = trackList => { 
        let tempMap = Object.assign({}, initialMap);

        setMap(() => {
            for (let track in trackList) {
                tempMap[trackList[track].popularity]++
            }

            return tempMap;
        });
    };

    return (
        <UserContext.Provider value={user}>
            <div>welcome {user.display_name}</div>
            <p>top tracks</p>
            <li>
                {Object.keys(topTracks).map((e, i) => 
                    <ul key={i}
                        onClick={() => mapTrackList(topTracks[e])}
                    >
                        {e}
                    </ul>
                )}
            </li>
            <BarChart width={932} height={400} data={Object.keys(map)?.map(e => ({name: e, freq: map[e]}))}>
                <XAxis dataKey='name' />
                <YAxis />
                <Bar dataKey='freq' fill='#1db954'/>
            </BarChart>
        </UserContext.Provider>
    );
};

export default Main;