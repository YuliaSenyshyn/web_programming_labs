import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../redux/actions.js';
import { selectCartItems } from '../../redux/selectors.js';
import './Item.css';

const Item = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [selectedPart, setSelectedPart] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems); 

  useEffect(() => {
    fetch(`http://localhost:9000/books/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setItem(null);
        } else {
          setItem(data);
          setSelectedPart(data.parts[0]); 
        }
      })
      .catch((error) => {
        console.error('Помилка при завантаженні книги:', error);
        setItem(null);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (item && selectedPart) {
      const existingItem = cartItems.find(
        (cartItem) => cartItem.id === item.id && cartItem.partId === selectedPart.id
      );
  
      if (existingItem) {
        const newQuantity = existingItem.quantity + Number(quantity);
        
        if (newQuantity <= selectedPart.availableQuantity) {
          dispatch(
            addItem({
              id: item.id,
              title: item.title,
              price: item.price,
              quantity: Number(quantity),
              availableQuantity: selectedPart.availableQuantity,
              partId: selectedPart.id, 
              partName: selectedPart.name,
            })
          );
          setMessage('Товар додано до кошика');
        } else {
          alert('Ви не можете додати більше товару, ніж є в наявності для цієї частини');
        }
      } else {
        const finalQuantity = Math.min(Number(quantity), selectedPart.availableQuantity);
        dispatch(
          addItem({
            id: item.id,
            title: item.title,
            price: item.price,
            quantity: finalQuantity,
            availableQuantity: selectedPart.availableQuantity,
            partId: selectedPart.id, 
            partName: selectedPart.name,
          })
        );
        setMessage('Товар додано до кошика');
      }
  
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
  };
  

  const handlePartChange = (e) => {
    const selected = item.parts.find((part) => part.id === e.target.value);
    setSelectedPart(selected);
    setQuantity(1); 
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

            <label htmlFor="part">Виберіть частину:</label>
            <select
              id="part"
              value={selectedPart?.id || ''}
              onChange={handlePartChange}
              className="part-select"
            >
              {item.parts.map((part) => (
                <option key={part.id} value={part.id}>
                  {part.name} (Доступно: {part.availableQuantity})
                </option>
              ))}
            </select>

            {selectedPart && (
              <>
                <label htmlFor="quantity">Кількість:</label>
                <select
                  id="quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="quantity-select"
                >
                  {Array.from({ length: selectedPart.availableQuantity }, (_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </>
            )}

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

      {message && (
        <div className="toast">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default Item;
