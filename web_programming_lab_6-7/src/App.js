// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Header from './components/Header/header';
import Home from './components/Home/Home';
import Catalog from './components/Catalog/catalog';
import Item from './components/Item';
import Footer from './components/Footer/footer'; 
import { initialBooksData } from './utils/BooksData';

const App = () => {
  const [visibleBooks, setVisibleBooks] = useState(3); 

  const handleViewMore = () => {
    setVisibleBooks((prevVisible) => prevVisible + 3); 
  };


  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog visibleBooks={visibleBooks} handleViewMore={handleViewMore} />} />
        <Route path="/item/:id" element={<Item items={initialBooksData} />} />
      </Routes>
      <Footer /> {/* Include Footer here */}
    </Router>
  );
};

export default App;
