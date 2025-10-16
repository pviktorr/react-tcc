import React from "react";

import LoginPage from './src/pages/Login/Login'; // Importe a sua página de login
import Cadastro from './src/pages/Cadastro/Cadastro'; // Importe a sua página de cadastro
import Home from './src/pages/Home/Home'
import Inicio from './src/pages/Inicio/Inicio'
import Perfil from './src/pages/Perfil/perfil'
import NovaSenha from './src/pages/NovaSenha/Novasenha'
import RecSenha from './src/pages/RecSenha/RecSenha'
import CodigoRec from './src/pages/CodigoRec/CodigoRec'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function AppRoutes() {
    return (
      <>
        <Routes>
          {/* Rota padrão */}
          <Route path="/" element={<Home />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/perfil" element={<Perfil />} />
          
          {/* Demais rotas */}
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/nova-senha" element={<NovaSenha />} />
          <Route path="/recuperar-senha" element={<RecSenha />} />
          <Route path="/codigo-recuperacao" element={<CodigoRec />} />
          
        </Routes>
      </>
    )
}

export default AppRoutes