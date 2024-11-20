import React from 'react';
import '../Input/Input.css';

const Input = ({ type = 'text', placeholder, value, onChange }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`${type === 'number' ? 'catalog-price-input' : 'catalog-search'}`}
        />
    );
};

export default Input;