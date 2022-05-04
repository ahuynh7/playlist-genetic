import { useContext, useEffect } from "react";
import { usePlaylistTracksFetch, useUserPlaylistFetch } from "../../hooks/usePlaylist";
import { Button, ButtonGroup, ButtonToolbar, FormSelect } from "react-bootstrap";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Label } from "recharts";
import { graphTypeEnum, MainContext } from "../Main/Main";

const Graph = () => {
    const {feature, graphType, map, mapTrackList, setFeature} = useContext(MainContext);
    const {fetchPlaylistTracks, targetPlaylist} = usePlaylistTracksFetch();
    const playlists = useUserPlaylistFetch();
    
    const features = [
        "popularity",
        "acousticness",
        "danceability",
        "energy",
        "instrumentalness",
        "liveness",
        "loudness",
        "speechiness",
        "tempo",
        "valence"
    ];

    const configureDomain = () => {
        switch (feature) {
        case "tempo":
            return [50, 200];
        
        case "loudness":
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
        if (targetPlaylist?.analysis && (graphType.current === graphTypeEnum.playlists)) mapTrackList(targetPlaylist.tracks.items);
        
    }, [graphType, mapTrackList, targetPlaylist]);

    return (
        <>
            <FormSelect
                onChange={event => {
                    graphType.current = graphTypeEnum.playlists;
                    fetchPlaylistTracks(event.target.value);
                }}
            >
                <option>select</option>
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
                    <XAxis dataKey="value" allowDataOverflow
                        tick={feature === "tempo" || feature === "loudness"} type="number"
                        domain={configureDomain()}
                    >
                        <Label position="insideBottomRight" offset={-5} value={`greater ${feature}`} />
                        <Label position="insideBottomLeft" offset={-5} value={`lesser ${feature}`} />
                    </XAxis>
                    <YAxis label={{value: "frequency", angle: -90, position: "insideLeft"}}/>
                    <Bar dataKey="freq" fill="#1db954"/>
                </BarChart>
            </ResponsiveContainer>
            <ButtonToolbar>
                <ButtonGroup size="sm">
                    {features.map((feature, i) => 
                        <Button variant="outline-secondary" key={i}
                            disabled={graphType.current === graphTypeEnum.topItems}
                            onClick={() => setFeature(feature)}
                        >
                            {feature}
                        </Button>
                    )}
                </ButtonGroup>
            </ButtonToolbar>
        </>
    );
};

export default Graph;