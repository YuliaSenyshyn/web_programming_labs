import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Header from './components/Header/header.js';
import Home from './components/Home/Home.js';
import Catalog from './components/Catalog/catalog.jsx';
import Item from './components/Item/Item.js';
import Footer from './components/Footer/footer.js'; 
import Cart from './components/Cart/Cart.js';
import Checkout from './components/Formik/Checkout.js';  
import Success from './components/Formik/Success.js';  

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/item/:id" element={<Item />} />
        <Route path="/cart" element={<Cart />} /> 
        <Route path="/checkout" element={<Checkout />} /> 
        <Route path="/success" element={<Success />} /> 
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
