// src/features/levels/levelSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { levelService } from '../../services/levelService';

// ===== THUNKS =====

export const getAllLevels = createAsyncThunk(
  'levels/getAll',
  async (_, { rejectWithValue }) => {
    try {
      return await levelService.getAllLevels();
    } catch (err) {
      return rejectWithValue(err.response?.data || 'שגיאה בטעינת רמות');
    }
  }
);

export const addLevel = createAsyncThunk(
  'levels/add',
  async (levelData, { rejectWithValue }) => {
    try {
      return await levelService.addLevel(levelData);
    } catch (err) {
      return rejectWithValue(err.response?.data || 'שגיאה בהוספת רמה');
    }
  }
);

export const updateLevel = createAsyncThunk(
  'levels/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await levelService.updateLevel(id, data);
    } catch (err) {
      return rejectWithValue(err.response?.data || 'שגיאה בעדכון רמה');
    }
  }
);

export const deleteLevel = createAsyncThunk(
  'levels/delete',
  async (id, { rejectWithValue }) => {
    try {
      await levelService.deleteLevel(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'שגיאה במחיקת רמה');
    }
  }
);

// ===== SLICE =====

const levelSlice = createSlice({
  name: 'levels',
  initialState: {
    allLevels: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearError: (state) => { state.error = null; },
    clearSuccess: (state) => { state.success = false; },
  },
  extraReducers: (builder) => {
    builder
      // Get All
      .addCase(getAllLevels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllLevels.fulfilled, (state, action) => {
        state.loading = false;
        state.allLevels = action.payload;
      })
      .addCase(getAllLevels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add
      .addCase(addLevel.fulfilled, (state, action) => {
        state.allLevels.push(action.payload);
        state.success = true;
      })
      // Update
      .addCase(updateLevel.fulfilled, (state, action) => {
        const index = state.allLevels.findIndex(l => l._id === action.payload._id);
        if (index !== -1) state.allLevels[index] = action.payload;
        state.success = true;
      })
      // Delete
      .addCase(deleteLevel.fulfilled, (state, action) => {
        state.allLevels = state.allLevels.filter(l => l._id !== action.payload);
        state.success = true;
      });
  },
});

export const { clearError, clearSuccess } = levelSlice.actions;
export default levelSlice.reducer;