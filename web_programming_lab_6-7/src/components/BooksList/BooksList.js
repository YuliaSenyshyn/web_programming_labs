import React, { useState } from 'react';
import './Books.css';
import Book1 from './book1.png';
import Book2 from './book2.jpg';
import Book3 from './book3.jpg';

const booksData = [
  {
    title: 'Слово про будинок Слово',
    description: 'Ця книжка розкриває особисте життя українських письменників...',
    image: Book1,
  },
  {
    title: 'Кайдашева сім\'я',
    description: 'Роман Івана Нечуя-Левицького, що зображує життя...',
    image: Book2,
  },
  {
    title: 'Тигролови',
    description: 'Роман Івана Багряного, що розповідає про боротьбу...',
    image: Book3,
  },
];

const Books = () => {
  const [visibleBooks, setVisibleBooks] = useState(3); 

  const handleViewMore = () => {
    setVisibleBooks((prev) => prev + 3);
  };

  return (
    <div className="books-container">
      <h2 className="books-title">Найкращий вибір книжок</h2>
      <div className="books-list">
        {booksData.slice(0, visibleBooks).map((book, index) => (
          <div key={index} className="book">
            <div className="book-image">
              <img src={book.image} alt={book.title} />
            </div>
            <h3>{book.title}</h3>
            <p>{book.description}</p>
          </div>
        ))}
      </div>
      {visibleBooks < booksData.length && ( // Перевірити, чи є більше книжок
        <div className="view-more-container">
          <button className="view-more" onClick={handleViewMore}>
            Переглянути більше
          </button>
        </div>
      )}
    </div>
  );
};

export default Books;
