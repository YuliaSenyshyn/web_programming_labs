import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../redux/actions.js';
import './Item.css';

const Item = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState(''); // Стан для тосту
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    fetch(`http://localhost:9000/books/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setItem(null);
        } else {
          setItem(data);
        }
      })
      .catch((error) => {
        console.error('Помилка при завантаженні книги:', error);
        setItem(null);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (item) {
      const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        const newQuantity = existingItem.quantity + Number(quantity);

        if (newQuantity <= item.availableQuantity) {
          dispatch(
            addItem({
              id: item.id,
              title: item.title,
              price: item.price,
              quantity: Number(quantity),
              availableQuantity: item.availableQuantity,
            })
          );
          setMessage('Товар додано до кошика');
        } else {
          alert('Ви не можете додати більше товару, ніж є в наявності');
        }
      } else {
        const finalQuantity = Math.min(Number(quantity), item.availableQuantity);
        dispatch(
          addItem({
            id: item.id,
            title: item.title,
            price: item.price,
            quantity: finalQuantity,
            availableQuantity: item.availableQuantity,
          })
        );
        setMessage('Товар додано до кошика');
      }

      // Встановлюємо таймер для зникнення повідомлення через 3 секунди
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleGoToCart = () => {
    navigate('/cart');
  };

  return (
    <div className="item-container">
      {item ? (
        <>
          <div className="item-image">
            <img src={item.image} alt={item.title} />
          </div>
          <div className="item-details">
            <h2>{item.title}</h2>
            <p>{item.fullDescription}</p>
            <p className="item-price">Ціна: {item.price} грн</p>

            <p className="item-availability">
              Доступно: <span>{item.availableQuantity}</span> шт.
            </p>

            <label htmlFor="quantity">Кількість:</label>
            <select
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              className="quantity-select"
            >
              {/* Додаємо варіанти для кількості товару */}
              {Array.from({ length: item.availableQuantity }, (_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>

            <div className="button-container">
              <button onClick={handleAddToCart} className="add-to-cart-button">
                Додати до кошика
              </button>
              <button onClick={handleGoToCart} className="go-to-cart-button">
                Перейти до кошика
              </button>
              <Link to="/catalog" className="go-back-button">
                Повернутись до каталогу
              </Link>
            </div>
          </div>
        </>
      ) : (
        <p>Книга не знайдена</p>
      )}

      {/* Тост-повідомлення */}
      {message && (
        <div className="toast">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default Item;
