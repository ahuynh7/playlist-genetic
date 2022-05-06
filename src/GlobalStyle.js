import { createGlobalStyle } from "styled-components";

const documentWidth = document.documentElement.clientWidth;
const windowWidth = window.innerWidth;
const scrollBarWidth = windowWidth - documentWidth;
console.log(scrollBarWidth)

export const GlobalStyle = createGlobalStyle`
    :root {
        --maxWidth: 1280px; 
        --white: #fff;
        --lightGrey: #eee;
        --medGrey: #353535; 
        --darkGrey: #1c1c1c;
        --fontSuperBig: 2.5rem;
        --fontBig: 1.5rem;
        --fontMed: 1.2rem;
        --fontSmall: 1rem;
    }

    * {
        font-family: Abel, sans-serif;
    }

    body {  
        margin: 0;
        padding-right: ${scrollBarWidth}px;
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
`;