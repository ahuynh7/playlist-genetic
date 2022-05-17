import { ButtonToolbar as CustomButtonToolbar } from "react-bootstrap";
import styled from "styled-components";

export const GraphWrapper = styled.div`
    margin: 10px auto 21vh auto;
    width: var(--sideMargin);
    height: 42vh;
`;

export const ButtonToolbar = styled(CustomButtonToolbar)`
    margin: 10px auto;
    width: var(--sideMargin);
    justify-content: end;
`;

export const GradientLegendContent = styled.div`
    display: flex;
    align-items: center;
    padding-left: ${({leftPadding}) => leftPadding}px;

    p {
        font-style: italic;
        margin: 0;
    }

    .gradient {
        margin: 0 2.2%;
        height: 8px;
        flex-grow: 1;
        background-image: linear-gradient(to right, #9747FF, #DDC469);
        border-radius: 5px;
    }
`;

export const TooltipCursorContent = styled.svg`
    .stop {
        stop-opacity: 1;
    }

    #stop_1 {
        stop-color: rgba(255, 255, 255, 0);
    }

    #stop_2 {
        stop-color: var(--darkGrey);
    }
`;