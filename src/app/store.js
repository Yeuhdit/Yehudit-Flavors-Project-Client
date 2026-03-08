// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
<<<<<<< HEAD

// יבוא ה-reducers
=======
>>>>>>> 788db54255ac2a3c7387731bb39b9596bbad9ea6
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
