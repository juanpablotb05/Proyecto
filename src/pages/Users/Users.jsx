import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Users.css"; // Importa estilos extra
import { NavbarL } from "../../components/NavbarL";

const usuariosIniciales = [
  { id: 1, nombre: "María García", email: "maria@empresa.com", rol: "admin", activo: true, ultimoAcceso: "hace 5 minutos" },
  { id: 2, nombre: "Carlos López", email: "carlos@empresa.com", rol: "editor", activo: true, ultimoAcceso: "hace 1 hora" },
  { id: 3, nombre: "Ana Rodríguez", email: "ana@empresa.com", rol: "viewer", activo: false, ultimoAcceso: "hace 3 días" },
  { id: 4, nombre: "David Martínez", email: "david@empresa.com", rol: "editor", activo: true, ultimoAcceso: "hace 30 minutos" }
];

export default function Users() {
  const navigate = useNavigate();

  // Redirigir si el usuario no tiene permiso
  useEffect(() => {
    const perm = sessionStorage.getItem('permiso') || localStorage.getItem('permiso') || null;
    const isAdmin = perm === 'admin' || perm === '1' || perm === 1 || perm === '0';
    if (!isAdmin) {
      // Evitar que usuarios normales accedan a la vista de Usuarios
      alert('No tienes permisos para acceder a la sección de Usuarios');
      navigate('/Dashboard');
    }
  }, [navigate]);

  const [usuarios, setUsuarios] = useState(usuariosIniciales);
  const [busqueda, setBusqueda] = useState("");

  const usuariosFiltrados = usuarios.filter(usuario => 
    usuario.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    usuario.email.toLowerCase().includes(busqueda.toLowerCase())
  );

  const cambiarEstado = (id) => {
    const usuarioActual = usuarios.find(u => u.id === id);
    setUsuarios(usuarios.map(user => 
      user.id === id ? { ...user, activo: !user.activo } : user
    ));
    alert(usuarioActual.activo ? "Usuario desactivado" : "Usuario activado");
  };

  const eliminarUsuario = (id) => {
    if (confirm("¿Estás seguro de eliminar este usuario?")) {
      setUsuarios(usuarios.filter(user => user.id !== id));
      alert("Usuario eliminado");
    }
  };

  const cambiarContrasena = (id) => {
    const nuevaPassword = prompt("Nueva contraseña (mínimo 6 caracteres):");
    if (nuevaPassword && nuevaPassword.length >= 6) {
      alert("Contraseña cambiada exitosamente");
    } else if (nuevaPassword) {
      alert("La contraseña debe tener al menos 6 caracteres");
    }
  };

  const cambiarRol = (id, nuevoRol) => {
    setUsuarios(usuarios.map(user => 
      user.id === id ? { ...user, rol: nuevoRol } : user
    ));
    alert(`Rol cambiado a ${nuevoRol}`);
  };

  const agregarUsuario = () => {
    const nombre = prompt("Nombre del nuevo usuario:");
    const email = prompt("Email del nuevo usuario:");
    
    if (nombre && email) {
      const nuevoUsuario = {
        id: Math.max(...usuarios.map(u => u.id)) + 1,
        nombre,
        email,
        rol: "viewer",
        activo: true,
        ultimoAcceso: "recién creado"
      };
      setUsuarios([...usuarios, nuevoUsuario]);
      alert("Usuario agregado exitosamente");
    }
  };

  return (
    <NavbarL>
    <div className="panel-usuarios">
      {/* Header */}
      <header className="header">
        <div>
          <h1>👥 Panel de Usuarios</h1>
          <p>Gestión simple de usuarios</p>
        </div>
        <div className="header-actions">
          <button className="btn-primary" onClick={agregarUsuario}>+ Nuevo Usuario</button>
        </div>
      </header>

      {/* Buscador */}
      <div className="buscador">
        <input
          type="text"
          placeholder="Buscar usuarios..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          aria-label="Buscar usuarios"
        />
        <button className="btn-ghost" onClick={() => setBusqueda('')}>Limpiar</button>
      </div>

      {/* Tabla */}
      <div className="tabla-container">
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Último Acceso</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuariosFiltrados.map(usuario => (
                <tr key={usuario.id}>
                  <td className="user-cell">{usuario.nombre} <br /><span className="user-email">{usuario.email}</span></td>
                  <td>
                    <select value={usuario.rol} onChange={(e) => cambiarRol(usuario.id, e.target.value)}>
                      <option value="admin">Administrador</option>
                      <option value="editor">Editor</option>
                      <option value="viewer">Visualizador</option>
                    </select>
                  </td>
                  <td>
                    <span className={usuario.activo ? "badge activo" : "badge inactivo"}>
                      {usuario.activo ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td>{usuario.ultimoAcceso}</td>
                  <td className="actions-cell">
                    <button className="action-btn" onClick={() => cambiarContrasena(usuario.id)}>Contraseña</button>
                    <button className="action-btn" onClick={() => cambiarEstado(usuario.id)}>
                      {usuario.activo ? "Desactivar" : "Activar"}
                    </button>
                    <button className="action-btn danger" onClick={() => eliminarUsuario(usuario.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {usuariosFiltrados.length === 0 && <p className="empty">No se encontraron usuarios.</p>}
      </div>
    </div>
    </NavbarL>
  );
}
