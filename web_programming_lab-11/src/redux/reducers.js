import { REMOVE_ITEM, UPDATE_QUANTITY, ADD_ITEM, CLEAR_CART } from './actions.js';

const initialState = {
  items: JSON.parse(localStorage.getItem('cart')) || [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_ITEM: {
      const updatedItemsAfterRemove = state.items.filter(
        (item) => item.id !== action.payload.id || item.partId !== action.payload.partId 
      );
      localStorage.setItem('cart', JSON.stringify(updatedItemsAfterRemove));
      return { ...state, items: updatedItemsAfterRemove };
    }

    case UPDATE_QUANTITY: {
      const updatedItems = state.items.map((item) =>
        item.id === action.payload.id && item.partId === action.payload.partId
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedItems)); 
      return { ...state, items: updatedItems };
    }

    case ADD_ITEM: {
      const itemExists = state.items.find(
        (item) => item.id === action.payload.id && item.partId === action.payload.partId
      );
      let updatedItems;
    
      if (itemExists) {
        updatedItems = state.items.map((item) =>
          item.id === action.payload.id && item.partId === action.payload.partId
            ? { 
                ...item, 
                quantity: Math.min(action.payload.quantity, item.availableQuantity) 
              }
            : item
        );
      } else {
        updatedItems = [
          ...state.items,
          { 
            ...action.payload, 
            quantity: Math.min(action.payload.quantity, action.payload.availableQuantity) 
          },
        ];
      }
    
      localStorage.setItem('cart', JSON.stringify(updatedItems)); 
      return { ...state, items: updatedItems };
    }

    case CLEAR_CART: {
      localStorage.removeItem('cart'); 
      return { ...state, items: [] };
    }

    default:
      return state;
  }
};

export default cartReducer;
