// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Header from './components/Header/header.js';
import Home from './components/Home/Home.js';
import Catalog from './components/Catalog/catalog.jsx';
import Item from './components/Item/Item.js';
import Footer from './components/Footer/footer.js'; 
import Cart from './components/Cart/Cart.js';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Головна сторінка */}
        <Route path="/catalog" element={<Catalog />} /> {/* Каталог */}
        <Route path="/item/:id" element={<Item />} /> {/* Деталі товару */}
        <Route path="/cart" element={<Cart />} /> {/* Кошик */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
