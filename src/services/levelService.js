import api from './api';

export const levelService = {
  // קבלת כל הרמות
  getAllLevels: async () => {
    try {
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