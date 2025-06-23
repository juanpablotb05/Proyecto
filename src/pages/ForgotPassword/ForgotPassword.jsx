import React, { useState } from 'react';
import './ForgotPassword.css'; 
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/ENVIFO.png';


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    setIsValidEmail(validateEmail(value));
  };

  const handleContinue = () => {
    console.log('Correo electrónico ingresado:', email);
    navigate('/password-recovery');
  };

  return (
    <div className="forgot-password-container">
      <div className="logo-section">
        <img src={logo} alt="Envifo Logo" className="logo" />
      </div>

      <div className="content-section">
        <h1>Recuperar contraseña</h1>
        <p className="instruction-text">
          Ingresa tu correo electrónico para enviarte un código de verificación.
        </p>
        <div className="input-group">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={handleEmailChange}
            className="email-input"
            required
          />
        </div>
        <button
          className="continue-button"
          onClick={handleContinue}
          disabled={!isValidEmail}
          style={{
            backgroundColor: isValidEmail ? '#ff6600' : '#ccc',
            cursor: isValidEmail ? 'pointer' : 'not-allowed'
          }}
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;