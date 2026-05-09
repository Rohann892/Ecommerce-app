import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      
      if (!existingItem) {
        state.items.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
      
      state.totalAmount = state.items.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
      
      state.totalAmount = state.items.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
    },
    deleteItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      
      if (existingItem) {
        state.totalQuantity = state.totalQuantity - existingItem.quantity;
        state.items = state.items.filter((item) => item.id !== id);
      }
      
      state.totalAmount = state.items.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
    },
    clearCart(state) {
      state.items = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
