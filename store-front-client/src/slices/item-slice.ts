import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import client from '../services/ApiService';
import { ProductType } from '../types/Product';
import { ResponseError } from '../types/ResponseError';

const endpoint = '/products';

interface ItemsState {
    value: ProductType[] | ResponseError;
    currentItem: ProductType | {};
    search: string;
}

const initialState: ItemsState = {
    value: [],
    currentItem: {},
    search: '',
};

const itemSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {
        searched(state, action: PayloadAction<string>) {
            state.search = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(getItem.rejected, (state, action) => {
            state.currentItem = action.payload as ResponseError;
        });
        builder.addCase(getItem.fulfilled, (state, action) => {
            state.currentItem = action.payload as ProductType;
        });
        builder.addCase(getItems.fulfilled, (state, action) => {
            state.value = action.payload as ProductType[];
        });
        builder.addCase(getItems.rejected, (state, action) => {
            state.value = action.payload as ResponseError;
        });
        builder.addCase(filterItemsByCategory.fulfilled, (state, action) => {
            state.value = action.payload as ProductType[];
        });
        builder.addCase(filterItemsByCategory.rejected, (state, action) => {
            state.value = action.payload as ResponseError;
        });
    },
});

export const getItem = createAsyncThunk('getItems/getItem', async (id: number, thunkAPI) => {
    try {
        const { data } = await client.get(import.meta.env.VITE_API_URL + endpoint + `/${id}`);

        return data;
    } catch (error) {
        console.log(error);
    }
});

export const getItems = createAsyncThunk('item/getItems', async (_, thunkAPI) => {
    try {
        const { data } = await client.get(import.meta.env.VITE_API_URL + endpoint);
        return data;
    } catch (error) {
        console.log(error);
    }
});

export const filterItemsByCategory = createAsyncThunk(
    'item/filterItemsByCategory',
    async (categoryId: number, thunkAPI) => {
        try {
            const { data } = await client.get(
                import.meta.env.VITE_API_URL + `/services/products_by_category/${categoryId}`,
            );
            return data;
        } catch (error) {
            console.log((error as Error).message);
        }
    },
);

export const { searched } = itemSlice.actions;
export default itemSlice.reducer;
