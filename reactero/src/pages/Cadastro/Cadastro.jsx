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
      const response = await fetch('http://10.107.144.28:8080/v1/teajuda/usuario', {
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
      

      const data = await response.json();

      if (response.ok) {
        // Cadastro OK: salvar sessão e dados do usuário
        console.log('Cadastro:', data);
        const tokenCandidate = data?.token || data?.jwt || data?.access_token || data?.accessToken || data?.data?.token;
        if (tokenCandidate) {
          localStorage.setItem('token', String(tokenCandidate));
        }
        try {
          const userId = data?.usuarioId || data?.id || data?.usuario?.id || data?.usuario?.usuarioId;
          if (userId) localStorage.setItem('usuarioId', String(userId));
        } catch (_) {}
        // Garante que nome/email já apareçam na Perfil imediatamente
        if (formData?.nome) localStorage.setItem('usuarioNome', String(formData.nome));
        if (formData?.email) localStorage.setItem('usuarioEmail', String(formData.email));
        // Redirecionar para login após cadastro
        window.location.href = '/Login';
      } else {
        // Erro do servidor
        setError(data.message || 'Erro ao fazer login');
      }
    } catch (err) {
      setError('Erro de conexão. Tente novamente.');
      console.error('Erro no Cadastro:', err);
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