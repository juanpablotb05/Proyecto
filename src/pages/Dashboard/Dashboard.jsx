import { useEffect } from "react";
import "./Dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { NavbarL } from "../../components/NavbarL";

export default function Dashboard() {
  const navigate = useNavigate();

  // Protección de ruta temporalmente desactivada para desarrollo
  // useEffect(() => {
  //   const token = sessionStorage.getItem("token");
  //   if (!token) navigate("/Login");
  // }, [navigate]);

  const handleFileUpload = (event) => {
    const files = event.target.files;
    if (files) console.log("Archivos subidos:", files);
  };

  return (
    <NavbarL>
    <Layout>
      <div className="dashboard">
        <header className="header">
          <h1>Dashboard</h1>
          <div className="header-buttons">
            <button className="btn-primary">
              <Link to="/Simulator">Simulador 3D</Link>
            </button>
          </div>
        </header>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Clientes</h3>
            <p className="stat-value">2,543</p>
            <span className="stat-change positive">+15%</span>
          </div>
          <div className="stat-card">
            <h3>Deals Ganados</h3>
            <p className="stat-value">$542K</p>
            <span className="stat-change positive">+23%</span>
          </div>
          <div className="stat-card">
            <h3>Nuevos Leads</h3>
            <p className="stat-value">456</p>
            <span className="stat-change positive">+12%</span>
          </div>
          <div className="stat-card">
            <h3>Tasa Conversión</h3>
            <p className="stat-value">28%</p>
            <span className="stat-change negative">-5%</span>
          </div>
        </div>

        {/* Contenido */}
        <div className="content-grid">
          <div className="upload-container large">
            <div className="upload-area">
              <div className="upload-icon">📊</div>
              <h3>Mis Proyectos</h3>
              <p>Sube contenido para mostrar gráficas de inventario</p>
              <input type="file" multiple onChange={handleFileUpload} className="file-input" />
              <button className="upload-btn">Agregar contenido</button>
            </div>
          </div>

          <div className="upload-container">
            <div className="upload-area">
              <div className="upload-icon">📋</div>
              <h3>Materiales Contenidos</h3>
              <p>Sube contenido para mostrar información de materiales</p>
              <input type="file" multiple onChange={handleFileUpload} className="file-input" />
              <button className="upload-btn">Agregar contenido</button>
            </div>
          </div>
        </div>

        {/* Proyectos */}
        <div className="projects-grid">
          <div className="upload-container">
            <div className="upload-area">
              <div className="upload-icon">🗂️</div>
              <h3>Mis Proyectos</h3>
              <p>Sube contenido para mostrar proyectos activos y asignaciones</p>
              <input type="file" multiple onChange={handleFileUpload} className="file-input" />
              <button className="upload-btn">Agregar contenido</button>
            </div>
          </div>

          <div className="upload-container">
            <div className="upload-area">
              <div className="upload-icon">🔧</div>
              <h3>Materiales Recientes</h3>
              <p>Sube contenido para mostrar materiales y simulaciones</p>
              <input type="file" multiple onChange={handleFileUpload} className="file-input" />
              <button className="upload-btn">Agregar contenido</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
    </NavbarL>
  );
}
