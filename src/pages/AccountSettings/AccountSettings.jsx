import React, { useState } from 'react';
import './AccountSettings.css';

const AccountSettings = () => {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    lastName: '',
    email: '',
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos enviados:', formData);
  };

  return (
    <div className="account-settings-container">
      <div className="sidebar">
        <div className="profile-section">
          <div className="profile-image-circle">
            {image ? (
              <img src={image} alt="Profile" className="profile-image" />
            ) : (
              <div className="no-image">Sin imagen</div>
            )}
          </div>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <div className="profile-name">{formData.name || 'Usuario'}</div>
          <a href="#" className="view-profile-link">Ver el perfil</a>
        </div>
      </div>

      <div className="main-content">
        <div className="account-header">
          <h2>Cuenta</h2>
        </div>
        <form className="account-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Nombre de usuario</label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Ingrese su nombre de usuario"
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ingrese su nombre"
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Apellidos</label>
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Ingrese sus apellidos"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="usuario@correo.com"
            />
          </div>
          <button type="submit" className="update-button">Actualizar cuenta</button>
        </form>
      </div>
    </div>
  );
};

export default AccountSettings;

