//src/features/common/store.js
import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../categories/categorySlice";
import recipeReducer from "../recipes/recipeSlice";

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    recipes: recipeReducer,
  },
});