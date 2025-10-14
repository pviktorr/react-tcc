import React from 'react'
import NovaSenha from './pages/NovaSenha/Novasenha'
import Login from './pages/Login/Login'
import Cadastro from './pages/Cadastro/Cadastro'
import Home from './pages/Home/Home'
import './App.css'
import AppRoutes from '../router.jsx'
import Navbar from './Components/Navbar/Navbar.jsx'
import { Routes } from 'react-router-dom'

function App() {
  return (
    
    <div className="App">
      <Navbar/>
    </div>
  )
}

export default App