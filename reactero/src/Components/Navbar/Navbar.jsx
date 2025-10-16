import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Itens da navbar baseados nas suas rotas
  const navItems = [
    { path: '/home', icon: '🏠', label: 'Home' },
    { path: '/mobile', icon: '📱', label: 'Mobile'},
    { path: '/relatorio', icon: '✏️', label: 'Relatório'},
    { path: '/perfil', icon: '🧑', label: 'Perfil' }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {navItems.map((item) => (
          <button
            key={item.path}
            className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <div className="nav-icon">{item.icon}</div>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;