import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// ===== THUNKS =====

export const getAllRecipes = createAsyncThunk(
  'recipes/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/recipes/getallrecipes');
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'שגיאה בטעינת מתכונים');
    }
  }
);

export const addRecipe = createAsyncThunk(
  'recipes/add',
  async (recipeData, { rejectWithValue }) => {
    try {
      const res = await api.post('/recipes', recipeData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'שגיאה בהוספת מתכון');
    }
  }
);

export const deleteRecipe = createAsyncThunk(
  'recipes/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/recipes/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'שגיאה במחיקת מתכון');
    }
  }
);

// ===== SLICE =====

const recipeSlice = createSlice({
  name: 'recipes',
  initialState: {
    recipes: [],
    loading: false,
    error: null,
  },
  reducers: {
    // הוספתי את ה-reducers שייצאת מקודם כדי שלא תהיה שגיאה
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // ===== GET ALL RECIPES =====
    builder
      .addCase(getAllRecipes.pending, (state) => { 
        state.loading = true; 
        state.error = null;
      })
      .addCase(getAllRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload;
      })
      .addCase(getAllRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Error';
      })
      // הוספת מתכון
      .addCase(addRecipe.fulfilled, (state, action) => {
        state.recipes.push(action.payload);
      })
      // מחיקת מתכון
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        state.recipes = state.recipes.filter(r => r._id !== action.payload);
      });
  },
});

export const { clearError } = recipeSlice.actions;
export default recipeSlice.reducer;