import api from './api'; // משתמשים באינסטנס החכם שהגדרת קודם!

class UserService {
  register = async (userData) => {
    console.log('Registering user with data:', userData);
    const response = await api.post('/users/signup', userData);
    
    // אם השרת החזיר טוקן, נשמור אותו ואת פרטי המשתמש בדפדפן
    if (response.data && response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    console.log('Register response:', response.data);
    return response.data;
  };

  login = async (userData) => {
    const response = await api.post('/users/signin', userData);
    
    // שמירת הטוקן לאחר התחברות מוצלחת
    if (response.data && response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  };

  getUsers = async () => {
    // נתיב יחסי כי ה-baseURL כבר מוגדר ב-api.js
    const response = await api.get('/users/getAllUsers'); 
    return response.data;
  };

  // פונקציית בונוס קטנה להתנתקות מהמערכת
  logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };
}

export default new UserService();