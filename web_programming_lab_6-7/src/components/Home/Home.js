import React, { useState } from 'react';
import './Home.css'; 
import BooksImage from './bookss.avif';
import Catalog from '../Catalog/catalog'; 

const Home = () => {
  const [visibleBooks, setVisibleBooks] = useState(3); 

  const handleViewMore = () => {
    setVisibleBooks((prev) => prev + 3); 
  };

  return (
    <div className="home">
      <div className="intro">
        <div className="book-image">
          <img src={BooksImage} alt="Book Cover" />
        </div>
        <div className="intro-text">
          <h2>Літературний світ</h2>
          <p>
            Ласкаво просимо до нашого книжкового магазину, де ви знайдете безмежний вибір книг
            на будь-який смак. Від класичних творів до сучасних бестселерів – у нас є все, щоб
            задовольнити вашу любов до читання. Приходьте та відкрийте для себе нові історії та героїв!
          </p>
        </div>
      </div>
      <Catalog visibleBooks={visibleBooks} handleViewMore={handleViewMore} /> {/* Використовуємо Catalog тут */}
    </div>
  );
};

export default Home;
