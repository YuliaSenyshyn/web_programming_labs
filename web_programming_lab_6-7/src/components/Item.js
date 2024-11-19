// src/components/Item/Item.js
import React from 'react';
import { useParams } from 'react-router-dom';

const Item = ({ items }) => {
  const { id } = useParams(); 
  const item = items.find((item) => item.id === parseInt(id)); 

  if (!item) {
    return <div>Item not found</div>; 
  }

  return (
    <div className="item-container">
      <h2>{item.title}</h2>
      <img src={item.image} alt={item.title} style={{ width: '200px', height: 'auto' }} />
      <p>{item.description}</p>
    </div>
  );
};

export default Item;
