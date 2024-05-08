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
    acousticness: ["synthetic", "acoustic"],
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
    const {feature, chartMapper, setSliderValue} = useContext(MainContext);

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
            <ResponsiveContainer debounce={1} minWidth={50} minHeight={50}>
                <BarChart
                    data={chartMapper}
                    margin={{bottom: 20}} 
                    height={100}
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
                    <GraphTooltip content={<></>} cursor={<TooltipCursor />} />
                    <Legend content={<GradientLegend feature={feature} />} />
                    <Bar dataKey="freq" fill="#1db954" cursor="pointer"
                        //if use clicks on a bar, it will show its insights
                        onClick={({payload}) => setSliderValue(chartMapper.findIndex(e => e.value === payload.value))}
                    />
                </BarChart>
            </ResponsiveContainer>
        </GraphWrapper>
    );
};

export default Graph;