import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/ENVIFO.png";
import "./Navbar.css";

function Navbar() {
  return (
    <nav>
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>

      <ul className="menu">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Simulator">Simulador 3D</Link>
        </li>
        <li>
          <Link to="/Contact">Contact</Link>
        </li>
      </ul>

      <div className="right-section">
        <Link to="/Login" className="login-btn" aria-label="Login">
          {/* Inline user circle icon to avoid extra dependency */}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="8" r="3.2" stroke="white" strokeWidth="1.6" fill="none" />
            <path d="M4 20c0-3.3137 2.6863-6 6-6h4c3.3137 0 6 2.6863 6 6" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
