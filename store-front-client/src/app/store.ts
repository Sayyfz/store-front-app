import { configureStore } from '@reduxjs/toolkit';
import itemReducer from '../slices/item-slice';
import cartReducer from '../slices/cart-slice';
import authReducer from '../slices/auth-slice';

export const store = configureStore({
    reducer: {
        items: itemReducer,
        cart: cartReducer,
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
