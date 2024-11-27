export const selectCartItems = (state) => state.cart.items;

export const selectTotalAmount = (state) =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);


