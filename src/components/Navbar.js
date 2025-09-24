import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">Transcript Manager</h2>
      <ul className="nav-links">
        <li>
          <Link to="/">Transcript Manager</Link>
        </li>
        <li>
          <Link to="/accuracy">Accuracy Analyser</Link>
        </li>
        <li>
          <Link to="/reports">Reports</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
