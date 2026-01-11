// src/services/userService.js
import axios from 'axios';
const API_URL = 'http://localhost:5000/api/users'; // שנו את ה-URL בהתאם לשרת שלכם
class userService {

    register = async (userData) => {
        console.log('Registering user with data:', userData);
        const response = await axios.post(`${API_URL}/signup`, userData);
        console.log('Register response:', response);
        return response.data;
    };

    login = async (userData) => {
        const response = await axios.post(`${API_URL}/signin`, userData);
        return response.data;
    };

    getUsers = async () => {
        const response = await axios.get(API_URL);
        return response.data;
    };
}
export default new userService();