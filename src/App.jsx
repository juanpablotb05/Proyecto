import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Inicio from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import PasswordRecovery from "./pages/PasswordRecovery/PasswordRecovery";
import AccountSettings from "./pages/AccountSettings/AccountSettings";
import RestablecerPassword from "./pages/RestablecerPassword/RestablecerPassword";
import UserProfile from "./pages/UserProfile/UserProfile";
import Dashboard from "./pages/Dashboard/Dashboard";
import Simulator from "./pages/Simulator/Simulator";
import Users from "./pages/Users/Users";
import Materiales from "./pages/Materiales/Materiales";

function Layout() {
  const location = useLocation();

  // Rutas donde el contenido debe estar centrado
  const centeredRoutes = ["/", "/Contact", "/UserProfile"];
  // Rutas que usan el estilo especial de login
  const loginRoutes = ["/Login.jsx"];
  // Rutas sin Navbar
  const noNavbarRoutes = [
    "/Login",
    "/password-recovery",
    "/forgot-password",
    "/RestablecerPassword",
    "/Dashboard",
    "/Simulator",
    "/AccountSettings",
    "/Users"
  ];

  const isLoginPage = loginRoutes.includes(location.pathname);
  const showNavbar = !noNavbarRoutes.includes(location.pathname);

  // Clase principal del main
  const mainClass = isLoginPage
    ? "login-main"
    : centeredRoutes.includes(location.pathname)
    ? "main-centered"
    : "";

  return (
    <div className="app-container">
      {showNavbar && <Navbar />}
      <main className={mainClass}>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/password-recovery" element={<PasswordRecovery />} />
          <Route path="/AccountSettings" element={<AccountSettings />} />
          <Route path="/RestablecerPassword" element={<RestablecerPassword />} />
          <Route path="/UserProfile" element={<UserProfile />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Simulator" element={<Simulator />} />
          <Route path="/Users" element={<Users />} />
          <Route path="/Materiales" element={<Materiales />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
