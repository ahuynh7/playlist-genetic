import { Button } from "react-bootstrap";
import styled from "styled-components";

export const LoginWrapper = styled.div`
    width: 100%;
    padding: 200px 20px 50px 20px;
    display: flex;
    flex-direction: column;
`;

export const SpotifyLogo = styled.img`
    height: 50px;
    margin: 25px; 
    align-self: center;
    
`;

export const LoginButton = styled(Button)`
    align-self: center;
`;