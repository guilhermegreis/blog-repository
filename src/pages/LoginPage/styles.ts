import styled from "styled-components";

export const LoginPageBackground = styled.div`
    height: 100vh;     
    width: 100vw;       
    background: url('/wallpaperGit.gif') no-repeat center center fixed;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const LoginBox = styled.div`
    border: 2px solid #ffffff;
    padding: 20px;
    width: 300px;
    box-shadow: 0px 4pxd 6px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    cursor: pointer;
    color: #ffffff;
`;

export const LoginButton = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    color: #ffffff;
`;