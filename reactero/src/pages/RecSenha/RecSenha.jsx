import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecSenha.css';
import logo from '../../assets/logo.png';

function RecSenha() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Salva o email no localStorage
    localStorage.setItem('userEmail', email);

    // Simula envio de email (aqui você pode adicionar a chamada à API)
    setTimeout(() => {
      setLoading(false);
      // Redireciona para página de código de recuperação
      navigate('/codigo-recuperacao');
    }, 1000);
  };

  return (
    <div className="recsenha-body">
      <div className="recsenha-container">
        <div className="recsenha-box">
          <img src={logo} alt="Logo TEAjuda" className="recsenha-icon" />
          <h2>Esqueceu a senha?</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email" className="recsenha-email-label">
              <img 
                src="https://img.icons8.com/ios-filled/50/000000/email.png" 
                alt="Email" 
                className="recsenha-email-icon"
              />
              <input
                type="email"
                id="email"
                placeholder="Digite seu email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <p className="recsenha-info-text">
              Enviaremos um E-mail com as instruções <br />
              de como redefinir senha
            </p>
            <button 
              type="submit" 
              className="recsenha-btn-submit"
              disabled={loading}
            >
              {loading ? 'Enviando...' : 'Enviar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RecSenha;
