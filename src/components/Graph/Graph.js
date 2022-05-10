import { useContext } from "react";
import { DropdownButton } from "react-bootstrap";
import { BarChart, Bar, Legend, ResponsiveContainer, XAxis, YAxis, Label } from "recharts";

import { graphTypeEnum, MainContext } from "../Main/Main";
import { ButtonToolbar, GraphWrapper } from "./Graph.styles";
import GradientLegend from "./GradientLegend";
import DropdownItem from "react-bootstrap/esm/DropdownItem";

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
    
    return ( <>
        <ButtonToolbar>
            <DropdownButton title="Features " size="sm" variant="outline-secondary">
                {Object.keys(featureAdjectives).map((feature, i) => 
                    <DropdownItem variant="outline-secondary" key={i}
                        disabled={graphType.current === graphTypeEnum.topItems}
                        onClick={() => setFeature(feature)}
                    >
                        {feature}
                    </DropdownItem>
                )}
            </DropdownButton>
        </ButtonToolbar>
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
                        <Label position="left" value="frequency" angle={-90} offset={-10} />
                    </YAxis>
                    <Legend content={<GradientLegend feature={feature} />} />
                    <Bar dataKey="freq" fill="#1db954"/>
                </BarChart>
            </ResponsiveContainer>
        </GraphWrapper>
        
        </>
    );
};

export default Graph;