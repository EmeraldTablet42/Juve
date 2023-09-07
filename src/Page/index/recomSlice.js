import { createSlice } from "@reduxjs/toolkit";

const RecomSlice = createSlice({
  name: "recom",
  initialState: [],
  reducers: {
    setRecoms: (state, action) => {
      return action.payload;
    },
  },
});

export const { setRecoms } = RecomSlice.actions;
export default RecomSlice.reducer;
