import React, { useState } from 'react';
import './AccountSettings.css';

const AccountSettings = () => {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    lastName: '',
    email: '',
  });

  const [image, setImage] = useState(null); // para vista previa
  const [selectedFile, setSelectedFile] = useState(null); // para enviar al backend
  const [imageButtonLabel, setImageButtonLabel] = useState("Seleccionar");
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImage(URL.createObjectURL(file));
      setImageButtonLabel("Confirmar");
    }
  };

  const handleUploadImage = async () => {
    if (!selectedFile) return;

    const idUsuario = sessionStorage.getItem("usuario"); 
    const token = sessionStorage.getItem("token");

    const formData = new FormData();
    formData.append("file", selectedFile);

    setIsUploading(true);

    try {
  const response = await fetch(`http://localhost:8080/api/user/save/imagen/${idUsuario}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData
  });

  if (response.ok) {
    const data = await response.json();
    alert("Imagen subida con éxito.");

    // Limpia el input file (opcional)
    if (window.fileInputRef) {
      window.fileInputRef.value = null;
    }

    setImageButtonLabel("Seleccionar");
    setSelectedFile(null);
    // NO BORRAR la imagen para mantener la vista previa
    // setImage(null); ← NO hacer esto
  } else {
    const errorText = await response.text();
    console.log(`Error al subir la imagen: ${errorText}`);
  }
} catch (error) {
  console.log("Error de red al subir la imagen.");
  console.error(error);
}finally {
    setIsUploading(false); // ✅ Esto asegura que el botón vuelva a su estado normal
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
          <div className="file-upload-container">
  <input
    type="file"
    accept="image/*"
    style={{ display: 'none' }}
    ref={(ref) => (window.fileInputRef = ref)}
    onChange={handleImageChange}
  />
  <button
    className="file-select"
    onClick={(e) => {
      e.preventDefault();
      if (!selectedFile) {
        window.fileInputRef.click(); // abrir selector de archivos
      } else {
        handleUploadImage(); // subir imagen si ya fue seleccionada
      }
    }}
    disabled={isUploading}
  >
    {isUploading ? "Subiendo..." : selectedFile ? "Confirmar" : "Seleccionar"}
  </button>
</div>

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
