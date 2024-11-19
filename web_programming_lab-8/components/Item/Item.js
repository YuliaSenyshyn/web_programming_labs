// src/components/Item/Item.js
import React, { useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { BookContext } from '../BookContext.js';
import './Item.css';

const Item = () => {
  const { id } = useParams();
  const { books } = useContext(BookContext);
  const item = books.find((item) => item.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  if (!item) {
    return <div>Книга не знайдена</div>;
  }

  const handleGoToCart = () => {
    navigate('/cart');
  };

  const totalPrice = item.price * quantity;

  return (
    <div className="item-container">
      <div className="item-image">
        <img src={item.image} alt={item.title} />
      </div>
      <div className="item-details">
        <h2>{item.title}</h2>
        <p>{item.fullDescription}</p>
        
        <p className="item-price">Ціна: {item.price} грн</p>
        
        <label htmlFor="quantity">Кількість:</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="quantity-input"
        />
        
        <p className="total-price">Сума: {totalPrice} грн</p>

        <div className="button-container">
          <button onClick={handleGoToCart} className="add-to-cart-button">
            Додати до кошика
          </button>

          <Link to="/catalog" className="go-back-button">
            Повернутись до каталогу
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Item;
