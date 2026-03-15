// src/services/levelService.js
import api from './api';

export const levelService = {
  // קבלת כל הרמות
  getAllLevels: async () => {
    try {
      // אם ב-api.js ה-baseURL הוא http://localhost:5000/api
      // אז כאן צריך רק 'levels' (בלי לוכסן בהתחלה לפעמים זה פותר בעיות)
      const response = await api.get('/levels'); 
      return response.data;
    } catch (error) {
      console.error("שגיאה במשיכת רמות:", error);
      throw error;
    }
  },

  // הוספת רמה
  addLevel: async (levelData) => {
    const response = await api.post('/levels', levelData);
    return response.data;
  },

  // עדכון רמה
  updateLevel: async (id, levelData) => {
    const response = await api.put(`/levels/${id}`, levelData);
    return response.data;
  },

  // מחיקת רמה
  deleteLevel: async (id) => {
    const response = await api.delete(`/levels/${id}`);
    return response.data;
  }
};