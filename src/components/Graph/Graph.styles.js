import { ButtonToolbar as CustomButtonToolbar } from "react-bootstrap";
import styled from "styled-components";

export const GraphWrapper = styled.div`
    margin: 10px auto 0 auto;
    width: 88%;
    height: 420px;
`;

export const ButtonToolbar = styled(CustomButtonToolbar)`
    margin: 100px auto 0 auto;
    width: 88%;
    justify-content: end;
`;

export const GradientLegendContent = styled.div`
    display: flex;
    align-items: center;
    padding-left: ${({leftPadding}) => leftPadding}px;

    p {
        font-style: italic;
        margin: 0 0;
    }

    .gradient {
        margin: 0 2.2%;
        height: 8px;
        flex-grow: 1;
        background-image: linear-gradient(to right, #9747FF, #DDC469);
        border-radius: 5px;
    }
`;