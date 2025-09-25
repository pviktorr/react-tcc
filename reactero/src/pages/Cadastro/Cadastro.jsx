import React, { useState } from 'react';
import Fundo from '../../assets/fundo.png'
import logo from '../../assets/logo.png'
import './Cadastro.css';

const cadastro = () => {
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Limpa erro ao digitar
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // FETCH PARA API DE LOGIN
      const response = await fetch('', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          nome:formData.nome,
          password: formData.senha
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Login bem-sucedido
        console.log('Login realizado:', data);
        localStorage.setItem('token', data.token);
        // Redirecionar para outra página
        window.location.href = '/dashboard';
      } else {
        // Erro do servidor
        setError(data.message || 'Erro ao fazer login');
      }
    } catch (err) {
      // Erro de rede
      setError('Erro de conexão. Tente novamente.');
      console.error('Erro no login:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEsqueciSenha = () => {
    // Redirecionar para página de recuperação de senha
    window.location.href = '/nova-senha';
  };

  return (
    <div className="login-container">
       <div>
        <img src={Fundo} id='fundo' alt="" />
       </div>
      <div className="login-card">
        <div> 
            <div>
            <img src={logo} alt="" />
        </div>
        </div>
        <h1 className="login-title">TEAjuda</h1>
        
        
        
        <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
            <input
              type="name"
              name="Nome"
              value={formData.email}
              onChange={handleChange}
              className="login-input"
              placeholder="Digite seu nome..."
              required
            />
          </div>
        
          <div className="input-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="login-input"
              placeholder="Digite seu email..."
              required
            />
          </div>
          
          <div className="input-group">
            <input
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              className="login-input"
              placeholder="Digite sua senha..."
              required
            />
          </div>
          

         
          {/* Mensagem de erro */}
          {error && <div className="error-message">{error}</div>}

          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? 'CARREGANDO...' : 'ENTRAR'}
          </button>
        </form>

      

      
        {/* Rodapé */}
        <div className="login-footer">
          <p>Já possui conta? <a href="/cadastro" className="cadastro-link">Entre</a></p>
        </div>
      </div>
    </div>
  );
};

export default  cadastro