import { useContext, useEffect, useState } from "react";
import { Range } from "react-range";

import { MainContext } from "../components/Main/Main";
import { InsightsWrapper, Thumb, Track } from "./Insights.styles";

const GraphInsights = () => {
    const {dataMapper} = useContext(MainContext);
    const [sliderValue, setSliderValue] = useState(0);

    //debounce the slider change effect to display the graph insight
    useEffect(() => {
        const timer = setTimeout(() => {
            //render grid of tracks
            console.log(Object.values(dataMapper)[sliderValue])
        }, 222);

        return () => clearTimeout(timer);
    }, [dataMapper, sliderValue]);

    return (Object.keys(dataMapper).length !== 0 && 
        <InsightsWrapper>
            <Range
                min={0}
                max={Object.keys(dataMapper).length - 1}
                values={[sliderValue]}
                onChange={value => setSliderValue(value[0])}
                renderTrack={({props, children}) => <Track {...props}>
                    {children}
                </Track>}
                renderThumb={({props}) => <Thumb {...props} />}
            />
        </InsightsWrapper>
    );
};

export default GraphInsights;