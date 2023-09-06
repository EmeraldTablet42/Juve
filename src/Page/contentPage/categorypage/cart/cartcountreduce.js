const initialState = {
    totalcount: 0,
  };
  
  export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'TOTAL_COUNT':
        return {
          ...state,
          totalcount: action.payload,
        };
      default:
        return state;
    }
  };