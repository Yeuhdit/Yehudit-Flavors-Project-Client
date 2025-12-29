//src/features/categories/categorySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getAllCategories = createAsyncThunk(
  'categories/getAll',
  async () => {
    // כאן בעתיד נחליף ב-fetch אמיתי
    return [
      { _id: '1', description: 'חלבי' },
      { _id: '2', description: 'בשרי' },
      { _id: '3', description: 'פרווה' } 
    ];
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    allCategories: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.allCategories = action.payload;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;