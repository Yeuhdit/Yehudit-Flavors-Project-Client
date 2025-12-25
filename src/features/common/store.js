//src/features/common/store.js
import { configureStore } from '@reduxjs/toolkit'
import categoriesReducer from '../categories/categorySlice'

export const store = configureStore({
  reducer: {
    categories: categoriesReducer
  }
})