import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      return state.filter(item => item.id !== action.payload);
    },
    clearCart: () => [],
    decrementQty: (state, action) => {
      const item = state.find(product => product.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    }
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  decrementQty,
} = cartSlice.actions;

export default cartSlice.reducer;
