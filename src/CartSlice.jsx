import { createSlice } from '@reduxjs/toolkit';

const CartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addItem: (state, { payload }) => {
      const existing = state.items.find(i => i.name === payload.name);
      if (existing) existing.quantity++;
      else state.items.push({ ...payload, quantity: 1 });
    },
    removeItem: (state, { payload }) => {
      state.items = state.items.filter(i => i.name !== payload);
    },
    updateQuantity: (state, { payload: { name, quantity } }) => {
      const item = state.items.find(i => i.name === name);
      if (item) item.quantity = quantity;
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;
