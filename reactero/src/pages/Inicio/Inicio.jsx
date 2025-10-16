import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Inicio.css';
import logo from '../../assets/logo.png';
import card from '../../assets/Rectangle 45.png';
import illustration from '../../assets/Group 2.png';

function Inicio() {
  const navigate = useNavigate();

  return (
    <div className="inicio__root">
      <div className="inicio__content">
        {/* Coluna esquerda: ilustração dentro de cartão branco arredondado */}
        <div className="inicio__card">
          <img src={illustration} alt="Ilustração" className="inicio__illustration" />
        </div>

        {/* Coluna direita: logo, título e botões */}
        <div className="inicio__right">
          <div className="inicio__brand">
            <div className="inicio__logoWrap">
              <img src={logo} alt="TEAjuda" className="inicio__logo" />
            </div>
            <h1 className="inicio__title">
              <span className="inicio__title--bold">TEA</span>
              <span className="inicio__title--light">juda</span>
            </h1>
          </div>

          <div className="inicio__actions">
            <button className="inicio__btn" onClick={() => navigate('/Login')}>LOGIN</button>
            <button className="inicio__btn inicio__btn--outline" onClick={() => navigate('/cadastro')}>CADASTRAR</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inicio;