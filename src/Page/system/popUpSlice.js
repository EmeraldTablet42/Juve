import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartComplete: false,
};

const popUpSlice = createSlice({
  name: "popUp",
  initialState,
  reducers: {
    setPopUpSlice: (state, action) => {
      state.cartComplete = action.payload.cartComplete;
    },
  },
});

export const { setPopUpSlice } = popUpSlice.actions;

export default popUpSlice.reducer;
