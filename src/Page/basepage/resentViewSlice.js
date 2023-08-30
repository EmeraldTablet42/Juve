import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resentViewImgUp: "",
  resentViewCodeUp: "",
  resentViewImgDown: "",
  resentViewCodeDown: "",
};

const resentViewSlice = createSlice({
  name: "resentView",
  initialState,
  reducers: {
    setResentView: (state, action) => {
      state.resentViewImgUp = action.payload.resentViewImgUp;
      state.resentViewCodeUp = action.payload.resentViewCodeUp;
      state.resentViewCodeDown = action.payload.resentViewCodeDown;
      state.resentViewImgDown = action.payload.resentViewImgDown;
    },
  },
});

export const { setResentView } = resentViewSlice.actions;

export default resentViewSlice.reducer;
