import React, { useState } from 'react';
import Fundo from '../../assets/fundo.png'
import logo from '../../assets/logo.png'
import olhoAberto from '../../assets/aberto.png'
import olhoFechado from '../../assets/fechado.png'
import { Link } from 'react-router-dom'
import './Login.css';




const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

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
      const response = await fetch('http://localhost:8080/v1/teajuda/usuario/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          senha: formData.senha
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Login bem-sucedido
        console.log('Login realizado:', data);
        localStorage.setItem('token', data.token);
        alert('Login realizado com sucesso!');
        // Redirecionar para home
        window.location.href = '/Perfil';
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
  const handleGoogleLogin = () => {
    // Integração com Google (exemplo)
    window.location.href = 'https://sua-api.com/auth/google';
  };

  const handleEsqueciSenha = () => {
    // Redirecionar para página de recuperação de senha
    window.location.href = '/recuperar-senha';
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
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="login-input"
              placeholder="Digite seu email..."
              required
            />
          </div>
          
          <div className="input-group password-group">
            <input
              type={mostrarSenha ? "text" : "password"}
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              className="login-input"
              placeholder="Digite sua senha..."
              required
            />
            <img
              src={mostrarSenha ? olhoAberto : olhoFechado}
              alt="Mostrar/Ocultar senha"
              className="password-toggle"
              onClick={() => setMostrarSenha(!mostrarSenha)}
            />
          </div>

          {/* Link Esqueceu a senha */}
          <div className="esqueci-senha-container">
            <button 
              type="button" 
              className="esqueci-senha-link"
              onClick={handleEsqueciSenha}
            >
              esqueceu a senha?
            </button>
          </div>

          {/* Mensagem de erro */}
          {error && <div className="error-message">{error}</div>}

          <button 
            className="login-button"
            disabled={loading}
          >
            {loading ? 'CARREGANDO...' : 'ENTRAR'}
          </button>
        </form>

        {/* Rodapé */}
        <div className="login-footer">
          <p>Não possui conta? <Link to={'/cadastro'}>Cadastre-se  </Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;