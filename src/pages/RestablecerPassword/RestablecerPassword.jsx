import React, { useState } from 'react';
import './RestablecerPassword.css';
import logo from '../../assets/ENVIFO.png';

const PasswordRecovery = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMensaje('Las contraseñas no coinciden');
      return;
    }

    // Aquí podrías llamar a tu API para cambiar la contraseña
    console.log('Contraseña restablecida correctamente');
    setMensaje('Contraseña actualizada');
  };

  return (
    <div className="Recuperar-password-container">
    <div className="contenedor-recuperacion">
      <div className="logo-cabecera">
        <img src={logo} alt="Envifo Logo" className="logo" />
        <h1>Restablecer contraseña</h1>
        <p>Introduce tu nueva contraseña</p>
      </div>

      <form onSubmit={handleSubmit} className="formulario-contrasena">
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {mensaje && <p className="mensaje-error">{mensaje}</p>}
        <button type="submit">Cambiar contraseña</button>
      </form>
    </div>
    </div>
  );
};

export default PasswordRecovery;
