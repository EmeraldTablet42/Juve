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
  },
});

export const { setCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
