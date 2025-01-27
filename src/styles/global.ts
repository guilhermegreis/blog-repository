import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body, html {
        height: 100%;      
        margin: 0;         
        padding: 0;        
        overflow: hidden;  
    }

    body, input, textarea, button {
        font: 400 1rem Roboto, sans-serif;
    }
`;