import { useContext } from "react";
import { BarChart, Bar, Legend, ResponsiveContainer, XAxis, YAxis, Label } from "recharts";

import { MainContext } from "../Main/Main";
import { GraphWrapper } from "./Graph.styles";
import GradientLegend from "./GradientLegend";

export const featureAdjectives = {
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
    const {feature, map} = useContext(MainContext);

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
        <GraphWrapper>
            <ResponsiveContainer debounce={1}>
                <BarChart
                    data={Object.keys(map)?.map(e => ({value: e, freq: map[e]}))}
                    margin={{bottom: 20}} 
                >
                    <XAxis dataKey="value" allowDataOverflow 
                        tick={feature === "tempo" || feature === "loudness"}
                        tickSize={5}
                        type="number"
                        domain={configureDomain()}
                        padding={{left: 5}}
                    />
                    <YAxis axisLine={false} tickLine={false}>
                        <Label position="insideLeft" value="frequency" angle={-90} offset={6} />
                    </YAxis>
                    <Legend content={<GradientLegend feature={feature} />} />
                    <Bar dataKey="freq" fill="#1db954"/>
                </BarChart>
            </ResponsiveContainer>
        </GraphWrapper>
    );
};

export default Graph;