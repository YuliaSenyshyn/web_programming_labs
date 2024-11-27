import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeItem, updateQuantity, addItem, clearCart } from '../../redux/actions.js';
import { selectCartItems, selectTotalAmount } from '../../redux/selectors.js';
import './Cart.css';
import Checkout from '../Formik/Checkout.js';

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectTotalAmount);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isCheckoutOpen, setCheckoutOpen] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    if (storedCart.length > 0) {
      storedCart.forEach((item) => {
        dispatch(addItem(item));
      });
    }
  }, [dispatch]);

  const handleRemove = (id, partId) => {
    dispatch(removeItem({ id, partId }));
  };

  const handleIncrement = (id, partId) => {
    const item = cartItems.find((cartItem) => cartItem.id === id && cartItem.partId === partId);
    const newQuantity = item.quantity + 1;

    if (newQuantity <= item.availableQuantity) {
      dispatch(updateQuantity(id, partId, newQuantity));
    } else {
      alert('Ви не можете додати більше товару, ніж є в наявності');
    }
  };

  const handleDecrement = (id, partId, currentQuantity) => {
    if (currentQuantity > 1) {
      dispatch(updateQuantity(id, partId, currentQuantity - 1));
    } else {
      alert('Кількість не може бути менше 1');
    }
  };

  const handleCheckout = () => {
    setCheckoutOpen(true);
  };

  const closeCheckoutModal = () => {
    setCheckoutOpen(false); // Більше не очищуємо кошик
  };

  const handleClearCart = () => {
    if (window.confirm('Ви впевнені, що хочете очистити кошик?')) {
      dispatch(clearCart());
    }
  };

  return (
    <div className="cart-container">
      <h2>Ваш кошик</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart-message">Кошик порожній</p>
      ) : (
        <ul>
          {cartItems.map((item) => {
            const itemTotal = item.price * item.quantity;
            return (
              <li key={`${item.id}-${item.partId}`} className="cart-item">
                <div className="item-info">
                  <span className="item-title">{item.title}</span>
                  <span className="item-part">Частина: {item.partName}</span>
                  <span className="item-price">Ціна: {item.price} грн</span>
                  <span className="item-total">Сума: {itemTotal} грн</span>
                </div>
                <div className="quantity-controls">
                  <button
                    onClick={() => handleDecrement(item.id, item.partId, item.quantity)}
                    disabled={item.quantity === 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrement(item.id, item.partId)}>
                    +
                  </button>
                </div>

                <button onClick={() => handleRemove(item.id, item.partId)} className="remove-btn">
                  Видалити
                </button>
              </li>
            );
          })}
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

        {cartItems.length > 0 && (
          <button
            className="checkout-btn"
            onClick={handleCheckout}
          >
            Оформити замовлення
          </button>
        )}
      </div>

      {isCheckoutOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={closeCheckoutModal}>
              Закрити
            </button>
            <Checkout />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
