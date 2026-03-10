// src/features/common/store.js
import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../categories/categorySlice";
import recipeReducer from "../recipes/recipeSlice";
import levelReducer from "../levels/levelSlice"; // הוספנו את הייבוא הזה!

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    recipes: recipeReducer,
    levels: levelReducer, // הוספנו את זה לכאן!
  },
});