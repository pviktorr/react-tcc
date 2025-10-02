import { useState } from 'react';
import './NovaSenha.css';
import Fundo from '../../assets/fundo.png'
import logo from '../../assets/logo.png'
import senha from '../../assets/senha.png'


const NovaSenha = () => {
  const [formData, setFormData] = useState({
    novaSenha: '',
    confirmarSenha: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados do formulário:', formData);
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