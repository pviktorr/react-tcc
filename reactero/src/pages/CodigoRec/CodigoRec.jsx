import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './CodigoRec.css';

function CodigoRec() {
  const navigate = useNavigate();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  useEffect(() => {
    // Auto-focus no primeiro input
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleInputChange = (index, value) => {
    // Permite apenas números
    if (!/^[0-9]$/.test(value) && value !== '') return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move para o próximo input se digitou um número
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Volta para o input anterior ao pressionar Backspace
    if (e.key === 'Backspace' && code[index] === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    const fullCode = code.join('');
    
    if (fullCode.length !== 6) {
      alert('Por favor, insira o código completo de 6 dígitos.');
      return;
    }

    // Simula verificação (aqui você pode adicionar chamada à API)
    console.log('Código digitado:', fullCode);
    alert('Código verificado com sucesso!');
    // Redireciona para a página de nova senha
    navigate('/nova-senha');
  };

  const handleResend = (e) => {
    e.preventDefault();
    alert('Código reenviado para seu e-mail!');
    setCode(['', '', '', '', '', '']);
    inputRefs.current[0].focus();
  };

  return (
    <div className="codigorec-body">
      <div className="codigorec-container">
        <div className="codigorec-card">
          <img 
            src="https://img.icons8.com/ios-filled/100/ffffff/lock.png" 
            alt="Código de Verificação" 
            className="codigorec-icon" 
          />
          
          <h1 className="codigorec-title">Verificação</h1>
          
          <p className="codigorec-subtitle">
            Insira o código de verificação 6 dígitos enviado<br />
            para seu e-mail
          </p>
          
          <div className="codigorec-code-inputs">
            {code.map((digit, index) => (
              <React.Fragment key={index}>
                <input
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  className="codigorec-code-input"
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                />
                {index === 2 && <span className="codigorec-separator"></span>}
              </React.Fragment>
            ))}
          </div>
          
          <button 
            type="button" 
            className="codigorec-verify-btn"
            onClick={handleVerify}
          >
            Verificar
          </button>
          
          <a 
            href="#" 
            className="codigorec-resend-link"
            onClick={handleResend}
          >
            Reenviar código
          </a>
          
          <p className="codigorec-spam-warning">
            Se não encontrar o e-mail verifique a caixa de spam
          </p>
        </div>
      </div>
    </div>
  );
}

export default CodigoRec;
