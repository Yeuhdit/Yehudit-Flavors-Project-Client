// src/features/recipes/recipeSlice.js
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
      console.error('❌ Error fetching recipes:', err);
      return rejectWithValue(err.response?.data || 'שגיאה בקבלת מתכונים');
    }
  }
);

export const addRecipe = createAsyncThunk(
  'recipes/add',
  async (recipeData, { rejectWithValue }) => {
    try {
      console.log('📤 Sending recipe data to backend');
      
      // ✅ אל תציין Content-Type! axios יעשה את זה אוטומטית
      const res = await api.post('/recipes/addRecipe', recipeData);
      
      console.log('✅ Recipe added successfully:', res.data);
      return res.data;
    } catch (err) {
      console.error('❌ Error adding recipe:', err);
      console.error('Response data:', err.response?.data);
      console.error('Status:', err.response?.status);
      console.error('URL:', err.config?.url);
      
      return rejectWithValue(
        err.response?.data?.message || 'שגיאה בהוספת מתכון'
      );
    }
  }
);

export const updateRecipe = createAsyncThunk(
  'recipes/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      console.log('📤 Updating recipe:', id);
      
      const res = await api.put(`/recipes/updateRecipes/${id}`, data);
      
      console.log('✅ Recipe updated:', res.data);
      return res.data;
    } catch (err) {
      console.error('❌ Error updating recipe:', err);
      return rejectWithValue(
        err.response?.data?.message || 'שגיאה בעדכון מתכון'
      );
    }
  }
);

export const deleteRecipe = createAsyncThunk(
  'recipes/delete',
  async (id, { rejectWithValue }) => {
    try {
      console.log('📤 Deleting recipe:', id);
      
      await api.delete(`/recipes/deleteRecipe/${id}`);
      
      console.log('✅ Recipe deleted:', id);
      return id;
    } catch (err) {
      console.error('❌ Error deleting recipe:', err);
      return rejectWithValue(
        err.response?.data?.message || 'שגיאה במחיקת מתכון'
      );
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
    success: false,
    successMessage: '',
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
      state.successMessage = '';
    },
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
        state.success = true;
        state.successMessage = 'מתכונים נטענו בהצלחה';
      })
      .addCase(getAllRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'שגיאה בקבלת מתכונים';
        state.success = false;
      });

    // ===== ADD RECIPE =====
    builder
      .addCase(addRecipe.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addRecipe.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes.push(action.payload);
        state.success = true;
        state.successMessage = 'המתכון הוסף בהצלחה!';
        state.error = null;
      })
      .addCase(addRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'שגיאה בהוספת מתכון';
        state.success = false;
      });

    // ===== UPDATE RECIPE =====
    builder
      .addCase(updateRecipe.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateRecipe.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.recipes.findIndex(
          (r) => r._id === action.payload._id
        );
        if (index !== -1) {
          state.recipes[index] = action.payload;
        }
        state.success = true;
        state.successMessage = 'המתכון עודכן בהצלחה!';
        state.error = null;
      })
      .addCase(updateRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'שגיאה בעדכון מתכון';
        state.success = false;
      });

    // ===== DELETE RECIPE =====
    builder
      .addCase(deleteRecipe.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = state.recipes.filter(
          (r) => r._id !== action.payload
        );
        state.success = true;
        state.successMessage = 'המתכון נמחק בהצלחה!';
        state.error = null;
      })
      .addCase(deleteRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'שגיאה במחיקת מתכון';
        state.success = false;
      });
  },
});

export const { clearError, clearSuccess } = recipeSlice.actions;
export default recipeSlice.reducer;