import React from "react";

import LoginPage from './src/pages/Login/Login'; // Importe a sua página de login
import Cadastro from './src/pages/Cadastro/Cadastro'; // Importe a sua página de cadastro
import Home from './src/pages/Home/Home'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function AppRoutes() {
    return (
      <>
        <Routes>
          {/* Rota padrão */}
          <Route path="/" element={<Home />} />
          
          {/* Demais rotas */}
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/cadastro" element={<Cadastro />} />
          
        </Routes>
      </>
    )
}

export default AppRoutes