// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import recipeReducer from '../features/recipes/recipeSlice';
import levelReducer from '../features/levels/levelSlice';
import categoryReducer from '../features/categories/categorySlice';

export const store = configureStore({
  reducer: {
    recipes: recipeReducer,
    levels: levelReducer,
    categories: categoryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;