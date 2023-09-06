import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    setCart: (state, action) => {
      state.cart = state.cart.concat(action.payload);
    },
    removeFromCart: (state, action) => {
      const index = action.payload;
      state.cart.splice(index, 1);
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { setCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
