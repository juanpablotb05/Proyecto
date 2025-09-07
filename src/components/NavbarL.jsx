import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./NavbarL.css";

export function NavbarL({ children }) {
  const [profilePhoto, setProfilePhoto] = useState("");
  const [profileName, setProfileName] = useState("A");
  const [menuOpen, setMenuOpen] = useState(false); // menú de perfil
  const [isMenuOpen, setIsMenuOpen] = useState(false); // menú lateral
  const [vista, setVista] = useState("dashboard");

  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // 🔹 Datos del perfil desde localStorage
  useEffect(() => {
    setProfilePhoto(localStorage.getItem("profilePhoto") || "");
    setProfileName(localStorage.getItem("profileName") || "A");

    const onStorage = (e) => {
      if (e.key === "profilePhoto") setProfilePhoto(e.newValue || "");
      if (e.key === "profileName") setProfileName(e.newValue || "A");
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // 🔹 Cierra menú de perfil si clic afuera
  useEffect(() => {
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // 🔹 Actualiza título según la ruta
  useEffect(() => {
    const path = (location.pathname || "").toLowerCase();
    if (path.includes("/users")) setVista("Users");
    else if (path.includes("/accountsettings")) setVista("AccountSettings");
    else if (path.includes("/simulator")) setVista("Simulador");
    else if (path.includes("/materiales")) setVista("Materiales");
    else if (path.includes("/dashboard")) setVista("dashboard");
    else if (path.includes("/userprofile")) setVista("UserProfile");
    else if (path === "/" || path === "") setVista("home");
    else setVista("dashboard");
  }, [location]);

  // 🔹 Título dinámico
  const tituloSegunVista = () => {
    const v = (vista || "").toLowerCase();
    if (v === "users") return "Panel de Usuarios";
    if (v === "proyectos") return "Proyectos";
    if (v === "accountsettings") return "Configuración de la cuenta";
    if (v === "simulador") return "Simulador 3D";
    if (v === "userprofile") return "Perfil de Usuario";
    if (v === "home") return "Inicio";
    return "Dashboard";
  };

  return (
    <div className={`layout ${isMenuOpen ? "menu-open" : ""}`}>
      {/* NAVBAR */}
      <header className="navbar">
        <div className="navbar-container">
          {/* Botón hamburguesa */}
          <button
            aria-label="Abrir menú"
            className="menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="menu-line" />
            <span className="menu-line" />
            <span className="menu-line" />
          </button>

          {/* Título */}
          <h1 className="navbar-title">{tituloSegunVista()}</h1>

          {/* Perfil */}
          <div className="profile-container" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="profile-btn"
              aria-label="Abrir menú de perfil"
            >
              {profilePhoto ? (
                <img src={profilePhoto} alt={profileName} className="profile-img" />
              ) : (
                <div className="profile-placeholder">
                  {profileName ? profileName.charAt(0).toUpperCase() : "A"}
                </div>
              )}
            </button>

            {menuOpen && (
              <div className="profile-menu">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/AccountSettings");
                  }}
                  className="profile-menu-item"
                >
                  ✏️ Editar perfil
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    alert("Sesión cerrada");
                  }}
                  className="profile-menu-item"
                >
                  🚪 Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* MENÚ LATERAL */}
      <div className={`side-menu ${isMenuOpen ? "open" : ""}`}>
        <div className="menu-header">
          <h2>Menú</h2>
          <button className="close-btn" onClick={() => setIsMenuOpen(false)}>
            ✖
          </button>
        </div>
        <div className="side">
          <Link to="/Dashboard" onClick={() => setIsMenuOpen(false)}>📊 Dashboard</Link>
          <Link to="/Users" onClick={() => setIsMenuOpen(false)}>👥 Usuarios</Link>
          <a href="#projects" onClick={() => setVista("proyectos")}>🗂️ Proyectos</a>
          <a href="#materials" onClick={() => setVista("materiales")}>📋 Materiales</a>
          <Link to="/Simulator" onClick={() => setIsMenuOpen(false)}>🖥️ Simulador 3D</Link>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && <div className="menu-overlay" onClick={() => setIsMenuOpen(false)} />}

      {/* CONTENIDO PRINCIPAL */}
      <main className="main-content">{children}</main>
    </div>
  );
}
