import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
    isCartOpened: boolean;
}

const initialState: CartState = {
    isCartOpened: true,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        toggleCart(state) {
            state.isCartOpened = !state.isCartOpened;
        },
    },
});

export const { toggleCart } = cartSlice.actions;
export default cartSlice.reducer;
