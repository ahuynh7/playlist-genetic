import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    :root {
        --maxWidth: 1280px;
        --sideMargin: 88%;
        --spotifyGreen: #1db954;
        --white: #fff;
        --lightGrey: #F7F7F7;
        --medGrey: #d4dadb; 
        --darkGrey: #A6A6A6;
        --fontSuperBig: 2.5rem;
        --fontBig: 1.5rem;
        --fontMed: 1.2rem;
        --fontSmall: 0.9rem;
    }

    * {
        font-family: Abel, sans-serif;
    }

    body {
        box-sizing: border-box;

        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        #root {
            display: flex;
            flex-direction: column;
            min-height: 100vh; !important
        }
    }
    
    @keyframes floating {
        0% {transform: translate(0,  0px);}
        50%  {transform: translate(0, 12px);}
        100%   {transform: translate(0, -0px);}   
    }
`;