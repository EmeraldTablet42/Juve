import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const menuSlice = createSlice({
  name: "addmenu",
  initialState,
  reducers: {
    addMenuData: (state, action) => {
      state.push(action.payload);
    },
    resetMenuData: (state) => {
      return initialState; // 초기 상태로 리셋
    },
  },
});

export const { addMenuData,resetMenuData } = menuSlice.actions;
export default menuSlice.reducer;
