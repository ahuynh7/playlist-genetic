import styled from "styled-components";
import { Link } from "react-router-dom";

export const FooterWrapper = styled.footer`
    width: 100%;
    height: 32vh;
    padding: 69px 20vw 88px 20vw;
    margin-top: auto !important;
    background-color: var(--lightGrey);
    bottom: 0;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const FooterLink = styled(Link)`
    font-size: var(--fontMed);
    color: var(--black);
    text-decoration: none;
`;

export const FooterLinkWrapper = styled.div`
    padding: 20px 100px 0 33%;
    
    @media only screen and (max-width: 600px) {
        padding: 20px 50px;    
    }

    h3 {
        margin-top: 20px;
    }

    .flexRow {
        display: inline-flex;

        svg {
            align-self: center;
            margin-right: 5px;
        }
    }
`;