import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/ENVIFO.png";
import './Navbar.css';

function Navbar() {
  return (
    <nav>
        <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
            <Link to="/Contact">Contact</Link>
        </li>
        <li>
            <Link to="/Login">Login</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;