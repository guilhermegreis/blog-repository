import { LoginPageBackground, LoginBox, LoginButton } from "./styles";
import { useEffect } from "react";

const CLIENT_ID = "Ov23lizUCkmuWHNeU7FF";
const REDIRECT_URL = "http://localhost:5173/callback";

export function LoginPage() {
  const handleGithubLogin = () => {
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&scope=user`;
    window.location.href = githubAuthUrl;
  };

  const handleGithubCallback = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      const token = await exchangeCodeForToken(code);
      localStorage.setItem("github_token", token);
      console.log("Usuário autenticado com sucesso!");
    }
  };

  const exchangeCodeForToken = async (code: string) => {
    const response = await fetch(
      `https://github.com/login/oauth/access_token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: CLIENT_ID,
          client_secret: "d96a6ce983a37f5cedd82e3a2b3992a62a3a9e2d",
          code,
          redirect_uri: REDIRECT_URL,
        }),
      }
    );

    const data = await response.json();
    return data.access_token;
  };

  useEffect(() => {
    if (window.location.pathname === "/callback") {
      handleGithubCallback();
    }
  });

  return (
    <LoginPageBackground>
      <LoginBox>
        <LoginButton onClick={handleGithubLogin}>
          Faça login com a sua conta GitHub!
        </LoginButton>
      </LoginBox>
    </LoginPageBackground>
  );
}
