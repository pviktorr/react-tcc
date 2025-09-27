import React from 'react';
import phoneImage from '../../assets/Component 9.png'; 
import cardImage from '../../assets/rectangle 45.png';
import './Home.css';

function Onboarding() {
  return (
    <div className="onboarding-container">
      <div className="content-wrapper">
        
        {/* CARD DA IMAGEM DO CELULAR - ESQUERDA */}
        <div className="image-card">
            <img src= {cardImage} id='card' alt="" />
            <div className="phone-container">
            <img src= {phoneImage} alt="" className="phone-image" />
 
             </div>
        </div>

        {/* TEXTO - DIREITA */}
        <div className="text-section">
          <h1 className="title">Tenha tudo sob controle em casa!</h1>
          <h2 className="subtitle">DA MELHOR FORMA!</h2>
        </div>

      </div>

      {/* BOTÃO PRÓXIMO */}
      <div className="button-container">
        <button className="next-button">
          PRÓXIMO
        </button>
      </div>
    </div>
  );
}

export default Onboarding;