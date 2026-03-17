// react-client/src/components/Login.jsx
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../services/userService';
import { AuthContext } from '../context/AuthContext';
import './AuthStyles.css';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { loginContext } = useContext(AuthContext);

  const [serverError, setServerError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setServerError(''); 
  };

  const validate = () => {
    const newErrors = {};
    if (!form.email) newErrors.email = 'חובה למלא כתובת אימייל';
    else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.email)) newErrors.email = 'אימייל לא תקין';
    if (!form.password) newErrors.password = 'חובה למלא סיסמה';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    setSuccessMsg('');

    const validationErrors = validate();
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length > 0) {
      setServerError('יש לתקן את השדות המסומנים באדום');
      return;
    }

    try {
      setLoading(true);
      const data = await userService.login({ email: form.email.trim(), password: form.password });

      loginContext(data.user);

      setSuccessMsg('התחברת בהצלחה! מעביר אותך פנימה...');
      setTimeout(() => navigate('/'), 1200);
    } catch (err) {
      const msg = err?.response?.status === 401 ? 'אימייל או סיסמה שגויים' : 'אירעה שגיאה בהתחברות';
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-card">
          
          <div className="auth-header">
            <h1 className="auth-title">ברוכה <span className="auth-highlight">השבה.</span></h1>
            <p className="auth-subtitle">התחברי לחשבון שלך כדי להמשיך</p>
          </div>

          {serverError && <div className="auth-alert error">{serverError}</div>}
          {successMsg && <div className="auth-alert success">{successMsg}</div>}

          <form onSubmit={handleSubmit} noValidate>
            
            <div className="input-group">
              <input 
                type="email" 
                name="email" 
                placeholder="כתובת אימייל" 
                value={form.email} 
                onChange={handleChange} 
                className={`auth-input ${errors.email ? 'has-error' : ''}`} 
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="input-group">
              <input 
                type="password" 
                name="password" 
                placeholder="סיסמה" 
                value={form.password} 
                onChange={handleChange} 
                className={`auth-input ${errors.password ? 'has-error' : ''}`} 
              />
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? 'מתחבר...' : 'כניסה לחשבון'}
            </button>

          </form>

          <div className="auth-footer-link">
            אין לך חשבון עדיין? <span onClick={() => navigate('/register')}>יצירת חשבון חדש</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;