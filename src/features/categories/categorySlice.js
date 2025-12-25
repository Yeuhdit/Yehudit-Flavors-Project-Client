//src/features/categories/categorySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getAllCategories = createAsyncThunk(
  'categories/getAll',
  async () => {
    return [
      { _id: '1', description: 'חלבי' },
      { _id: '2', description: 'בשרי' }
    ]
  }
)

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    allCategories: []
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      state.allCategories = action.payload
    })
  }
})

export default categorySlice.reducer
