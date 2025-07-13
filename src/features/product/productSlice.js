import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Import local JSON directly
import productsData from '../../data/products.json';



export const fetchProducts = createAsyncThunk(
  'products/fetchLocal',
  async () => {
    // Simulating async fetch with Promise
    return new Promise((resolve) => {
      setTimeout(() => resolve(productsData), 500); // simulate delay
    });
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState: {
    items: [],
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default productSlice.reducer;
