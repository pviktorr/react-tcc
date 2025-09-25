import React from 'react'
import NovaSenha from './pages/NovaSenha/Novasenha'
import Login from './pages/Login/Login'
import Cadastro from './pages/Cadastro/Cadastro'
import './App.css'
import AppRoutes from '../router.jsx'
import { Routes } from 'react-router-dom'

function App() {
  return (
    
    <div className="App">
      <AppRoutes/>
    </div>
  )
}

export default App