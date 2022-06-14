import styled from "styled-components";
import { Link } from "react-router-dom";

export const FooterWrapper = styled.footer`
    width: 100%;
    height: 32vh;
    padding: 69px 20vw;
    margin-top: auto;
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