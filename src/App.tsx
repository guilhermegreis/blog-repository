import { LoginPage } from "./pages/LoginPage";
import { MainPage } from "./pages/MainPage";
import { GlobalStyle } from "./styles/global";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
