import LoadingOverlayWrapper from "react-loading-overlay-ts";
import styled from "styled-components";

const cardBorderRadius = 10;

export const LoadingOverlay = styled(LoadingOverlayWrapper)`
    width: 132px;
    height: 100%;
    margin: 0 8px;
    padding: 7px;
    border-radius: ${cardBorderRadius}px;
    background-color: ${({selected}) => selected ? "var(--medGrey)" : "var(--lightGrey)"};
    cursor: pointer;

    .card_overlay {
        border-radius: ${cardBorderRadius - 2}px;
    }
`;

export const Card = styled.div`
    height: 100%;
    padding-bottom: 12px;
`;

export const PlaylistImage = styled.img`
    width: 100%;
    height: 118px;
    border-radius: 8px;
    object-fit: cover;
    position: relative;
    overflow: hidden;
`;

export const PlaylistTitle = styled.div`
    padding: 8px 0;
    margin: 0;
    font-size: 15px;
    line-height: 16px;
    max-height: 40px; /* fallback */
    
    overflow: hidden;
    word-wrap: break-word;
    text-overflow: ellipsis;
    display: -webkit-box;

    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`;