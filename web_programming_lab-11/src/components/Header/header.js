// src/components/Header/header.js
import React from 'react';
import './header.css';
import Logo from './books.png';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>
      <nav className="nav">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/catalog" className="nav-link">Catalog</Link>
        <Link to="/cart" className="nav-link">Cart</Link>
      </nav>
    </header>
  );
};

export default Header;





