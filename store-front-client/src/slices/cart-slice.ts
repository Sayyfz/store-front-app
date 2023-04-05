import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, CartType } from '../types/Cart';
import { ResponseError } from '../types/ResponseError';
import ApiService from '../services/ApiService';
import { ProductType } from '../types/Product';
import axios, { AxiosError } from 'axios';
import { getCookie } from '../helpers/Cookies';

const endpoint = '/carts';
interface CartState {
    isCartOpened: boolean;
    cart: CartType | ResponseError | {};
}

const initialState: CartState = {
    isCartOpened: false,
    cart: {},
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        toggleCart(state) {
            state.isCartOpened = !state.isCartOpened;
        },
        fetchCartFromStorage(state) {
            state.cart = JSON.parse(localStorage.getItem('cart') as string) as CartType;
        },
    },
    extraReducers: builder => {
        builder.addCase(addProductToCart.fulfilled, (state: CartState, action) => {
            const cart = {
                ...(state.cart as CartType),
            };
            if (cart?.cart_items) {
                const item = cart.cart_items.find(item => {
                    return item.id === (action.payload as CartItem).id;
                });
                if (item) {
                    item.quantity += (action.payload as CartItem).quantity;
                } else {
                    cart.cart_items.push(action.payload as CartItem);
                }
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            state.cart = cart;
        });
        builder.addCase(addProductToCart.rejected, (state, action) => {
            state.cart = action.payload as ResponseError;
        });
        builder.addCase(removeFromCart.fulfilled, (state, action) => {
            (state.cart as CartType).cart_items = (state.cart as CartType)?.cart_items.filter(
                item => item.id !== action.payload,
            );
            localStorage.setItem('cart', JSON.stringify(state.cart));
        });
        builder.addCase(removeFromCart.rejected, (state, action) => {
            console.log('removal rejected');
        });
    },
});

export const addProductToCart = createAsyncThunk(
    'cart/addProductToCart',
    async (
        { cart_id, product, quantity }: { cart_id: number; product: ProductType; quantity: number },
        thunkAPI,
    ) => {
        try {
            await ApiService.post(
                `${import.meta.env.VITE_API_URL}${endpoint}/${cart_id}/products`,
                {
                    product_id: product.id,
                    quantity,
                },
            );
            const newCartItem: CartItem = {
                ...product,
                quantity,
                image_url: product.images ? (product.images[0].imageUrl as string) : '',
            };
            return newCartItem;
        } catch (error) {
            console.log(error);
        }
    },
);
export const removeFromCart = createAsyncThunk(
    'cart/removeItemFromCart',
    async ({ product_id, cart }: { product_id: number; cart: CartType }, thunkAPI) => {
        try {
            await axios.delete(
                `${import.meta.env.VITE_API_URL}${endpoint}/${cart.id}/products/${product_id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                },
            );
            return product_id;
        } catch (error) {
            console.log(error as AxiosError);
        }
    },
);

export const { toggleCart, fetchCartFromStorage } = cartSlice.actions;
export default cartSlice.reducer;
