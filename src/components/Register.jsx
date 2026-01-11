// src/components/Register.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../features/common/axiosConfig'; // ייבוא הגדרות Axios
import './AuthStyles.css';
import userService from '../services/userService';

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '', address: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const newErrors = {};
    if (!form.username) newErrors.username = 'חובה';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = 'אימייל לא תקין';
    if (form.password.length < 8) newErrors.password = '8 תווים לפחות';
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'לא תואמות';
    return newErrors;
  };

const handleRegister = async (e) => {
  console.log('handleRegister called');
  e.preventDefault();

  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    console.log('Validation errors:', validationErrors);
    console.log('Form data:', form);
    return;
  }

  try {
    console.log('Submitting form:', form);
    const data = await userService.register({
      username: form.username,
      email: form.email,
      password: form.password,
      address: form.address
    });
    console.log('Registration successful:', data);  
    localStorage.setItem('token', data.token);
    alert('נרשמת בהצלחה!');
    navigate('/');
  } catch (err) {
    console.error('Register error:', err);
  }
};

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>הרשמה</h1>
          <p>הצטרפי למשפחת המתכונים!</p>
        </div>
        <div className="auth-form">
          <form onSubmit={handleRegister}>
            <input type="text" name="username" placeholder="שם משתמש" onChange={handleChange} required className="auth-input" />
            <input type="email" name="email" placeholder="אימייל" onChange={handleChange} required className="auth-input" />
            <input type="password" name="password" placeholder="סיסמה" onChange={handleChange} required className="auth-input" />
            <input type="password" name="confirmPassword" placeholder="אימות סיסמה" onChange={handleChange} required className="auth-input" />
            <input type="text" name="address" placeholder="כתובת (אופציונלי)" onChange={handleChange} className="auth-input" />
            <button type="submit" className="auth-button">הרשמי</button>
          </form>
          <div className="auth-link">
            <p>כבר רשומה? <span onClick={() => navigate('/login')}>התחברי כאן</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;