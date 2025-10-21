import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './perfil.css';
import senhaIcon from '../../assets/senha.png';
import Navbar from '../../Components/Navbar/Navbar';

function Perfil() {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/200');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Carrega os dados do usuário logado
    const carregarDadosUsuario = async () => {
      const userId = localStorage.getItem('usuarioId');
      
      // if (!userId) {
      //   alert('Você precisa estar logado para acessar o perfil.');
      //   navigate('/Login');
      //   return;
      // }

      try {
        const response = await fetch(`http://localhost:8080/v1/teajuda/usuario/${userId}`);
        
        if (response.ok) {
          const dados = await response.json();
          setNome(dados.nome || '');
          setEmail(dados.email || '');
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
      const response = await fetch(`http://localhost:8080/v1/teajuda/usuario/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosAtualizacao)
      });
      
      const resultado = await response.json();
      
      if (response.ok) {
        alert('Dados atualizados com sucesso!');
        
        // Recarrega os dados atualizados
        const responseGet = await fetch(`http://localhost:8080/v1/teajuda/usuario/${userId}`);
        if (responseGet.ok) {
          const dados = await responseGet.json();
          setNome(dados.nome || '');
          setEmail(dados.email || '');
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
      <Navbar />
      <div className="perfil-body">
      <main className="perfil-main-content">
        <div className="perfil-container">
          <div className="background">
            
          </div>

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
                    disabled
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
