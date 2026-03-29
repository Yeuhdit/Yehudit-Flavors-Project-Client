// react-client/src/features/recipes/recipeSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

const extractError = (payload, defaultMsg) => {
    if (!payload) return defaultMsg;
    if (typeof payload === 'string') return payload;
    if (payload.error && payload.error.message) return payload.error.message;
    if (payload.message) return payload.message;
    return defaultMsg;
};

export const getAllRecipes = createAsyncThunk(
  'recipes/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/recipes/getallrecipes');
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'שגיאה בטעינת מתכונים');
    }
  });

export const addRecipe = createAsyncThunk(
  'recipes/add',
  async (recipeData, { rejectWithValue }) => {
    try {
      const res = await api.post('/recipes', recipeData, {
         headers: { 'Content-Type': 'multipart/form-data' }
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'שגיאה בהוספת מתכון');
    }
  });

export const updateRecipe = createAsyncThunk(
  'recipes/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/recipes/${id}`, data, {
         headers: { 'Content-Type': 'multipart/form-data' }
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'שגיאה בעדכון מתכון');
    }
  });

export const deleteRecipe = createAsyncThunk(
  'recipes/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/recipes/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'שגיאה במחיקת מתכון');
    }
  });

// 🔥 פעולת הלייק החדשה!
export const toggleLikeRecipe = createAsyncThunk(
  'recipes/toggleLike',
  async (id, { rejectWithValue }) => {
    try {
      // שולחים בקשת PUT לנתיב הלייק בשרת
      const res = await api.put(`/recipes/${id}/like`);
      // מחזירים את ה-ID של המתכון ואת מערך הלייקים המעודכן
      return { id, likes: res.data.likes };
    } catch (err) {
      return rejectWithValue(err.response?.data || 'שגיאה בביצוע לייק');
    }
  });

const recipeSlice = createSlice({
  name: 'recipes',
  initialState: { recipes: [], loading: false, error: null, success: false },
  reducers: {
    clearError: (state) => { state.error = null; },
    clearSuccess: (state) => { state.success = false; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllRecipes.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(getAllRecipes.fulfilled, (state, action) => { state.loading = false; state.recipes = action.payload; })
      .addCase(getAllRecipes.rejected, (state, action) => { state.loading = false; state.error = extractError(action.payload, 'שגיאה בטעינת מתכונים'); })
            
      .addCase(addRecipe.pending, (state) => { state.loading = true; state.error = null; state.success = false; })
      .addCase(addRecipe.fulfilled, (state, action) => { state.loading = false; state.recipes.push(action.payload); state.success = true; })
      .addCase(addRecipe.rejected, (state, action) => { state.loading = false; state.error = extractError(action.payload, 'שגיאה בהוספת מתכון'); })
            
      .addCase(updateRecipe.pending, (state) => { state.loading = true; state.error = null; state.success = false; })
      .addCase(updateRecipe.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.recipes.findIndex(r => r._id === action.payload._id);
        if(index !== -1) state.recipes[index] = action.payload;
        state.success = true;
      })
      .addCase(updateRecipe.rejected, (state, action) => { state.loading = false; state.error = extractError(action.payload, 'שגיאה בעדכון מתכון'); })
            
      .addCase(deleteRecipe.pending, (state) => { state.error = null; })
      .addCase(deleteRecipe.fulfilled, (state, action) => { state.recipes = state.recipes.filter(r => r._id !== action.payload); })
      .addCase(deleteRecipe.rejected, (state, action) => { state.error = extractError(action.payload, 'שגיאה במחיקת מתכון'); })

      // 🔥 מעדכן את מערך הלייקים בזיכרון כשהשרת מחזיר תשובה
      .addCase(toggleLikeRecipe.fulfilled, (state, action) => {
        const index = state.recipes.findIndex(r => r._id === action.payload.id);
        if(index !== -1) {
          state.recipes[index].likes = action.payload.likes;
        }
      });
  },
});

export const { clearError, clearSuccess } = recipeSlice.actions;
export default recipeSlice.reducer;