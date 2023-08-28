import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogined: false,
  memberId: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isLogined = action.payload.isLogined;
      state.memberId = action.payload.memberId;
    },
  },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
