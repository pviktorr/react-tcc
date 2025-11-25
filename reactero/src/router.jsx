import React from "react";
import Bemvindo from './pages/BemVindo/bemvindo';
import LoginPage from './pages/Login/Login'; 
import Cadastro from './pages/Cadastro/Cadastro'; 
import Home from './pages/Home/Home'
import Localidades from './pages/Localidades/Localidades'
import Perfil from './pages/Perfil/perfil'
import NovaSenha from './pages/NovaSenha/Novasenha'
import RecSenha from './pages/RecSenha/RecSenha'
import Sobre from './pages/Sobre/sobre'
import CodigoRec from './pages/CodigoRec/CodigoRec'
import CalendarPage from './pages/Calendario/Calendario'
import Registros from './pages/Registros/Registros'

import { Routes, Route } from "react-router-dom";
function AppRoutes() {
    return (
      <Routes>
        {/* Rota padrão */}
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/home" element={<Home />} />
        <Route path="/perfil" element={<Perfil />} />
         <Route path="/localidade" element={<Localidades />} />

        <Route path="/Login" element={<LoginPage />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/nova-senha" element={<NovaSenha />} />
        <Route path="/recuperar-senha" element={<RecSenha />} />
        <Route path="/codigo-recuperacao" element={<CodigoRec />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/calendario" element={<CalendarPage />} />
        <Route path="/registros" element={<Registros />} />
      </Routes>
    )
}

export default AppRoutes