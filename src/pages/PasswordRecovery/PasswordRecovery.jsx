import React, { useState } from 'react';
import './PasswordRecovery.css'; // Importa el archivo CSS
import logo from '../../assets/ENVIFO.png';

const PasswordRecovery = () => {
  const [codigoVerificacion, setCodigoVerificacion] = useState('');

  const manejarCambioCodigoVerificacion = (evento) => {
    setCodigoVerificacion(evento.target.value);
  };

  const manejarVerificar = () => {
    // Lógica para manejar la verificación, por ejemplo, enviar el código a una API
    console.log('Verificando código:', codigoVerificacion);
    // Aquí podrías agregar la llamada a tu API
  };

  const manejarReenviarCodigo = () => {
    // Lógica para reenviar el código de verificación
    console.log('Reenviando código...');
    // Aquí podrías agregar la llamada a tu API para reenviar el código
  };

  return (
    <div className="contenedor-recuperacion-contrasena">
      <div className="cabecera">
        <div className="contenedor-logo">
          {/* Asumiendo que tienes un SVG o una imagen para el logo */}
          {/* **¡Importante!** Reemplaza "ruta/a/tu/logo.png" con la ruta real de tu logo */}
           <div className="logo-section">
            <img src={logo} alt="Envifo Logo" className="logo" />
          </div>
      </div>
       <button className="boton-atras" onClick={() => window.history.back()}>
        <span className="flecha">←</span> atrás
        </button>
      </div>

      <div className="contenido">
        <h1>Recuperar contraseña</h1>
        <p>Ingresa el código de verificación enviado a tu correo electrónico</p>

        <div className="grupo-entrada">
          <input
            type="text"
            placeholder="Código de verificación"
            value={codigoVerificacion}
            onChange={manejarCambioCodigoVerificacion}
            className="entrada-verificacion"
            required
          />
        </div>

        <button className="boton-verificar" onClick={manejarVerificar}>
          Verificar
        </button>

        <button className="boton-reenviar-codigo" onClick={manejarReenviarCodigo}>
          Reenviar código
        </button>
      </div>
    </div>
  );
};

export default PasswordRecovery;