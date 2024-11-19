import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../BooksList/Books.css';

const Books = () => {
  const [books, setBooks] = useState([]); 
  const [visibleBooks, setVisibleBooks] = useState(4); 
  const [showAll, setShowAll] = useState(false); 

  useEffect(() => {
    fetch(`http://localhost:9000/books?limit=${visibleBooks}`) 
      .then(response => response.json())
      .then(data => {
        setBooks(data.books); 
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
  }, [visibleBooks]); 

  const handleViewMore = () => {
    setVisibleBooks((prev) => prev + 4); 
    setShowAll(true); 
  };

  const handleHide = () => {
    setVisibleBooks(4); 
    setShowAll(false); 
  };

  return (
    <div className="books-container">
      <h2 className="books-title">Найкращий вибір книжок</h2>

      <div className="books-list">
        {books.map((book) => ( 
          <div key={book.id} className="book">
            <div className="book-image">
              <img src={book.image} alt={book.title} />
            </div>
            <h3>{book.title}</h3>
            <p>{book.description}</p>
            <Link to={`/item/${book.id}`} className="learn-more-button">
              Дізнатись більше
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
