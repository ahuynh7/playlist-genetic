import styled from "styled-components";

export const Logo = styled.img`
    height: ${props => props.height}px;
    margin: ${props => props.height / 2}px; 
    align-self: center;
`;

export const Icon = styled.img`
    height: ${props => props.height}px;
    margin: ${props => props.height / 2}px; 
    margin-left: auto;
`;