// routes.jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CadastroExames from "../pages/CadastroExames/CadastroExames";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cadastro-exames" element={<CadastroExames />} />
        <Route path="/error-page" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
