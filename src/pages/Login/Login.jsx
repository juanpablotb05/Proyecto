import React, { useState, useRef } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineLogin } from "react-icons/hi";
import { jwtDecode } from "jwt-decode";
import logo from '../../assets/ENVIFO.png';
import { Layout } from "../../components/Layout";

const Login = () => {
  const [isRightPanelActive, setRightPanelActive] = useState(false);
  const [intentos, setIntentos] = useState(3);
  const [mensaje, setMensaje] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("Usuario");
  const navigate = useNavigate();
  const MOCK_LOGIN = false; // set to true to bypass network during development

  const userRef = useRef(null);
  const passRef = useRef(null);
  const userLogRef = useRef(null);
  const passLogRef = useRef(null);
  const botonRef = useRef(null);
  const nameUserRef = useRef(null);
  const lastNameUserRef = useRef(null);
  const emailUserRef = useRef(null);
  const passUserRef = useRef(null);

  const handleSignUp = () => setRightPanelActive(true);
  const handleSignIn = () => setRightPanelActive(false);

  const registrarUsuario = () => {
    const name = nameUserRef.current && nameUserRef.current.value ? nameUserRef.current.value.trim() : '';
    const surName = lastNameUserRef.current && lastNameUserRef.current.value ? lastNameUserRef.current.value.trim() : '';
    const emailReg = emailUserRef.current && emailUserRef.current.value ? emailUserRef.current.value.trim() : '';
    const passwordReg = passUserRef.current && passUserRef.current.value ? passUserRef.current.value.trim() : '';

    const registerData = {
      firstName: name,
      firstSurname: surName,
      email: emailReg,
      password: passwordReg,
    };

    fetch("https://envifo-java-backend-api-rest.onrender.com/api/registerUser", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al registrar usuario");
        return res.text();
      })
      .then((msg) => {
        console.log("Mensaje recibido:", msg);
        alert("Usuario registrado con éxito");
        setRightPanelActive(false);

        if (nameUserRef.current) nameUserRef.current.value = "";
        if (lastNameUserRef.current) lastNameUserRef.current.value = "";
        if (emailUserRef.current) emailUserRef.current.value = "";
        if (passUserRef.current) passUserRef.current.value = "";
      })
      .catch((err) => {
        console.error(err);
        alert("Hubo un problema al registrar el usuario.");
      });
  };

  const loginAction = (e) => {
    e.preventDefault();
    if (intentos <= 0) return;

    const usuarioLog = userLogRef.current && userLogRef.current.value ? userLogRef.current.value.trim() : '';
    const passwordLog = passLogRef.current && passLogRef.current.value ? passLogRef.current.value.trim() : '';

    if (MOCK_LOGIN) {
      const fakeToken = 'dev-token';
      sessionStorage.token = fakeToken;
      sessionStorage.email = usuarioLog || 'dev@local';
      sessionStorage.nombre = 'Dev User';
      sessionStorage.permiso = 'admin';
      sessionStorage.usuario = '0';

      setIntentos(3);
      setMensaje('');
      navigate('/Dashboard');

      if (userLogRef.current) userLogRef.current.value = '';
      if (passLogRef.current) passLogRef.current.value = '';
      return;
    }

    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      setMensaje('Sin conexión. Por favor verifica tu red.');
      return;
    }

    const loginData = {
      email: usuarioLog,
      password: passwordLog,
    };

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout
    const base = "https://envifo-java-backend-api-rest.onrender.com/api";

    fetch(`${base.replace(/\/+$/, "")}/login`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
      signal: controller.signal,
    })
      .then((res) => {
        clearTimeout(timeout);
        if (!res.ok) {
          return res.text().then((t) => { throw new Error(t || 'Error de autenticación'); });
        }
        return res.json();
      })
      .then((data) => {
        const token = data && (data.accessToken || data.token);
        if (!token) throw new Error('Token no recibido');
        const tokenData = jwtDecode(token);

        sessionStorage.token = token;
        sessionStorage.email = tokenData.sub;
        sessionStorage.nombre = tokenData.name || "Sin nombre";
        sessionStorage.permiso = tokenData.idPermiso;
        sessionStorage.usuario = tokenData.idUsuario;

        setIntentos(3);
        setMensaje("");
        navigate("/Dashboard");
      })
      .catch((err) => {
        console.error('Login error:', err);
        const nuevosIntentos = intentos - 1;
        setIntentos(nuevosIntentos);

        if (err.name === 'AbortError') {
          setMensaje('La solicitud tardó demasiado. Intenta de nuevo.');
        } else if (err.message && (err.message.includes('Failed to fetch') || err.message.includes('NetworkError') || err.message.includes('Token no recibido'))) {
          setMensaje('No se pudo conectar al servidor. Intenta más tarde.');
        } else {
          setMensaje(`Credenciales inválidas. Te quedan: ${nuevosIntentos} intentos.`);
        }

        if (nuevosIntentos <= 0) {
          alert("Número máximo de intentos alcanzado.");
          if (botonRef.current) botonRef.current.style.display = "none";
          if (userLogRef.current) userLogRef.current.disabled = true;
          if (passLogRef.current) passLogRef.current.disabled = true;
        }
      })
      .finally(() => {
        clearTimeout(timeout);
        if (userLogRef.current) userLogRef.current.value = "";
        if (passLogRef.current) passLogRef.current.value = "";
      });
  };

  return (
    <Layout>
      <div className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`}>
        <div className="form-container sign-up-container">
          <form>
            <h1>Crear cuenta</h1>
            <div className="radio-section">
              <div className="radio-group">
                <p>Tipo</p>
                <label>
                  <input type="radio" name="tipo" checked={tipoUsuario === 'Usuario'} onChange={() => setTipoUsuario('Usuario')} /> Usuario
                </label>
                <label>
                  <input type="radio" name="tipo" checked={tipoUsuario === 'Empresa'} onChange={() => setTipoUsuario('Empresa')} /> Empresa
                </label>
              </div>
            </div>

            {tipoUsuario === "Usuario" && (
              <>
                <input type="text" ref={nameUserRef} placeholder="Nombre" />
                <input type="text" ref={lastNameUserRef} placeholder="Apellido" />
                <input type="email" ref={emailUserRef} placeholder="Correo electrónico" />
                <input type="password" ref={passUserRef} placeholder="Contraseña" />
                <button type="button" className="button" onClick={registrarUsuario}>
                  Registrar
                </button>
              </>
            )}

            {tipoUsuario === "Empresa" && (
              <>
                <input type="text" name="name" placeholder="Nombre empresa" />
                <input type="text" name="address" placeholder="Dirección" />
                <input type="text" name="phoneCompany" placeholder="Teléfono empresa" />
                <input type="email" name="emailCompany" ref={userRef} placeholder="Correo electrónico empresa" />
                <input type="password" ref={passRef} placeholder="Contraseña" name="password" />
                <button type="button" className="button" onClick={registrarUsuario}>
                  Registrar
                </button>
              </>
            )}
          </form>
        </div>

        <div className="form-container sign-in-container">
          <form onSubmit={loginAction}>
            <h1>Iniciar sesión</h1>
            <p>Para ingresar, inicie sesión con su información.</p>
            <input type="email" ref={userLogRef} placeholder="Email" />
            <input type="password" ref={passLogRef} placeholder="Password" />
            <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
            <button type="submit" className="button">
              <HiOutlineLogin /> Login
            </button>
            {mensaje && <p className="error">{mensaje}</p>}
          </form>
        </div>

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Bienvenido de nuevo!</h1>
              <p>Para mantener conectados con nosotros, por favor inicia sesión con tus datos personales</p>
              <button className="ghost" onClick={handleSignIn}>Login</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Crea tu cuenta</h1>
              <p>Registre su información para ingresar al aplicativo.</p>
              <button className="ghost" onClick={handleSignUp}>Registrar</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
