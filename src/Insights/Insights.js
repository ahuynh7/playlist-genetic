import { useContext } from "react";
import FormRange from "react-bootstrap/esm/FormRange";
import { MainContext } from "../components/Main/Main";
import { InsightsWrapper } from "./Insights.styles";

const GraphInsights = () => {
    const {dataMapper} = useContext(MainContext);

    return (
        <InsightsWrapper>
            <FormRange />
        </InsightsWrapper>
    );
};

export default GraphInsights;