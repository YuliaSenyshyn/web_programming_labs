import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeItem, updateQuantity, addItem } from '../../redux/actions.js';
import './Cart.css';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    if (storedCart.length > 0) {
      storedCart.forEach((item) => {
        dispatch(addItem(item)); 
      });
    }
  }, [dispatch]);

  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  const handleIncrement = (id) => {
    const item = cartItems.find((cartItem) => cartItem.id === id);
    const newQuantity = item.quantity + 1;

    if (newQuantity <= item.availableQuantity) {
      dispatch(updateQuantity(id, newQuantity));
    } else {
      alert('Ви не можете додати більше товару, ніж є в наявності');
    }
  };

  const handleDecrement = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      dispatch(updateQuantity(id, currentQuantity - 1));
    } else {
      alert('Кількість не може бути менше 1');
    }
  };

  const handleAddItem = (item) => {
    dispatch(addItem(item)); 
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h2>Ваш кошик</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart-message">Кошик порожній</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id} className="cart-item">
              <div className="item-info">
                <span className="item-title">{item.title}</span>
                <span className="item-price">Ціна: {item.price} грн</span>
              </div>
              <div className="quantity-controls">
                <button
                  onClick={() => handleDecrement(item.id, item.quantity)}
                  disabled={item.quantity === 1}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncrement(item.id)}>+</button>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="remove-btn"
              >
                Видалити
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="total-amount">
        <span className="total-label">Загальна сума: </span>
        <span className="total-price">{totalAmount} грн</span>
      </div>

      <div className="buttons-container">
        <button
          className="back-to-shop-btn"
          onClick={() => navigate('/catalog')}
        >
          Повернутися до покупок
        </button>
      </div>
    </div>
  );
};

export default Cart;
