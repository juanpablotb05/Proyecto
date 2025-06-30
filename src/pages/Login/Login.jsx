import React, { useState, useRef } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Layout } from "../../components/Layout";

const Login = () => {
  const [isRightPanelActive, setRightPanelActive] = useState(false);
  const [intentos, setIntentos] = useState(3);
  const [mensaje, setMensaje] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("Usuario");

  const userRef = useRef(null);
  const passRef = useRef(null);
  const userLogRef = useRef(null);
  const passLogRef = useRef(null);
  const botonRef = useRef(null);

  // Nuevos estados para atributos adicionales
  const [formData, setFormData] = useState({
    // Comunes
    userName: "",
    password: "",
    // Usuario
    firstName: "",
    middleName: "",
    firstSurname: "",
    secondSurname: "",
    age: "",
    phone: "",
    email: "",
    state: false,
    // Empresa
    name: "",
    address: "",
    phoneCompany: "",
    emailCompany: "",
    url: "",
    stateCustomer: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSignUp = () => setRightPanelActive(true);
  const handleSignIn = () => setRightPanelActive(false);

  const registrarUsuario = () => {
    const usuarioNew = userRef.current.value.trim();
    const passwordNew = passRef.current.value.trim();
    if (!usuarioNew || !passwordNew) return;

    setUsuarios((prev) => [...prev, usuarioNew]);
    setContrasenas((prev) => [...prev, passwordNew]);

    console.log("Datos registrados:", {
      tipo: tipoUsuario,
      ...formData,
    });

    userRef.current.value = "";
    passRef.current.value = "";
    setFormData({ ...formData, password: "", userName: "" });
  };

  const loginAction = (e) => {
    e.preventDefault();
    if (intentos <= 0) return;

    const usuarioLog = userLogRef.current.value.trim();
    const passwordLog = passLogRef.current.value.trim();

    const loginData = {
      email: usuarioLog,
      password: passwordLog,
    };

    fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error de autenticación");
        return res.json();
      })
      .then((data) => {
      const token = data.accessToken; // Ajusta si tu backend devuelve otro campo
      const tokenData = jwtDecode(token); // ← CORREGIDO

      sessionStorage.token = token;
      sessionStorage.email = tokenData.sub;
      sessionStorage.nombre = tokenData.name || "Sin nombre";

      alert("Bienvenido: " + usuarioLog);
      setIntentos(3);
      setMensaje("");
      })
      .catch((err) => {
        console.error(err);
        const nuevosIntentos = intentos - 1;
        setIntentos(nuevosIntentos);
        if (nuevosIntentos > 0) {
          setMensaje(`Credenciales inválidas. Te quedan: ${nuevosIntentos} intentos.`);
        } else {
          alert("Número máximo de intentos alcanzado.");
          botonRef.current.style.display = "none";
          userLogRef.current.disabled = true;
          passLogRef.current.disabled = true;
        }
      });

    userLogRef.current.value = "";
    passLogRef.current.value = "";
  };

  return (
    <Layout>
    <div className={`container ${isRightPanelActive ? "right-panel-active" : ""}`}>
      {/* REGISTRO */}
      <div className="form-container sign-up-container">
        <form>
          <h1>Crear cuenta</h1>
          <div className="tipo-usuario-btn-group">
            <button
              type="button"
              className={`tipo-usuario-btn ${tipoUsuario === "Usuario" ? "active" : ""}`}
              onClick={() => setTipoUsuario("Usuario")}
            >
              Usuario
            </button>
            <button
              type="button"
              className={`tipo-usuario-btn ${tipoUsuario === "Empresa" ? "active" : ""}`}
              onClick={() => setTipoUsuario("Empresa")}
            >
              Empresa
            </button>
          </div>
        
          {/* Usuario */}
          {tipoUsuario === "Usuario" && (
            <>
              <input type="text" name="Nombre" placeholder="Nombre" onChange={handleInputChange} />
              <input type="text" name="Lastname" placeholder="Apellido" onChange={handleInputChange} />
              <input type="email" name="email" placeholder="Correo electrónico" onChange={handleInputChange} />
              <input type="password" ref={passRef} placeholder="Contraseña" name="password" onChange={handleInputChange} />
              <button type="button" className="button" onClick={registrarUsuario}>Registrar</button>
            </>
          )}

          {/* Empresa */}
          {tipoUsuario === "Empresa" && (
            <>
              <input type="text" name="name" placeholder="Nombre empresa" onChange={handleInputChange} />
              <input type="text" name="address" placeholder="Dirección" onChange={handleInputChange} />
              <input type="text" name="phoneCompany" placeholder="Teléfono empresa" onChange={handleInputChange} />
              <input type="email" name="emailCompany" placeholder="Correo electrónico empresa" onChange={handleInputChange} />
              <input type="password" ref={passRef} placeholder="Contraseña" name="password" onChange={handleInputChange} />
              <button type="button" className="button" onClick={registrarUsuario}>Registrar</button>
            </>
          )}
        </form>
      </div>

      {/* LOGIN */}
      <div className="form-container sign-in-container">
        <form onSubmit={loginAction}>
          <h1>Iniciar sesión</h1>
          <div className="radio-group-container">
            <div className="radio-group">
              <div className="tipo-usuario-btn-group">
                <button
                  type="button"
                  className={`tipo-usuario-btn ${tipoUsuario === "Usuario" ? "active" : ""}`}
                  onClick={() => setTipoUsuario("Usuario")}
                >
                  Usuario
                </button>
                <button
                  type="button"
                  className={`tipo-usuario-btn ${tipoUsuario === "Empresa" ? "active" : ""}`}
                  onClick={() => setTipoUsuario("Empresa")}
                >
                  Empresa
                </button>
              </div>
            </div>
          </div>
          <input type="email" ref={userLogRef} placeholder="Email" />
          <input type="password" ref={passLogRef} placeholder="Password" />
          <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
          <button type="submit" className="button" ref={botonRef}>Login</button>
          <p className="mensaje-error">{mensaje}</p>
        </form>
      </div>

      {/* OVERLAY */}
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>ENVIFO!</h1>
            <p>Para ingresar, inicie sesión con su información.</p>
            <button className="ghost" onClick={handleSignIn}>
              Login
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>¡Bienvenido!</h1>
            <p>Registre su información para ingresar al aplicativo.</p>
            <button className="ghost" onClick={handleSignUp}>
              Registrar
            </button>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default Login;



