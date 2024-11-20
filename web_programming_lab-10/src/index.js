import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals.js';

// Імпортуємо Redux
import { Provider } from 'react-redux';
import store  from './redux/store.js'; // Іменований імпорт
 // Імпорт Redux store

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Обгортаємо додаток у Provider та передаємо store */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// Для моніторингу продуктивності
reportWebVitals();

