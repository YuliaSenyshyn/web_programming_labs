// src/components/Header/header.js
import React from 'react';
import './header.css';
import Logo from './books.png';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>
      <nav className="nav">
        <a href="/" className="nav-link">Home</a>
        <a href="/catalog" className="nav-link">Catalog</a> {/* Ensure this link points to Catalog */}
        <a href="/cart" className="nav-link">Cart</a>
      </nav>
    </header>
  );
};

export default Header;





