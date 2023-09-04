// productsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    productCodeToName: {},
  },
  reducers: {
    setProductCodeToName: (state, action) => {
      state.productCodeToName = action.payload;
    },
  },
});

export const { setProductCodeToName } = productsSlice.actions;
export default productsSlice.reducer;