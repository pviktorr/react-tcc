import React from 'react'
import './App.css'
import Perfil from './pages/Perfil/perfil'
import Navbar from './Components/Navbar/Navbar'

import NovaSenha from './pages/NovaSenha/Novasenha'
import Login from './pages/Login/Login'
import Cadastro from './pages/Cadastro/Cadastro'
import Home from './pages/Home/Home'
import AppRoutes from '../src/router'

import AppRoutes from './router.jsx'

import { Routes } from 'react-router-dom'
function App() {
  return (
    <div>
      <AppRoutes/>
    </div>
  );
}

export default App