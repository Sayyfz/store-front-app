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
    },
});

// WHEN WE DISPATCH getItems IN THE COMPONENT, THE ITEMSLICE GETS NOTIFIED AND EXECUTES THE EXTRA REDUCER BECAUSE IT IS LISTENING TO IT
// extra reducer builder then dispatches pending and then dispatches either fulfilled or rejected with the response as the payload
export const getItems = createAsyncThunk('item/getItems', async (_, thunkAPI) => {
    try {
        const { data } = await client.get(import.meta.env.VITE_API_URL + endpoint);
        return data;
    } catch (error) {
        console.log(error);
    }
});

export const {} = itemSlice.actions;
export default itemSlice.reducer;
