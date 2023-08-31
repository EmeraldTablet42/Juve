import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const menuSlice = createSlice({
  name: "addmenu",
  initialState,
  reducers: {
    addMenuData: (state, action) => {
      const newMenus = action.payload; // 새로운 메뉴 데이터 배열

      newMenus.forEach(newMenu => {
        // counting을 제외한 새로운 객체 생성
        const newMenuWithoutCounting = { ...newMenu };
        delete newMenuWithoutCounting.counting;

        // 기존 배열에서 동일한 메뉴 찾기
        const index = state.findIndex(item => {
          const itemWithoutCounting = { ...item };
          delete itemWithoutCounting.counting;
          return JSON.stringify(itemWithoutCounting) === JSON.stringify(newMenuWithoutCounting);
        });

        if (index !== -1) {
          // 동일한 메뉴가 있으면 counting 값 더하기
          state[index].counting += newMenu.counting;
        } else {
          // 동일한 메뉴가 없으면 배열에 추가
          state.push(newMenu);
        }
      });
    },
    resetMenuData: (state) => {
      return initialState; // 초기 상태로 리셋
    },
  },
});

export const { addMenuData, resetMenuData } = menuSlice.actions;
export default menuSlice.reducer;
