import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './addmenuslice';

const menustore = configureStore({
    reducer: {
        menu : menuReducer,
    },
});

export default menustore