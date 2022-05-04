import { useContext } from "react";
import { Button, ButtonGroup, ButtonToolbar } from "react-bootstrap";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Label } from "recharts";

import { graphTypeEnum, MainContext } from "../Main/Main";

const features = {
    popularity: ["obscure", "popular"],
    acousticness: ["electronic", "acoustic"],
    danceability: ["relaxed", "danceable"],
    energy: ["lethargic", "energetic"],
    instrumentalness: ["acapella", "instrumental"],
    liveness: ["studio", "live"],
    loudness: ["quite", "loud"],
    speechiness: ["listening", "speechy"],
    tempo: ["slow", "fast"],
    valence: ["downbeat", "upbeat"]
};

const Graph = () => {
    const {feature, graphType, map, setFeature} = useContext(MainContext);

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

    return (
        <>
            <ResponsiveContainer height={400}>
                <BarChart data={Object.keys(map)?.map(e => ({value: e, freq: map[e]}))}
                    margin={{top: 20, bottom: 30, left: 10, right: 5}}
                >
                    <XAxis dataKey="value" allowDataOverflow
                        tick={feature === "tempo" || feature === "loudness"} type="number"
                        domain={configureDomain()}
                    >
                        <Label position="insideBottomRight" offset={-5} value={features[feature][1]} />
                        <Label position="insideBottomLeft" offset={-5} value={features[feature][0]} />
                    </XAxis>
                    <YAxis label={{value: "frequency", angle: -90, position: "insideLeft"}}/>
                    <Bar dataKey="freq" fill="#1db954"/>
                </BarChart>
            </ResponsiveContainer>
            <ButtonToolbar>
                <ButtonGroup size="sm">
                    {Object.keys(features).map((feature, i) => 
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