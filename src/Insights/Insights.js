import { useContext, useEffect, useState } from "react";
import { Range } from "react-range";

import { MainContext } from "../components/Main/Main";
import { InsightsLabel, InsightsWrapper, Thumb, Track } from "./Insights.styles";

const GraphInsights = () => {
    const {dataMapper, feature} = useContext(MainContext);
    const [sliderValue, setSliderValue] = useState(0);
    const [selected, setSelected] = useState({});

    //reset slider value if feature or mapping has changed
    useEffect(() => {
        setSliderValue(0);
    }, [dataMapper, feature]);

    //debounce the slider change effect to display the graph insight
    useEffect(() => {
        const timer = setTimeout(() => {
            //render grid of tracks
            setSelected(Object.values(dataMapper)[sliderValue]);
        }, 222);

        return () => clearTimeout(timer);
    }, [dataMapper, sliderValue]);

    //waits for data to mount and derenders if playlist is empty
    return (Object.keys(dataMapper).length !== 0 && 
        <InsightsWrapper>
            {/* add units if feature is tempo or loudness */}
            <InsightsLabel>{`${feature} index:  ${selected ? selected.value : 0}`}</InsightsLabel>
            {/* add spotify feature definition here as description */}
            <Range
                min={0}
                max={Object.keys(dataMapper).length - 1}
                values={[sliderValue]}
                onChange={value => setSliderValue(value[0])}
                renderTrack={({props, children}) => 
                    <Track {...props}>
                        {children}
                    </Track>
                }
                renderThumb={({props}) => 
                    <Thumb {...props} />
                }
            />

        </InsightsWrapper>
    );
};

export default GraphInsights;