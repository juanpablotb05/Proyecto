import React, { useState, useEffect, useRef } from "react";
import "./Materiales.css";

const texturasGlobales = [
  { id: "g1", nombre: "Grano sutil", style: { background: "repeating-linear-gradient(45deg,#f3f4f6 0 2px,#e5e7eb 2px 4px)" } },
  { id: "g2", nombre: "Mármol claro", style: { background: "linear-gradient(135deg,#f8fafc,#eef2ff)" } },
  { id: "g3", nombre: "Metal cepillado", style: { background: "linear-gradient(90deg,#e2e8f0,#cbd5e1)" } },
  { id: "g4", nombre: "Madera clara", style: { background: "linear-gradient(180deg,#fdf7f0,#f8efe3)" } },
  { id: "g5", nombre: "Tela", style: { background: "repeating-linear-gradient(0deg,#f8fafc, #f8fafc 6px, #eef2ff 6px, #eef2ff 12px)" } },
];

export default function Materiales() {
  const [misTexturas, setMisTexturas] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("misTexturas");
      if (stored) setMisTexturas(JSON.parse(stored));
    } catch (err) {
      console.warn("No se pudieron cargar las texturas:", err);
    }
  }, []);

  const guardarEnSesion = (arr) => {
    try {
      sessionStorage.setItem("misTexturas", JSON.stringify(arr));
    } catch (err) {
      console.warn("No se pudo guardar en sessionStorage", err);
    }
  };

  const subirTextura = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const data = ev.target.result;
      const nueva = { id: Date.now().toString(), nombre: file.name, data };
      const nuevaLista = [nueva, ...misTexturas];
      setMisTexturas(nuevaLista);
      guardarEnSesion(nuevaLista);
      alert("Textura subida");
    };
    reader.readAsDataURL(file);
    // limpiar input
    if (inputRef.current) inputRef.current.value = "";
  };

  const eliminar = (id) => {
    if (!window.confirm("¿Eliminar esta textura?")) return;
    const lista = misTexturas.filter((t) => t.id !== id);
    setMisTexturas(lista);
    guardarEnLocal(lista);
    alert("Textura eliminada");
  };

  function descargar(textura) {
    const a = document.createElement("a");
    a.href = textura.data;
    a.download = textura.nombre || "textura";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  return (
    <div className="materiales-container">
      <div className="hero">
        <h1>Materiales</h1>
        <p>Administra texturas globales y tus propias texturas</p>
      </div>

      {/* Texturas globales */}
      <section className="card">
        <div className="card-header">
          <div>
            <h2>Texturas globales</h2>
            <p>Recursos disponibles para todo el proyecto</p>
          </div>
        </div>

        <div className="grid-global">
          {texturasGlobales.map((t) => (
            <div key={t.id} className="texture-item">
              <div className="texture-preview" style={t.style} />
              <div className="texture-name">{t.nombre}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Tus texturas */}
      <section className="card">
        <div className="card-header">
          <div>
            <h2>Tus texturas</h2>
            <p>Sube y gestiona tus texturas personalizadas</p>
          </div>
          <div>
            <input ref={inputRef} type="file" accept="image/*" onChange={subirTextura} className="hidden-input" />
            <button
              onClick={() => inputRef.current && inputRef.current.click()}
              className="btn-upload"
            >
              + Subir textura
            </button>
          </div>
        </div>

        {misTexturas.length === 0 ? (
          <div className="empty-state">
            <div className="empty-emoji">🧩</div>
            <h3>No tienes texturas</h3>
            <p>Sube imágenes para usarlas como texturas.</p>
          </div>
        ) : (
          <div className="grid-user">
            {misTexturas.map((t) => (
              <div key={t.id} className="user-texture">
                <div className="user-texture-preview">
                  <img src={t.data} alt={t.nombre} />
                </div>
                <div className="user-texture-footer">
                  <div className="truncate">{t.nombre}</div>
                  <div className="user-actions">
                    <button onClick={() => descargar(t)} className="btn-link">Descargar</button>
                    <button onClick={() => eliminar(t.id)} className="btn-danger">Eliminar</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
