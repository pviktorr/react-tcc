import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/home" className="navbar-logo">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
        <div className="menu">
          <Link to="/home" className={`menu-link ${isActive('/home')}`}>Home</Link>
          <Link to="/perfil" className={`menu-link ${isActive('/perfil')}`}>Perfil</Link>
          <Link to="/calendario" className={`menu-link ${isActive('/calendario')}`}>Calendário</Link>
          <Link to="/registros" className={`menu-link ${isActive('/registros')}`}>Registros</Link>
          <Link to="/localidade" className={`menu-link ${isActive('/localidade')}`}>Localidades</Link>
          <Link to="/sobre" className={`menu-link ${isActive('/sobre')}`}>Sobre</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
