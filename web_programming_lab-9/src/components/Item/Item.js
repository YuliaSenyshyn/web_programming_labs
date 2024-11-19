import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './Item.css';

const Item = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null); 
  const [quantity, setQuantity] = useState(1);  
  const [totalPrice, setTotalPrice] = useState(0); 
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:9000/books/${id}`)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setItem(null); 
        } else {
          setItem(data);  
        }
      })
      .catch(error => {
        console.error('Error fetching book:', error);
        setItem(null);  
      });
  }, [id]);

  useEffect(() => {
    if (item) {
      fetch('http://localhost:9000/calculate-total', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookId: item.id,
          quantity: quantity,
        }),
      })
        .then(response => response.json())
        .then(data => {
          setTotalPrice(data.totalPrice); 
        })
        .catch(error => {
          console.error('Error calculating total:', error);
        });
    }
  }, [item, quantity]); 

  if (!item) {
    return <div>Книга не знайдена</div>; 
  }

  const handleGoToCart = () => {
    
    navigate('/cart');
  };

  const handleAddToCart = () => {
    fetch('http://localhost:9000/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bookId: item.id,
        quantity: quantity,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Book added to cart:', data);
      })
      .catch(error => {
        console.error('Error adding book to cart:', error);
      });
  };

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
          <button onClick={handleAddToCart} className="add-to-cart-button">
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
