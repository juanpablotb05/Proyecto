import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Inicio from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import Login from './pages/Login/Login';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import PasswordRecovery from './pages/PasswordRecovery/PasswordRecovery';
import AccountSettings from './pages/AccountSettings/AccountSettings';
import RestablecerPassword from './pages/RestablecerPassword/RestablecerPassword';

function Layout() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/Login";
  const isPasswordRecoveryPage = location.pathname === "/password-recovery";
  const isForgotPasswordPage = location.pathname === "/forgot-password";
  const isRestablecerPasswordPage = location.pathname === "/RestablecerPassword"
  const showNavbar = !isLoginPage && !isPasswordRecoveryPage && !isForgotPasswordPage && !isRestablecerPasswordPage;
  
  return (
    <div className="app-container">
      {showNavbar && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} /> 
          <Route path="/password-recovery" element={<PasswordRecovery />} />
          <Route path="/AccountSettings" element={<AccountSettings />} />
          <Route path="/RestablecerPassword" element={<RestablecerPassword />} />
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
