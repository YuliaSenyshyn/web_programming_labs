export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
export const CLEAR_CART = 'CLEAR_CART';

export const addItem = (item) => ({
  type: ADD_ITEM,
  payload: item,
});

export const removeItem = (item) => ({
  type: REMOVE_ITEM,
  payload: item,
});

export const updateQuantity = (id, partId, quantity) => {
  return {
    type: UPDATE_QUANTITY,
    payload: { id, partId, quantity },
  };
};

export const clearCart = () => ({
  type: CLEAR_CART,
});

