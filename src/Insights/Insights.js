import { useContext, useEffect, useState } from "react";
import { Range } from "react-range";

import { MainContext } from "../components/Main/Main";
import { InsightsLabel, InsightsWrapper, Thumb, Track } from "./Insights.styles";
import InsightsGrid from "./InsightsGrid/InsightsGrid";

const GraphInsights = () => {
    const {dataMapper, feature, setSliderValue, sliderValue} = useContext(MainContext);
    const [selected, setSelected] = useState({});
    const [bufferValue, setBufferValue] = useState(sliderValue);
    console.log('x')
    //reset slider value if feature or mapping has changed
    useEffect(() => {
        setBufferValue(0);
    }, [dataMapper, setSliderValue]);

    //debounce the buffer slider change effect to display the graph insight
    useEffect(() => {
        const timer = setTimeout(() => {
            setSelected(Object.values(dataMapper)[bufferValue]);
        }, 222);

        return () => clearTimeout(timer);
    }, [dataMapper, bufferValue]);

    useEffect(() => {
        setSelected(Object.values(dataMapper)[sliderValue])
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
                values={[bufferValue]}
                onChange={value => setBufferValue(value[0])}
                onFinalChange={value => setSliderValue(value[0])}
                renderTrack={({props, children}) => 
                    <Track {...props}>
                        {children}
                    </Track>
                }
                renderThumb={({props}) => 
                    <Thumb {...props} />
                }
            />
            <InsightsGrid tracks={selected?.tracks} />
        </InsightsWrapper>
    );
};

export default GraphInsights;