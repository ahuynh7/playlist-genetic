import { Card as CustomCard } from "react-bootstrap";
import LoadingOverlayWrapper from "react-loading-overlay-ts";
import styled from "styled-components";

const cardBorderRadius = 10;

export const LoadingOverlay = styled(LoadingOverlayWrapper)`
    width: 121px;
    height: 100%;
    margin: 0 10px;
    padding: 5px;
    border: ${({selected}) => selected ? "1px solid" : "hidden"};
    border-radius: ${cardBorderRadius}px;
    background-color: var(--lightGrey);
    cursor: pointer;

    ._loading_overlay_overlay {
        border-radius: ${cardBorderRadius - 2}px;
    }
`;

export const PlaylistImage = styled.img`
    width: 100%;
    height: 121px;
    border-radius: 8px;
    object-fit: cover;
    position: relative;
    overflow: hidden;
`;

export const PlaylistTitle = styled.p`
    margin: 5px 0;
    font-size: 15px;
    line-height: 1;
`;