import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Novasenha.css';
import Fundo from '../../assets/fundo.png'
import logo from '../../assets/logo.png'
import senha from '../../assets/senha.png'


const NovaSenha = () => {
  const [formData, setFormData] = useState({
    novaSenha: '',
    confirmarSenha: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const novaSenha = (formData.novaSenha || '').trim();
    const confirmarSenha = (formData.confirmarSenha || '').trim();
    if (!novaSenha || !confirmarSenha) {
      alert('Preencha os dois campos de senha.');
      return;
    }
    if (novaSenha !== confirmarSenha) {
      alert('As senhas não coincidem.');
      return;
    }
    if (novaSenha.length < 6) {
      alert('A nova senha deve ter ao menos 6 caracteres.');
      return;
    }

    const email = localStorage.getItem('userEmail');
    const codigo = localStorage.getItem('resetCode');
    if (!email || !codigo) {
      alert('Informações insuficientes para redefinir a senha. Solicite o código novamente.');
      return;
    }

    try {
      const payload = {
        email: String(email).trim(),
        codigo: String(codigo).trim(),
        senha: novaSenha,
        token: String(codigo).trim(),
        novaSenha: novaSenha,
        confirmarSenha: confirmarSenha,
      };
      console.log('Enviando redefinição de senha com payload:', payload);
      const response = await fetch('http://localhost:8080/v1/teajuda/solicitacao-de-senha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const contentType = response.headers.get('content-type') || '';
      let data;
      try {
        data = contentType.includes('application/json') ? await response.json() : await response.text();
      } catch (_) {
        data = null;
      }
      console.log('Resposta redefinição de senha:', response.status, data);

      if (response.ok) {
        alert('Senha redefinida com sucesso!');
        navigate('/login');
      } else {
        const msg = (data && data.message) ? data.message : (typeof data === 'string' ? data : 'Erro ao redefinir senha.');
        alert(msg);
      }
    } catch (err) {
      alert('Falha na conexão com o servidor. Verifique sua rede/CORS.');
      console.error('Erro na redefinição de senha:', err);
    }
  };

  return (
    <div className="nova-senha-container">
      <div className="nova-senha-card"> 
      
        {/* DIV PARA A LOGO */}
        <div className="logo-container">
          <img 
            src= {logo} id='logo'
            alt="Logo" 
            className="logo"
            
          />
        </div>

        <h1 className="nova-senha-title">Criar uma nova senha</h1>
        
        <form onSubmit={handleSubmit} className="nova-senha-form">
          
          {/* CAMPO 1 COM ÍCONE */}
          <div className="input-group">
            <label htmlFor="novaSenha" className="input-label">
              A Nova Senha
            </label>
            <div className="input-with-icon">
              <div className="icon-container">
                <img 
                  src={senha} id='senha'
                  alt="Senha" 
                  className="input-icon"
                />
              </div>
              <input
                id="novaSenha"
                name="novaSenha"
                type="password"
                value={formData.novaSenha}
                onChange={handleChange}
                className="password-input"
                placeholder="Digite a nova senha"
              />
            </div>
          </div>
          
          {/* CAMPO 2 COM ÍCONE */}
          <div className="input-group">
            <label htmlFor="confirmarSenha" className="input-label">
              A Confirmar Senha
            </label>
            <div className="input-with-icon">
              <div className="icon-container">
                <img 
                  src={senha} id='senha' 
                  alt="Confirmar" 
                  className="input-icon"
                />
              </div>
              <input
                id="confirmarSenha"
                name="confirmarSenha"
                type="password"
                value={formData.confirmarSenha}
                onChange={handleChange}
                className="password-input"
                placeholder="Confirme a senha"
              />
            </div>
          </div>
          
          <button type="submit" className="reset-button">
            Redefinir Senha
          </button>
        </form>

        
      </div>
    </div>
  );
};

export default NovaSenha;