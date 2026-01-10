// // src/services/api.js

// import axios from 'axios';

// const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// export const authAPI = {
//   signup: (data) => API.post('/users/signup', data),
// };
// // 
// src/services/api.js
// const API_URL = 'http://localhost:5000/api';

// export const signup = async (userData) => {
//   const response = await fetch(`${API_URL}/users/signup`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(userData),
//   });
//   return response.json();
// };

// export const login = async (credentials) => {
//   const response = await fetch(`${API_URL}/users/signin`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(credentials),
//   });
//   return response.json();
// };

// export const addRecipe = async (recipeData, token) => {
//   const formData = new FormData();
//   Object.keys(recipeData).forEach(key => {
//     if (key === 'categories') {
//       formData.append(key, recipeData[key]);
//     } else {
//       formData.append(key, recipeData[key]);
//     }
//   });

//   const response = await fetch(`${API_URL}/recipes/addRecipe`, {
//     method: 'POST',
//     headers: {
//       'Authorization': `Bearer ${token}`,
//     },
//     body: formData,
//   });
//   return response.json();
// };

// export const getAllRecipes = async () => {
//   const response = await fetch(`${API_URL}/recipes/getallrecipes`);
//   return response.json();
// };
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor – מוסיף אוטומטית את הטוקן לכל בקשה
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;