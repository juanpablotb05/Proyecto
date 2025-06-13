import React, { useState, useRef } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

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

  const handleSignUp = () => setRightPanelActive(true);
  const handleSignIn = () => setRightPanelActive(false);

  const registrarUsuario = () => {
    const usuarioNew = userRef.current.value.trim();
    const passwordNew = passRef.current.value.trim();
    if (!usuarioNew || !passwordNew) return;

    // Aquí podrías llamar a una API de registro si se requiere.

    userRef.current.value = "";
    passRef.current.value = "";
    alert("Usuario registrado (solo local)");
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

      localStorage.token = token;
      localStorage.email = tokenData.sub;
      localStorage.nombre = tokenData.name || "Sin nombre";

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
    <div className={`container ${isRightPanelActive ? "right-panel-active" : ""}`}>
      {/* REGISTRO */}
      <div className="form-container sign-up-container">
        <form>
          <h1>Crear cuenta</h1>
          <input type="text" ref={userRef} placeholder="Nombre" />
          <input type="password" ref={passRef} placeholder="Contraseña" />
          <button type="button" className="button" onClick={registrarUsuario}>
            Registrar
          </button>
        </form>
      </div>

      {/* LOGIN */}
      <div className="form-container sign-in-container">
        <form onSubmit={loginAction}>
          <h1>Iniciar sesión</h1>
          <div className="radio-group-container">
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="tipoUsuario"
                  value="Usuario"
                  checked={tipoUsuario === "Usuario"}
                  onChange={() => setTipoUsuario("Usuario")}
                />{" "}
                Usuario
              </label>
              <label style={{ marginLeft: "20px" }}>
                <input
                  type="radio"
                  name="tipoUsuario"
                  value="Empresa"
                  checked={tipoUsuario === "Empresa"}
                  onChange={() => setTipoUsuario("Empresa")}
                />{" "}
                Empresa
              </label>
            </div>
          </div>
          <input type="text" ref={userLogRef} placeholder="Nombre" />
          <input type="password" ref={passLogRef} placeholder="Contraseña" />
          <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
          <button type="submit" className="button" ref={botonRef}>
            Login
          </button>
          <p className="mensaje-error">{mensaje}</p>
        </form>
      </div>

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
  );
};

export default Login;
