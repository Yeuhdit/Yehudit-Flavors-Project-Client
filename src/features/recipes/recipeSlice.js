// src/features/recipes/recipeSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const getAllRecipes = createAsyncThunk(
  'recipes/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/recipes/getallrecipes');
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'שגיאה בקבלת מתכונים');
    }
  }
);

export const addRecipe = createAsyncThunk(
  'recipes/add',
  async (recipeData, { rejectWithValue }) => {
    try {
      const res = await api.post('/recipes/addRecipe', recipeData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'שגיאה בהוספת מתכון');
    }
  }
);

export const updateRecipe = createAsyncThunk(
  'recipes/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/recipes/updateRecipes/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'שגיאה בעדכון מתכון');
    }
  }
);

export const deleteRecipe = createAsyncThunk(
  'recipes/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/recipes/deleteRecipe/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'שגיאה במחיקת מתכון');
    }
  }
);

const recipeSlice = createSlice({
  name: 'recipes',
  initialState: {
    recipes: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All Recipes
      .addCase(getAllRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload;
        state.success = true;
      })
      .addCase(getAllRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'שגיאה בקבלת מתכונים';
      })
      // Add Recipe
      .addCase(addRecipe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addRecipe.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes.push(action.payload);
        state.success = true;
      })
      .addCase(addRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'שגיאה בהוספת מתכון';
      })
      // Update Recipe
      .addCase(updateRecipe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRecipe.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.recipes.findIndex(r => r._id === action.payload._id);
        if (index !== -1) {
          state.recipes[index] = action.payload;
        }
        state.success = true;
      })
      .addCase(updateRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'שגיאה בעדכון מתכון';
      })
      // Delete Recipe
      .addCase(deleteRecipe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = state.recipes.filter(r => r._id !== action.payload);
        state.success = true;
      })
      .addCase(deleteRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'שגיאה במחיקת מתכון';
      });
  },
});

export const { clearError, clearSuccess } = recipeSlice.actions;
export default recipeSlice.reducer;
