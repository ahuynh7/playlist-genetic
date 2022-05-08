import { Card as CustomCard } from "react-bootstrap";
import styled from "styled-components";

export const Card = styled(CustomCard)`
    width: 121px;
    height: 100%;
    margin: 0 10px;
    padding: 5px;
    border: hidden;
    border-radius: 10px;
    background-color: var(--lightGrey)
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