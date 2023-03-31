import { configureStore } from '@reduxjs/toolkit';
import itemReducer from '../slices/item-slice';
import cartReducer from '../slices/cart-slice';

export const store = configureStore({
    reducer: {
        items: itemReducer,
        cart: cartReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
