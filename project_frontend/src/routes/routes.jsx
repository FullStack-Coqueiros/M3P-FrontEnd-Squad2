// routes.jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CadastroExames from "../pages/CadastroExames/CadastroExames";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cadastro-exames" element={<CadastroExames />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
