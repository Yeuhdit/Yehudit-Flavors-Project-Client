// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';

// יבוא ה-reducers שלך (תתאימי את הנתיבים בדיוק לפי המבנה שלך)
import categoryReducer from '../features/categories/categorySlice';
import recipeReducer from '../features/recipes/recipeSlice';  // אם הקובץ נקרא recipeSlice.js או recipesSlice.js – תשני בהתאם

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    recipes: recipeReducer,
    // אם יהיו לך בעתיד slices נוספים (משתמשים וכו') – תוסיפי כאן
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,  // מונע אזהרות מיותרות
    }),
});