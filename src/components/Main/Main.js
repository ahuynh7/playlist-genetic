import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { FormSelect } from "react-bootstrap";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Label } from "recharts";
import { usePlaylistTracksFetch, useUserPlaylistFetch } from "../../hooks/usePlaylist";
import { useUserFetch, useUserTopArtistFetch, useUserTopTrackFetch } from "../../hooks/useUser";

export const UserContext = createContext();

const Main = () => {
    const user = useUserFetch();
    const playlists = useUserPlaylistFetch();
    const topTracks = useUserTopTrackFetch();
    const topArtists = useUserTopArtistFetch();
    const {fetchPlaylistTracks, targetPlaylist} = usePlaylistTracksFetch();

    const initialMap = useMemo(() => 
        Object.fromEntries(new Map([...Array(100).keys()].map(e => [e, 0])))
    , []);
    const [map, setMap] = useState(initialMap);

    //function to map frequencies of an item's trait given an array
    //artists can only use popularity
    const mapTrackList = useCallback(trackList => { 
        let tempMap = Object.assign({}, initialMap);

        setMap(() => {
            for (let track in trackList) {
                tempMap[trackList[track].popularity]++
            }

            return tempMap;
        });
    }, [initialMap]);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            if (targetPlaylist) mapTrackList(targetPlaylist.tracks.items);
            console.log(targetPlaylist)
        }, 420);

        return () => clearTimeout(timer);
        
    }, [mapTrackList, targetPlaylist]);

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
            <p>top artists</p>
            <li>
                {Object.keys(topArtists).map((e, i) => 
                    <ul key={i}
                        onClick={() => mapTrackList(topArtists[e])}
                    >
                        {e}
                    </ul>
                )}
            </li>
            <p>playlists</p>
            <FormSelect
                onChange={event => fetchPlaylistTracks(event.target.value)}
            >
                {Object.keys(playlists).map((e, i) => 
                    <option key={i} value={e}>
                        {playlists[e].name}
                    </option>
                )}
            </FormSelect>
            <ResponsiveContainer height={400}>
                <BarChart data={Object.keys(map)?.map(e => ({name: e, freq: map[e]}))}
                    margin={{top: 20, bottom: 30, left: 10, right: 5}}
                >
                    <XAxis dataKey='name' tick={false}>
                        <Label position='insideBottomRight' value='popularity' />
                        <Label position='insideBottomLeft' value='popularity' />
                    </XAxis>
                    <YAxis label={{value: 'frequency', angle: -90, position: 'insideLeft'}}/>
                    <Bar dataKey='freq' fill='#1db954'/>
                </BarChart>
            </ResponsiveContainer>
            
        </UserContext.Provider>
    );
};

export default Main;