import api from './api';

export const levelService = {
  // קבלת כל הרמות (עודכן לנתיב שיותר סביר שקיים בשרת שלך)
  getAllLevels: async () => {
    try {
      // הנחתי שהראוט נקרא getalllevels בדומה למתכונים. 
      // אם זה פשוט '/' בראוטר של השרת, תשנה חזרה ל- '/levels' ותבדוק את השרת
      const response = await api.get('/levels/getalllevels'); 
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // קבלת רמה בודדת
  getLevelById: async (id) => {
    try {
      const response = await api.get(`/levels/getLevelByCode/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // הוספת רמה (רק admin)
  addLevel: async (levelData) => {
    try {
      const response = await api.post('/levels/addLevel', levelData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // עדכון רמה (רק admin)
  updateLevel: async (id, levelData) => {
    try {
      const response = await api.put(`/levels/updateLevel/${id}`, levelData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // מחיקת רמה (רק admin)
  deleteLevel: async (id) => {
    try {
      const response = await api.delete(`/levels/deleteLevel/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};