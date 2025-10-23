import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './perfil.css';
import senhaIcon from '../../assets/senha.png';
import '../Home/Home.css';

function Perfil() {
  const navigate = useNavigate();
  const [nome, setNome] = useState(localStorage.getItem('usuarioNome') || '');
  const [email, setEmail] = useState(localStorage.getItem('usuarioEmail') || '');
  const [senha, setSenha] = useState('');
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/200');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Carrega os dados do usuário logado
    const carregarDadosUsuario = async () => {
      const userId = localStorage.getItem('usuarioId');
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Você precisa estar logado para acessar o perfil.');
        navigate('/Login');
        return;
      }

      if (!userId) {
        // Sem userId: mantém dados locais e não bloqueia a página
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/v1/teajuda/usuario/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const dados = await response.json();
          setNome(dados.nome || '');
          setEmail(dados.email || '');
          // Sincroniza localStorage para outras telas
          if (dados.nome) localStorage.setItem('usuarioNome', dados.nome);
          if (dados.email) localStorage.setItem('usuarioEmail', dados.email);
        } else {
          console.error('Erro ao carregar dados do usuário');
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    };

    carregarDadosUsuario();
  }, [navigate]);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const userId = localStorage.getItem('usuarioId');
    
    if (!email && !senha) {
      alert('Por favor, preencha pelo menos um campo (email ou senha) para alterar.');
      return;
    }
    
    if (email && !validateEmail(email)) {
      alert('Por favor, insira um e-mail válido.');
      return;
    }
    
    if (senha && senha.length < 6) {
      alert('A senha deve ter no mínimo 6 caracteres.');
      return;
    }
    
    const dadosAtualizacao = {};
    if (email) dadosAtualizacao.email = email;
    if (senha) dadosAtualizacao.senha = senha;
    
    setLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/v1/teajuda/usuario/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(dadosAtualizacao)
      });
      
      const resultado = await response.json();
      
      if (response.ok) {
        alert('Dados atualizados com sucesso!');
        
        // Recarrega os dados atualizados
        const responseGet = await fetch(`http://localhost:8080/v1/teajuda/usuario/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
          }
        });
        if (responseGet.ok) {
          const dados = await responseGet.json();
          setNome(dados.nome || '');
          setEmail(dados.email || '');
          if (dados.nome) localStorage.setItem('usuarioNome', dados.nome);
          if (dados.email) localStorage.setItem('usuarioEmail', dados.email);
        }
        
        // Limpa apenas o campo de senha
        setSenha('');
      } else {
        alert(`Erro ao atualizar: ${resultado.message || 'Verifique os dados e tente novamente.'}`);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro de conexão com o servidor. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Navbar igual à da Home */}
      <div className="nav">
        <div className="container">
          <Link to="/home" className="btn">Home</Link>
          <Link to="/perfil" className="btn">Perfil</Link>
          <Link to="/sobre" className="btn">Sobre</Link>
          <svg
            className="outline"
            overflow="visible"
            width="400"
            height="60"
            viewBox="0 0 400 60"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              className="rect"
              pathLength="100"
              x="0"
              y="0"
              width="400"
              height="60"
              fill="transparent"
              strokeWidth="5"
            ></rect>
          </svg>
        </div>
      </div>

      <div className="perfil-body">
      <main className="perfil-main-content">
        <div className="perfil-container">
          <div className="background">
            
          </div>
          <section className="perfil-user">
            {nome ? (
              <h2 className="perfil-user__name">{nome}</h2>
            ) : null}
            {email ? (
              <p className="perfil-user__email">{email}</p>
            ) : null}
          </section>

          <section className="perfil-form">
            <form onSubmit={handleSubmit}>
              <div className="perfil-form-group">
                <label htmlFor="nome">Nome</label>
                <div className="perfil-input-icon">
                  <img src="https://img.icons8.com/ios-filled/50/000000/user.png" alt="Nome" />
                  <input 
                    id="nome" 
                    type="text" 
                    placeholder="Nome Completo" 
                    value={nome}
                    readOnly
                  />
                </div>
              </div>

              <div className="perfil-form-group">
                <label htmlFor="email">Email</label>
                <div className="perfil-input-icon">
                  <img src="https://img.icons8.com/ios-filled/50/000000/email.png" alt="Email" />
                  <input 
                    id="email" 
                    type="email" 
                    placeholder="**********@***.**" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="perfil-form-group">
                <label htmlFor="senha">Senha</label>
                <div className="perfil-input-icon">
                  <img src={senhaIcon} alt="Senha" />
                  <input 
                    id="senha" 
                    type="password" 
                    placeholder="**********" 
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    disabled
                  />
                </div>
                <div className="perfil-esqueci-senha">
                  <button 
                    type="button" 
                    className="perfil-esqueci-senha-link"
                    onClick={() => navigate('/nova-senha')}
                  >
                    Redefinir senha
                  </button>
                </div>
              </div>

              <div className="perfil-actions">
                <button 
                  type="submit" 
                  className="perfil-btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Alterando...' : 'ALTERAR'}
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>
      </div>
    </>
  );
}

export default Perfil;
