import { useContext } from "react";
import { 
    BarChart, Bar, 
    Legend, 
    ResponsiveContainer, 
    XAxis, YAxis, 
    Label, 
    Tooltip as GraphTooltip 
} from "recharts";

import { MainContext } from "../Main/Main";
import { GraphWrapper } from "./Graph.styles";
import GradientLegend from "./GradientLegend";
import TooltipCursor from "./TooltipCursor";

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
    const {feature, dataMapper} = useContext(MainContext);

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
                    data={dataMapper}
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
                    <GraphTooltip content={null} cursor={<TooltipCursor />} />
                    <Legend content={<GradientLegend feature={feature} />} />
                    <Bar dataKey="freq" fill="#1db954" cursor="pointer"
                        onClick={x => console.log(x)}
                    />
                </BarChart>
            </ResponsiveContainer>
        </GraphWrapper>
    );
};

export default Graph;