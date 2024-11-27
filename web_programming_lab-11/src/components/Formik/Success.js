import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearCart } from '../../redux/actions.js';
import './Success.css';

const Success = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <div className="success-container">
      <h2>Дякуємо за покупку!</h2>
      <p>Ваше замовлення було успішно оформлено.</p>
      <Link to="/">Повернутися на головну</Link>
    </div>
  );
};

export default Success;
