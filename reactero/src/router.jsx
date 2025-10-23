import React from "react";

import LoginPage from './pages/Login/Login'; // Importe a sua página de login
import Cadastro from './pages/Cadastro/Cadastro'; // Importe a sua página de cadastro
import Home from './pages/Home/Home'
import Inicio from './pages/Inicio/Inicio'
import Perfil from './pages/Perfil/perfil'
import NovaSenha from './pages/NovaSenha/Novasenha'
import RecSenha from './pages/RecSenha/RecSenha'
import Sobre from './pages/Sobre/sobre'
import CodigoRec from './pages/CodigoRec/CodigoRec'

import { Routes, Route } from "react-router-dom";
function AppRoutes() {
    return (
      <Routes>
        {/* Rota padrão */}
        <Route path="/" element={<Inicio />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/home" element={<Home />} />
        <Route path="/perfil" element={<Perfil />} />
        {/* Demais rotas */}
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/nova-senha" element={<NovaSenha />} />
        <Route path="/recuperar-senha" element={<RecSenha />} />
        <Route path="/codigo-recuperacao" element={<CodigoRec />} />
        <Route path="/sobre" element={<Sobre />} />
      </Routes>
    )
}

export default AppRoutes