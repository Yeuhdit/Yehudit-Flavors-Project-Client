// src/services/categoryService.js
import api from './api';

export const categoryService = {
  // קבלת כל הקטגוריות
  getAllCategories: async () => {
    try {
      const response = await api.get('/categories/getallcategories');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // קבלת קטגוריות עם מתכונים
  getAllCategoriesWithRecipes: async () => {
    try {
      const response = await api.get('/categories/getAllCategoriesAndRecipe');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // קבלת קטגוריה בודדת עם מתכוניה
  getCategoryById: async (id) => {
    try {
      const response = await api.get(`/categories/getCategoryByIdWithRec/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // הוספת קטגוריה (רק admin)
  addCategory: async (categoryData) => {
    try {
      const response = await api.post('/categories', categoryData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // עדכון קטגוריה (רק admin)
  updateCategory: async (id, categoryData) => {
    try {
      const response = await api.put(`/categories/${id}`, categoryData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // מחיקת קטגוריה (רק admin)
  deleteCategory: async (id) => {
    try {
      const response = await api.delete(`/categories/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
