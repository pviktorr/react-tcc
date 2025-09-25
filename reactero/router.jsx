import React from "react";

import LoginPage from './src/pages/Login/Login'; // Importe a sua página de login
import Cadastro from './src/pages/Cadastro/Cadastro'; // Importe a sua página de cadastro

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function AppRoutes() {
    return (
      <>
        <Routes>
 
            <Route path="/Login" element={<LoginPage />}></Route>
             <Route path="/Cadastro" element={<Cadastro/>}></Route>

        </Routes>
      </>
    )
}

export default AppRoutes