import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import userService from '../services/userService';
import './AuthStyles.css'; 

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '', address: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // נקה שגיאה בעת שינוי
  };

  const validate = () => {
    const newErrors = {};
    if (!form.username) newErrors.username = 'שם משתמש חובה';
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.email)) {
      newErrors.email = 'אימייל לא תקין (דוגמה: user@example.com)';
    }
    
    // ולידציית סיסמה מפורטת (6-12 תווים, אות גדולה, קטנה, מספר ותו מיוחד)
    if (form.password.length < 6 || form.password.length > 12) {
      newErrors.password = 'אורך סיסמה חייב להיות בין 6 ל-12 תווים';
    } else if (!/[A-Z]/.test(form.password)) {
      newErrors.password = 'חובה אות גדולה אחת לפחות (A-Z)';
    } else if (!/[a-z]/.test(form.password)) {
      newErrors.password = 'חובה אות קטנה אחת לפחות (a-z)';
    } else if (!/[0-9]/.test(form.password)) {
      newErrors.password = 'חובה מספר אחד לפחות (0-9)';
    } else if (!/[^A-Za-z0-9]/.test(form.password)) {
      newErrors.password = 'חובה תו מיוחד אחד לפחות (כמו !@#$)';
    }
    
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'הסיסמאות אינן תואמות';
    }
    
    return newErrors;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      enqueueSnackbar('⚠️ אנא תקני את השגיאות ונסי שוב', { variant: 'warning' });
      return;
    }

    try {
      const data = await userService.register({
        username: form.username,
        email: form.email,
        password: form.password,
        address: form.address
      });
      localStorage.setItem('token', data.token);
      enqueueSnackbar('🎉 נרשמת בהצלחה! ברוכה הבאה למשפחת המתכונים! 🌟', { variant: 'success' });
      setTimeout(() => navigate('/'), 1400);
    } catch (err) {
      let msg = '❌ שגיאה בהרשמה. נסי שוב מאוחר יותר.';
      if (err?.response?.status === 409) {
        msg = '⚠️ משתמש עם אימייל זה כבר קיים.';
      } else if (err?.response?.status === 400) {
        msg = `⚠️ ${err.response.data.message || 'נתונים לא תקינים'}`;
      }
      enqueueSnackbar(msg, { variant: 'error' });

      // הצגת שגיאות ספציפיות מהשרת תחת השדות המתאימים
      if (err?.response?.data?.field === 'password') {
        setErrors(prev => ({ ...prev, password: err.response.data.message }));
      } else if (err?.response?.data?.field === 'email') {
        setErrors(prev => ({ ...prev, email: err.response.data.message }));
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>הרשמה</h1>
          <p>הצטרפי למשפחת המתכונים! 🍳</p>
        </div>
        <div className="auth-form">
          <form onSubmit={handleRegister}>
            <div className="input-group">
              <input type="text" name="username" placeholder="שם משתמש" value={form.username} onChange={handleChange} className="auth-input" />
              {errors.username && <p className="error-text shake">{errors.username}</p>}
            </div>
            <div className="input-group">
              <input type="email" name="email" placeholder="אימייל" value={form.email} onChange={handleChange} className="auth-input" />
              {errors.email && <p className="error-text shake">{errors.email}</p>}
            </div>
            <div className="input-group">
              <input type="password" name="password" placeholder="סיסמה" value={form.password} onChange={handleChange} className="auth-input" />
              <p className="password-rules">6-12 תווים, אות גדולה, קטנה, מספר ותו מיוחד.</p>
              {errors.password && <p className="error-text shake">{errors.password}</p>}
            </div>
            <div className="input-group">
              <input type="password" name="confirmPassword" placeholder="אימות סיסמה" value={form.confirmPassword} onChange={handleChange} className="auth-input" />
              {errors.confirmPassword && <p className="error-text shake">{errors.confirmPassword}</p>}
            </div>
            <div className="input-group">
              <input type="text" name="address" placeholder="כתובת (אופציונלי)" value={form.address} onChange={handleChange} className="auth-input" />
            </div>
            <button type="submit" className="auth-button">הרשמי</button>
          </form>
          <div className="auth-link">
            <p>כבר רשומה? <span onClick={() => navigate('/login')} style={{cursor: 'pointer', color: '#ff9b8c'}}>התחברי כאן</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;