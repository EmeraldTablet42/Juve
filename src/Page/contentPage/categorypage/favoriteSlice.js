import { createSlice } from "@reduxjs/toolkit";
const initialState = [];

const favoriteSlice = createSlice({
  name: 'fav',
  initialState,
  reducers: {
    setFavorite: (state, action) => {
      return action.payload;
    },
    removeFavorite: (state, action) => {
      // action.payload에 제거하려는 값을 전달받아서 배열에서 제거합니다.
      return state.filter((item) => item !== action.payload);
    },
    addFavorite: (state, action) => {
      // action.payload에 추가하려는 값을 전달받아서 배열에 추가합니다.
      state.push(action.payload);
    },
  },
});

export const { setFavorite, removeFavorite, addFavorite } =
  favoriteSlice.actions;

export default favoriteSlice.reducer;
