import { createSlice } from '@reduxjs/toolkit'

const menuSlice = createSlice({
    name: "addmenu",
    initialState: [],
    reducers: {
      addMenuData: (state, action) => {
        return [...state, action.payload]
      },
    },
  });

  export const { addMenuData } = menuSlice.actions;
export default menuSlice.reducer;