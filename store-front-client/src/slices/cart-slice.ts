import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, CartType } from '../types/Cart';
import { ResponseError } from '../types/ResponseError';
import ApiService from '../services/ApiService';
import { ProductType } from '../types/Product';

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
            try {
                state.cart = JSON.parse(localStorage.getItem('cart') as string) as CartType;
            } catch (error) {
                console.log((error as Error).message);
            }
        },

        removeFromCart(state, action: PayloadAction<number>) {
            (state.cart as CartType)?.cart_items.filter(item => item.id !== action.payload);
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
    },
});

export const addProductToCart = createAsyncThunk(
    'cart/addProductToCart',
    async (
        { cart_id, product, quantity }: { cart_id: number; product: ProductType; quantity: number },
        thunkAPI,
    ) => {
        // @ts-ignore
        console.log(product.images[0].imageUrl);
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

export const { toggleCart, fetchCartFromStorage, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
