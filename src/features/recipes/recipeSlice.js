//src/features/recipes/recipeSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getAllRecipes = createAsyncThunk(
  'recipes/getAll',
  async () => {
    return [
      { _id: 'r1', name: 'פסטה שמנת' },
      { _id: 'r2', name: 'עוף בתנור' }
    ]
  }
)

const recipeSlice = createSlice({
  name: 'recipes',
  initialState: {
    allRecipes: [],
    status: null
  },
  extraReducers: (builder) => {
    builder.addCase(getAllRecipes.fulfilled, (state, action) => {
      state.allRecipes = action.payload
      state.status = 'fulfilled'
    })
  }
})

export default recipeSlice.reducer

  