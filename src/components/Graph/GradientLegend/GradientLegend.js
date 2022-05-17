import { useEffect, useRef } from "react";
import { featureAdjectives } from "../Graph";
import { GradientLegendContent } from "../Graph.styles";

const GradientLegend = ({feature, chartWidth}) => {
    const leftPadding = useRef(0);

    //offsets the padding to have legend appear directly under the xAxis
    //probably not the best way to go at this
    //TODO: fix bug where if browser window is so narrow, the element disappears, resulting in undefined typeerror
    useEffect(() => {
        leftPadding.current = chartWidth - document
            .getElementsByClassName("recharts-cartesian-axis-line")[0]
            .getAttribute("width");
        
    }, [chartWidth]);

    return (
        <GradientLegendContent leftPadding={leftPadding.current} >
            <p>{featureAdjectives[feature][0]}</p>
            <div className="gradient" />
            <p>{featureAdjectives[feature][1]}</p>
        </GradientLegendContent>
    );
};

export default GradientLegend;