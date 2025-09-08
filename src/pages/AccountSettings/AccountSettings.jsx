import { useState, useRef, useEffect } from "react";
import "./AccountSettings.css";
import { NavbarL } from "../../components/NavbarL";

export default function AccountSettings() {
  const [usuario, setUsuario] = useState({
    id: 1,
    nombre: "María García",
    email: "maria@empresa.com",
    rol: "Administrador",
    activo: true,
    ultimoAcceso: "hace 5 minutos",
    telefono: "+57 300 123 4567",
    ubicacion: "Medellín, Colombia",
  });

  const [fotoUrl, setFotoUrl] = useState("");
  const fileInputRef = useRef(null);

  // Cargar foto y nombre desde sessionStorage (solo por sesión)
  useEffect(() => {
    const stored = sessionStorage.getItem("profilePhoto");
    if (stored) setFotoUrl(stored);
    const storedName = sessionStorage.getItem("profileName") || sessionStorage.getItem("nombre");
    if (storedName) setUsuario((u) => ({ ...u, nombre: storedName }));
  }, []);

  const onFotoChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const result = ev.target.result;
        setFotoUrl(result);
        try {
          sessionStorage.setItem("profilePhoto", result);
        } catch (err) {
          console.warn("No se pudo guardar la foto en sessionStorage", err);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const quitarFoto = () => {
    setFotoUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    try {
      sessionStorage.removeItem("profilePhoto");
    } catch (err) {}
  };

  const editarPerfil = () => {
    const nombre = prompt("Nombre completo:", usuario.nombre);
    const email = prompt("Correo electrónico:", usuario.email);
    if (nombre && email) {
      setUsuario((u) => ({ ...u, nombre, email }));
      try {
        sessionStorage.setItem("profileName", nombre);
        sessionStorage.setItem("nombre", nombre);
      } catch (err) {}
    }
  };

  return (
    <NavbarL>
      <div className="perfil-container">
        {/* Encabezado */}
        <div className="perfil-header">
          <div className="perfil-header-content">
            <div className="perfil-user-info">
              {fotoUrl ? (
                <img
                  src={fotoUrl}
                  alt={`Foto de perfil de ${usuario.nombre}`}
                  className="perfil-avatar-lg"
                />
              ) : (
                <div className="perfil-avatar-placeholder-lg">
                  {usuario.nombre.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <h1 className="perfil-title">Perfil de Usuario</h1>
                <p className="perfil-subtitle">
                  Información y acciones del perfil
                </p>
              </div>
            </div>
            <div>
              <span
                className={`perfil-status ${
                  usuario.activo ? "activo" : "inactivo"
                }`}
              >
                {usuario.activo ? "✅ Activo" : "❌ Inactivo"}
              </span>
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="perfil-main">
          {/* Tarjeta de detalles del usuario */}
          <div className="perfil-card">
            <div className="perfil-user-summary">
              {fotoUrl ? (
                <img
                  src={fotoUrl}
                  alt={`Foto de perfil de ${usuario.nombre}`}
                  className="perfil-avatar-md"
                />
              ) : (
                <div className="perfil-avatar-placeholder-md">
                  {usuario.nombre.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <h2 className="perfil-username">{usuario.nombre}</h2>
                <p className="perfil-email">{usuario.email}</p>
              </div>
            </div>
            <div className="perfil-actions">
              <button
                onClick={() =>
                  fileInputRef.current && fileInputRef.current.click()
                }
                className="btn-secondary"
              >
                CAMBIAR FOTO
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={onFotoChange}
                style={{ display: "none" }}
              />
            </div>
            <div className="perfil-details">
              <div className="perfil-detail-row">
                <span>Rol</span>
                <span>
                  {usuario.rol}
                </span>
              </div>
              <div className="perfil-detail-row">
                <span>Último acceso</span>
                <span>{usuario.ultimoAcceso}</span>
              </div>
              <div className="perfil-detail-row">
                <span>Teléfono</span>
                <span>{usuario.telefono}</span>
              </div>
              <div className="perfil-detail-row">
                <span>Ubicación</span>
                <span>{usuario.ubicacion}</span>
              </div>
            </div>
            <div className="perfil-actions" style={{ marginTop: '1.5rem' }}>
              <button onClick={editarPerfil} className="btn-primary">
                EDITAR
              </button>
              <button className="btn-danger">
                CONTRASEÑA
              </button>
            </div>
          </div>

          {/* Tarjeta de actividad reciente */}
          <div className="perfil-card">
            <h2 className="perfil-section-title">Actividad reciente</h2>
            <ul className="perfil-activity">
              <li>
                <span>✅</span>
                <div>
                  <p>Ingreso al sistema</p>
                  <p className="perfil-subtitle">Hace 5 minutos</p>
                </div>
              </li>
              <li>
                <span>📝</span>
                <div>
                  <p>Actualizó un proyecto</p>
                  <p className="perfil-subtitle">Hoy, 10:21 AM</p>
                </div>
              </li>
              <li>
                <span>🔒</span>
                <div>
                  <p>Cambio de contraseña exitoso</p>
                  <p className="perfil-subtitle">Ayer, 6:12 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </NavbarL>
  );
}
