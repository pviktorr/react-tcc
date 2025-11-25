import React, { useState } from 'react';
import Fundo from '../../assets/fundo.png';
import logo from '../../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import './Cadastro.css';

const cadastro = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
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
    setError(''); 
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    return password.length >= 8; 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

   
    if (!formData.nome || !formData.email || !formData.senha) {
      setError('Por favor, preencha todos os campos');
      setLoading(false);
      return;
    }

    if (formData.nome.length < 3) {
      setError('O nome deve ter pelo menos 3 caracteres');
      setLoading(false);
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Por favor, insira um email válido');
      setLoading(false);
      return;
    }

    if (formData.email.length > 100) {
      setError('O email não pode ter mais de 100 caracteres');
      setLoading(false);
      return;
    }

    if (!validatePassword(formData.senha)) {
      setError('A senha deve ter pelo menos 8 caracteres');
      setLoading(false);
      return;
    }

    if (formData.senha.length > 255) {
      setError('A senha não pode ter mais de 255 caracteres');
      setLoading(false);
      return;
    }

    try {
      console.log('Enviando requisição de cadastro:', {
        nome: formData.nome,
        email: formData.email,
        senha: '[PROTECTED]' 
      });

      const response = await fetch('http://localhost:8080/v1/teajuda/usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email.trim(),
          nome: formData.nome.trim(),
          senha: formData.senha
        })
      });

      console.log('Resposta do servidor:', response.status, response.statusText);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Erro na resposta:', errorData);
        throw new Error(errorData.message || 'Erro ao cadastrar');
      }

      const data = await response.json();
      console.log('Dados do cadastro:', data);

     
      const tokenCandidate = data?.token || data?.jwt || data?.access_token || data?.accessToken || data?.data?.token;
      if (tokenCandidate) {
        localStorage.setItem('token', String(tokenCandidate));
      }
      
      try {
        const userId = data?.usuarioId || data?.id || data?.usuario?.id || data?.usuario?.usuarioId;
        if (userId) localStorage.setItem('usuarioId', String(userId));
      } catch (_) {}
      
      
      if (formData?.nome) localStorage.setItem('usuarioNome', String(formData.nome));
      if (formData?.email) localStorage.setItem('usuarioEmail', String(formData.email));
      
    
      alert('Cadastro realizado com sucesso!');
      
      
      navigate('/Login');
      
    } catch (err) {
      console.error('Erro no Cadastro:', err);
      setError('Erro ao conectar ao servidor. Verifique sua conexão e tente novamente.');
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

      

      
        
        <div className="login-footer">
           <p> Já possui conta? <Link to={'/Login'}>Login  </Link></p>
        </div>
      </div>
    </div>
  );
};

export default  cadastro