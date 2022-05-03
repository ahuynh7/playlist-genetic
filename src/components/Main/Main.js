import { createContext, useCallback, useEffect, useState } from "react";
import { Button, ButtonGroup, ButtonToolbar, FormSelect } from "react-bootstrap";
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

    const [map, setMap] = useState({});
    const [feature, setFeature] = useState('popularity');       //default feature is popular

    const features = [
        'popularity',
        'acousticness',
        'danceability',
        'energy',
        'instrumentalness',
        'liveness',
        'loudness',
        'speechiness',
        'tempo',
        'valence'
    ];

    //function to map frequencies of an item's trait given an array
    //artists can only use popularity
    const mapTrackList = useCallback(trackList => { 
        let tempMap = {};

        for (let track in trackList) {
            let dataPoint = Number(trackList[track][feature].toFixed(2));
            
            //remove decimals if feature are these types.  causes data bars to be miniscule
            if (feature === 'tempo' || feature === 'loudness') dataPoint = Math.round(dataPoint);

            if (tempMap[dataPoint]) {
                tempMap[dataPoint]++;
            }
            else {
                tempMap[dataPoint] = 1;
            }
        }
        console.log(tempMap)
        setMap(tempMap);

    }, [feature]);
    
    const configureDomain = () => {
        switch (feature) {
        case 'tempo':
            return [50, 200];
        
        case 'loudness':
            return [-60, 0];

        default:
            return [
                dataMin => dataMin <= 1 ? -0.01 : -1, 
                dataMax => dataMax <= 1 ? 1 : 100
            ]
        }
    }

    //useEffect here handles playlist changes
    useEffect(() => {
        if (targetPlaylist?.analysis) mapTrackList(targetPlaylist.tracks.items);
        
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
                <BarChart data={Object.keys(map)?.map(e => ({value: e, freq: map[e]}))}
                    margin={{top: 20, bottom: 30, left: 10, right: 5}}
                >
                    <XAxis dataKey='value' allowDataOverflow
                        tick={feature === 'tempo' || feature === 'loudness'} type='number'
                        domain={configureDomain()}
                    >
                        <Label position='insideBottomRight' offset={-5} value={`greater ${feature}`} />
                        <Label position='insideBottomLeft' offset={-5} value={`lesser ${feature}`} />
                    </XAxis>
                    <YAxis label={{value: 'frequency', angle: -90, position: 'insideLeft'}}/>
                    <Bar dataKey='freq' fill='#1db954'/>
                </BarChart>
            </ResponsiveContainer>
            <ButtonToolbar>
                <ButtonGroup size='sm'>
                    {features.map((feature, i) => 
                        <Button variant='outline-secondary' key={i}
                            onClick={() => setFeature(feature)}
                        >
                            {feature}
                        </Button>
                    )}
                </ButtonGroup>
            </ButtonToolbar>
        </UserContext.Provider>
    );
};

export default Main;