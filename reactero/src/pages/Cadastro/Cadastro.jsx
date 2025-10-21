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
      const response = await fetch('http://localhost:8080/v1/teajuda/usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          nome:formData.nome,
          senha: formData.senha
        })
      });
      const contentType = response.headers.get('content-type') || '';
      let data;
      try {
        if (contentType.includes('application/json')) {
          data = await response.json();
        } else {
          data = await response.text();
        }
      } catch (parseErr) {
        data = null;
      }

      if (response.ok) {
        
        console.log('Cadastro OK:', data);
        if (data && typeof data === 'object' && data.token) {
          localStorage.setItem('token', data.token);
        }
        
        window.location.href = '/login';
      } else {
      
        console.error('Cadastro erro:', response.status, data);
        const serverMsg = (data && data.message) ? data.message : (typeof data === 'string' ? data : '');
        setError(serverMsg || `Erro ao cadastrar (status ${response.status}).`);
      }
    } catch (err) {
      // Erro de rede
      console.error('Erro no Cadastro (rede/CORS?):', err);
      setError('Falha na conexão com o servidor. Verifique sua rede ou permissões de CORS.');
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="login-container">
      
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
            {loading ? 'CARREGANDO...' : 'CADASTRAR'}
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