import { configureStore } from '@reduxjs/toolkit';
import recipeReducer from '../features/recipes/recipeSlice';
import levelReducer from '../features/levels/levelSlice';

export const store = configureStore({
  reducer: {
    recipes: recipeReducer,
    levels: levelReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;