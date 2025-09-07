import React, { useState, useRef } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import logo from '../../assets/ENVIFO.png';
import { Layout } from "../../components/Layout";
import { HiOutlineLogin } from "react-icons/hi";

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
    const name = nameUserRef.current.value.trim();
    const surName = lastNameUserRef.current.value.trim();
    const emailReg = emailUserRef.current.value.trim();
    const passwordReg = passUserRef.current.value.trim();

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

        nameUserRef.current.value = "";
        lastNameUserRef.current.value = "";
        emailUserRef.current.value = "";
        passUserRef.current.value = "";
      })
      .catch((err) => {
        console.error(err);
        alert("Hubo un problema al registrar el usuario.");
      });
  };

  const loginAction = async (e) => {
    e.preventDefault();
    if (intentos <= 0) return;

    const usuarioLog = (userLogRef.current && userLogRef.current.value || '').trim();

    // If mocking is enabled, bypass network and simulate successful login
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

    // Real network login (kept for future use)
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      setMensaje('Sin conexión. Por favor verifica tu red.');
      return;
    }

    const passwordLog = (passLogRef.current && passLogRef.current.value || '').trim();

    const loginData = {
      email: usuarioLog,
      password: passwordLog,
    };

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout

    try {
      const res = await fetch("https://envifo-java-backend-api-rest.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!res.ok) {
        // try to parse error message
        let text = '';
        try { text = await res.text(); } catch (e) {}
        throw new Error(text || 'Error de autenticación');
      }

      const data = await res.json();
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
    } catch (err) {
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
    } finally {
      clearTimeout(timeout);
      if (userLogRef.current) userLogRef.current.value = "";
      if (passLogRef.current) passLogRef.current.value = "";
    }
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

            {tipoUsuario === "Usuario" && (
              <>
                <input type="text" name="Nombre" ref={nameUserRef} placeholder="Nombre" />
                <input type="text" name="Lastname" ref={lastNameUserRef} placeholder="Apellido" />
                <input type="email" name="email" ref={emailUserRef} placeholder="Correo electrónico" />
                <input type="password" ref={passUserRef} placeholder="Contraseña" name="password" />
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

        {/* LOGIN */}
        <div className="form-container sign-in-container">
          <div style={{ position: "absolute", top: "10px", left: "10px" }}>
            <Link to="/" className="Login-btn" aria-label="Volver">
              <HiOutlineLogin size={28} color="black" />
            </Link>
          </div>

          <form onSubmit={loginAction}>
            <h1>Iniciar sesión</h1>
            <div className="radio-group-container">
              <div className="radio-group"></div>
            </div>
            <input type="email" ref={userLogRef} placeholder="Email" />
            <input type="password" ref={passLogRef} placeholder="Password" />
            <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
            <button type="submit" className="button" ref={botonRef}>
              Login
            </button>
            <p className="mensaje-error">{mensaje}</p>
          </form>
        </div>

        {/* OVERLAY */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <div className="logo-section">
                <img src={logo} alt="Envifo Logo" className="logo" onClick={() => navigate('/')} />
              </div>
              <p>Para ingresar, inicie sesión con su información.</p>
              <button className="ghost" onClick={handleSignIn}>
                Login
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <div className="logo-section">
                <img src={logo} alt="Envifo Logo" className="logo" onClick={() => navigate('/')} />
              </div>
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
