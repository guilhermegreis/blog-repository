import { useEffect, useState } from "react";
import { LoginPageBackground, LoginBox, LoginButton } from "./styles";

const CLIENT_ID = "Ov23lizUCkmuWHNeU7FF";
const REDIRECT_URL = "http://localhost:5173/home";

export function LoginPage() {
  const [token, setToken] = useState<string | null>(null);

  const handleGithubLogin = () => {
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&scope=user,repo`;
    console.log("Redirecionando para: ", githubAuthUrl);
    window.location.href = githubAuthUrl;
  };

  const handleGithubCallback = async () => {
    console.log("URL da página após o redirecionamento:", window.location.href);
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    console.log("Código recebido:", code);

    if (code) {
      const token = await exchangeCodeForToken(code);
      console.log("Token recebido:", token);
      if (token) {
        localStorage.setItem("github_token", token);
        setToken(token);
        console.log("Usuário autenticado com sucesso!");
      } else {
        console.log("Erro ao obter token!");
      }
    } else {
      console.log("Código não encontrado na URL.");
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
    console.log("Resposta da API ao trocar o código por token:", data);
    return data.access_token;
  };

  useEffect(() => {
    if (window.location.pathname === "/home") {
      handleGithubCallback();
    }
  }, []);

  useEffect(() => {
    if (token) {
      console.log("Redirecionando para /main com o token.");
      window.location.href = "/main";
    }
  }, [token]);

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
