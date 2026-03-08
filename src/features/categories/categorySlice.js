//src/features/categories/categorySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { categoryService } from '../../services/categoryService';

export const getAllCategories = createAsyncThunk(
  'categories/getAll',
  async (_, { rejectWithValue }) => {
    try {
      return await categoryService.getAllCategories();
    } catch (err) {
      return rejectWithValue(err.response?.data || 'שגיאה בקבלת קטגוריות');
    }
  }
);

export const addCategory = createAsyncThunk(
  'categories/add',
  async (categoryData, { rejectWithValue }) => {
    try {
      return await categoryService.addCategory(categoryData);
    } catch (err) {
      return rejectWithValue(err.response?.data || 'שגיאה בהוספת קטגוריה');
    }
  }
);

export const updateCategory = createAsyncThunk(
  'categories/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await categoryService.updateCategory(id, data);
    } catch (err) {
      return rejectWithValue(err.response?.data || 'שגיאה בעדכון קטגוריה');
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'categories/delete',
  async (id, { rejectWithValue }) => {
    try {
      await categoryService.deleteCategory(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'שגיאה במחיקת קטגוריה');
    }
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    allCategories: [],
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
      // Get All Categories
      .addCase(getAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.allCategories = action.payload;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'שגיאה בקבלת קטגוריות';
      })
      // Add Category
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.allCategories.push(action.payload);
        state.success = true;
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'שגיאה בהוספת קטגוריה';
      })
      // Update Category
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.allCategories.findIndex(c => c._id === action.payload._id);
        if (index !== -1) {
          state.allCategories[index] = action.payload;
        }
        state.success = true;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'שגיאה בעדכון קטגוריה';
      })
      // Delete Category
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.allCategories = state.allCategories.filter(c => c._id !== action.payload);
        state.success = true;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'שגיאה במחיקת קטגוריה';
      });
  },
});

export const { clearError, clearSuccess } = categorySlice.actions;
export default categorySlice.reducer;
