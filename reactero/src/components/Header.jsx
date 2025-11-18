import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="main-header">
      <nav className="main-nav">
        <ul>
          <li>Home</li>
          <li>Sobre</li>
          <li>Perfil</li>
          <li className="active">Relatório</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
