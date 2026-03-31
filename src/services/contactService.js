// react-client/src/services/contactService.js

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5005/api';

const contactService = {
  sendMessage: async (formData) => {
    try {
      console.log('📤 שולח לכתובת:', `${API_BASE_URL}/contact`);
      console.log('📝 Data:', formData);
      
      const response = await axios.post(`${API_BASE_URL}/contact`, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('✅ תגובה:', response.data);
      return response.data;
      
    } catch (error) {
      console.error('❌ שגיאה בשליחת הודעה:', error);
      throw error;
    }
  }
};

export default contactService;