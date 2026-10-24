import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

// Komponen Navbar menggunakan Link dari react-router-dom untuk navigasi SPA tanpa reload
function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          <Link to="/">Koleksi BukuKu</Link>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/">Daftar Buku</Link>
          </li>
          <li>
            <Link to="/stats">Statistik</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
