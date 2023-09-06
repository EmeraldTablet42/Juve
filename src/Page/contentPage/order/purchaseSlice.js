import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: null,
};

const purchaseSlice = createSlice({
  name: "purchased",
  initialState,
  reducers: {
    setOrder: (state, action) => {
      state.order = action.payload;
    },
  },
});

export const { setOrder } = purchaseSlice.actions;

export default purchaseSlice.reducer;
