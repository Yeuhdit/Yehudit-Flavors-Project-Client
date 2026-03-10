// src/features/common/axiosConfig.js
import axios from "axios";

// הוספתי /api כדי שזה יתאים להגדרות השרת שלך
const instance = axios.create({ baseURL: 'http://localhost:5000/api' });

instance.interceptors.request.use((value) => {
    // התיקון הקריטי: חיפוש של 'token' (איך ששמרת אותו ב-Login) ולא 'myToken'
    const token = localStorage.getItem('token'); 
    if (token) {
        value.headers.Authorization = `Bearer ${token}`;
    }
    return value;
});

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            const status = error.response.status;
            const message = error.response.data?.message || 'An unexpected error occurred.';
            
            // הורדתי פה את ה-alert המציק שיקפוץ על כל שגיאה, הטיפול יתבצע בקומפוננטה
            console.error(`Error ${status}: ${message}`); 
            
            if (status === 401) {
                console.log('Unauthorized request, redirecting to login...');
                // אפשר להוסיף פה התנתקות אוטומטית אם רוצים
            }
        }
        return Promise.reject(error);
    }
);

export default instance;