// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';

// יבוא ה-reducers
import categoryReducer from '../features/categories/categorySlice';
import recipeReducer from '../features/recipes/recipeSlice';
import levelReducer from '../features/levels/levelSlice';

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    recipes: recipeReducer,
    levels: levelReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
