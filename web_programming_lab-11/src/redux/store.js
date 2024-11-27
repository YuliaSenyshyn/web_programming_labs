import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducers.js';

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
