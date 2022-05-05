import { Card as CustomCard } from "react-bootstrap";
import styled from "styled-components";

export const Card = styled(CustomCard)`
    width: 121px;
    height: 100%;
`;

export const PlaylistImage = styled.img`
    width: 100%;
    height: 121px;
    object-fit: cover;
    position: relative;
    overflow: hidden;
`;