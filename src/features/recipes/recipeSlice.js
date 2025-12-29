//src/features/recipes/recipeSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getAllRecipes = createAsyncThunk(
  'recipes/getAll',
  async () => {
    // כאן בעתיד API אמיתי – בינתיים נשתמש ב-mock ב-Recipes
    return [];
  }
);

const recipeSlice = createSlice({
  name: 'recipes',
  initialState: {
    allRecipes: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllRecipes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.allRecipes = action.payload;
      })
      .addCase(getAllRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default recipeSlice.reducer;