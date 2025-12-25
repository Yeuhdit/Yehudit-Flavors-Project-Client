//src/features/categories/categorySlice.js  
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getAllCategories = createAsyncThunk("category-getAll", async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/categories/getallcategories`);
  return await res.json();
});

const categorySlice = createSlice({
  name: 'categories',
  initialState: { allCategories: [], status: null },
  extraReducers: (builder) => {
    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      state.allCategories = action.payload;
      state.status = "fulfilled";
    });
  }
});

export default categorySlice.reducer;