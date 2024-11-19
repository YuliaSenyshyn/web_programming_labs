import React from 'react';
import './Home.css'; 
import BooksImage from './bookss.avif';
import Books from '../Books/Books.js'; 

const Home = () => {
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
      <Books /> 
    </div>
  );
};

export default Home;
