import { useContext } from "react";
import { DropdownButton } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";

import { graphTypeEnum, MainContext } from "../../Main/Main";
import { ButtonToolbar } from "../Graph.styles";
import { featureAdjectives } from "../Graph";

const FeaturesDropdown = () => {
    const {graphType, setFeature} = useContext(MainContext);

    return (
        <ButtonToolbar>
            <DropdownButton title="Features " size="sm" variant="outline-secondary">
                {Object.keys(featureAdjectives).map((feature, i) => 
                    <DropdownItem variant="outline-secondary" key={i}
                        disabled={graphType.current === graphTypeEnum.topArtists}
                        onClick={() => setFeature(feature)}
                    >
                        {feature}
                    </DropdownItem>
                )}
            </DropdownButton>
        </ButtonToolbar>
    );
};

export default FeaturesDropdown;