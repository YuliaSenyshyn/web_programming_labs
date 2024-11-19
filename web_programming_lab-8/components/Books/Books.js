// Books.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../BooksList/Books.css'; 
import booksData from '../BooksList/BooksList.js'; 

const Books = () => {
  const [visibleBooks, setVisibleBooks] = useState(4); 
  const [showAll, setShowAll] = useState(false); 

  const handleViewMore = () => {
    setShowAll(true); 
    setVisibleBooks(booksData.length); 
  };

  const handleHide = () => {
    setShowAll(false); 
    setVisibleBooks(4); 
  };

  return (
    <div className="books-container">
      <h2 className="books-title">Найкращий вибір книжок</h2>
      <div className="books-list">
        {booksData.slice(0, visibleBooks).map((book) => (
          <div key={book.id} className="book">
            <Link to={`/item/${book.id}`} className="book-link">
              <div className="book-image">
                <img src={book.imageUrl} alt={book.title} />
              </div>
              <h3>{book.title}</h3>
              <p>{book.description}</p>
            </Link>
          </div>
        ))}
      </div>
      
      <div className="view-more-container">
        {showAll ? (
          <button className="hide" onClick={handleHide}>
            Сховати
          </button>
        ) : (
          <button className="view-more" onClick={handleViewMore}>
            Переглянути більше
          </button>
        )}
      </div>
    </div>
  );
};

export default Books;
