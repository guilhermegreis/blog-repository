import { useEffect, useState } from "react";
import { UserWallpaper, UserIcon } from "./styles";

export function MainPage() {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [repositories, setRepositories] = useState<any[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("github_token");
      console.log("Token do GitHub:", token);
      if (token) {
        const userResponse = await fetch("https://api.github.com/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = await userResponse.json();
        setUserInfo(userData);

        const reposResponse = await fetch("https://api.github.com/user/repos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const reposData = await reposResponse.json();
        setRepositories(reposData);
      } else {
        console.log("Token não encontrado no localStorage.");
      }
    };

    fetchUserData();
  }, []);

  if (!userInfo) return <div>Carregando...</div>;

  return (
    <div>
      <UserWallpaper />
      {userInfo.avatar_url && (
        <UserIcon src={userInfo.avatar_url} alt="Ícone do usuário" />
      )}
      <h2>Repositórios:</h2>
      <ul>
        {repositories.map((repo) => (
          <li key={repo.id}>{repo.name}</li>
        ))}
      </ul>
    </div>
  );
}
