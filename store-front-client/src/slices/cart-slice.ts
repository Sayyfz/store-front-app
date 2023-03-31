import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import client from '../services/ApiService';
import { CartType } from '../types/Cart';
import { ResponseError } from '../types/ResponseError';

const endpoint = '/carts';
interface CartState {
    isCartOpened: boolean;
    cart: CartType | ResponseError | [];
}

const initialState: CartState = {
    isCartOpened: true,
    cart: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        toggleCart(state) {
            state.isCartOpened = !state.isCartOpened;
        },
    },
    extraReducers: builder => {
        builder.addCase(getCart.fulfilled, (state, action) => {
            state.cart = action.payload as CartType;
        });
        builder.addCase(getCart.rejected, (state, action) => {
            state.cart = action.payload as ResponseError;
        });
    },
});

export const getCart = createAsyncThunk('item/getCartItems', async (id: number, thunkAPI) => {
    try {
        const { data } = await client.get(import.meta.env.VITE_API_URL + endpoint + `/${id}`);
        return data;
    } catch (error) {
        console.log((error as Error).message);
    }
});

export const { toggleCart } = cartSlice.actions;
export default cartSlice.reducer;
