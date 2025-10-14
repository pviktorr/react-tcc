import React from 'react';
import phoneImage from '../../assets/Component 9.png'; 
import cardImage from '../../assets/rectangle 45.png';
import textoTea from '../../assets/TEAjuda.png'
import './LoginCadastro.css';

function Onboarding() {
  return (
    <div className="onboarding-container">
      <div className="content-wrapper">
        
        {/* CARD DA IMAGEM DO CELULAR - ESQUERDA */}
        <div className="image-card">
            <img src= {cardImage} id='card' alt="" />
            <div className="work">
           
 
             </div>
        </div>

        {/* TEXTO - DIREITA */}
        <div className="text-section">
          <img src={textoTea} id='textTEA' alt="" />
        
        </div>

      </div>

      {/* BOTÃO PRÓXIMO */}
      <div className="button-container">
        <button className="button">
            
          PRÓXIMO
        </button>
      </div>
      <div className="button-container">
        <button className="login-button">
          Login
        </button>
      </div>
    </div>
  );
}

export default Onboarding;