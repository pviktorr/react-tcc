import React, { useState } from 'react';
import Fundo from '../../assets/fundo.png'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom';
import './Cadastro.css';

const cadastro = () => {
  const [formData, setFormData] = useState({
    nome:'',
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
      // FETCH PARA API DE cadastro
      const response = await fetch('http://10.107.144.21:8080/v1/controle-usuario/usuario', {
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
        console.log('Cadastro:', data);
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
      console.error('Erro no Cadastro:', err);
    } finally {
      setLoading(false);
    }
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
              type="text"
              name="nome"
              value={formData.nome}
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
           <p> Já possui conta? <Link to={'/Login'}>Login  </Link></p>
        </div>
      </div>
    </div>
  );
};

export default  cadastro