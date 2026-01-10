// //src/features/recipes/recipeSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// export const getAllRecipes = createAsyncThunk(
//   'recipes/getAll',
//   async () => {
//     // כאן בעתיד API אמיתי – בינתיים נשתמש ב-mock ב-Recipes
//     return [];
//   }
// );

// const recipeSlice = createSlice({
//   name: 'recipes',
//   initialState: {
//     allRecipes: [],
//     loading: false,
//     error: null,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(getAllRecipes.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(getAllRecipes.fulfilled, (state, action) => {
//         state.loading = false;
//         state.allRecipes = action.payload;
//       })
//       .addCase(getAllRecipes.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export default recipeSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const getAllRecipes = createAsyncThunk(
  'recipes/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/recipes');
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
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
      return rejectWithValue(err.response.data);
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
      return rejectWithValue(err.response.data);
    }
  }
);

const recipeSlice = createSlice({
  name: 'recipes',
  initialState: {
    recipes: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllRecipes.pending, (state) => { state.loading = true; })
      .addCase(getAllRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload;
      })
      .addCase(getAllRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Error';
      })
      // דומה ל-add ו-delete
  },
});

export default recipeSlice.reducer;
