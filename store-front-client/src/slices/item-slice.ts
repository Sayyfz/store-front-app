import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import client from '../services/ApiService';
import { ProductType } from '../types/Product';
import { ResponseError } from '../types/ResponseError';

const endpoint = '/products';

interface ItemsState {
    value: ProductType[] | ResponseError;
}

const initialState: ItemsState = {
    value: [],
};

const itemSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getItems.pending, (state, action) => {
            console.log('pending');
        });
        builder.addCase(getItems.fulfilled, (state, action) => {
            state.value = action.payload as ProductType[];
        });
        builder.addCase(getItems.rejected, (state, action) => {
            state.value = action.payload as ResponseError;
        });
        builder.addCase(filterItems.fulfilled, (state, action) => {
            console.log('fulfilled');
            state.value = action.payload as ProductType[];
        });
        builder.addCase(filterItems.rejected, (state, action) => {
            state.value = action.payload as ResponseError;
        });
    },
});

export const getItems = createAsyncThunk('item/getItems', async (_, thunkAPI) => {
    try {
        const { data } = await client.get(import.meta.env.VITE_API_URL + endpoint);
        return data;
    } catch (error) {
        console.log(error);
    }
});

export const filterItems = createAsyncThunk('item/filterItems', async (query: string, thunkAPI) => {
    try {
        const { data } = await client.get(
            import.meta.env.VITE_API_URL + `/services/products_search?name=${query}`,
        );
        return data;
    } catch (error) {
        console.log((error as Error).message);
    }
});

// const result = (state.value as ProductType[]).filter(product => {
//     return product.name.includes(action.payload);
// });
// state.value = result;

export const {} = itemSlice.actions;
export default itemSlice.reducer;
