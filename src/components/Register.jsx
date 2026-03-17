// react-client/src/components/Register.jsx
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/userService";
import { AuthContext } from '../context/AuthContext';
import "./AuthStyles.css";

const Register = () => {
  const navigate = useNavigate();
  const { loginContext } = useContext(AuthContext);

  const [form, setForm] = useState({ username: "", email: "", password: "", confirmPassword: "", address: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [serverError, setServerError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setServerError('');
  };

  const validate = () => {
    const newErrors = {};
    if (!form.username) newErrors.username = "איך קוראים לך?";
    
    if (!form.email) {
      newErrors.email = "אימייל חובה";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.email)) {
      newErrors.email = "כתובת אימייל לא תקינה";
    }
    
    if (!form.password) {
      newErrors.password = "סיסמה חובה";
    } else if (form.password.length < 6) {
      newErrors.password = "הסיסמה חייבת להכיל לפחות 6 תווים";
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "הסיסמאות לא תואמות";
    }
    
    return newErrors;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setServerError('');
    setSuccessMsg('');

    const validationErrors = validate();
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length > 0) {
      setServerError('נא לתקן את השגיאות בטופס');
      return;
    }

    try {
      setLoading(true);
      const data = await userService.register({
        username: form.username.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
        address: form.address.trim(),
      });

      if (data?.user) {
        loginContext(data.user);
      }

      setSuccessMsg("איזה כיף שהצטרפת! מעביר אותך פנימה...");
      setTimeout(() => navigate("/"), 1200);
    } catch (err) {
      if (err?.response?.status === 409) {
        setErrors({ email: "האימייל הזה כבר רשום" });
        setServerError("האימייל הזה כבר רשום במערכת, נסי להתחבר.");
      } else {
        setServerError("אירעה שגיאה בהרשמה. נסי שוב מאוחר יותר.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-card">
          
          <div className="auth-header">
            <h1 className="auth-title">יצירת <span className="auth-highlight">חשבון.</span></h1>
            <p className="auth-subtitle">הצטרפי לקהילת הטעמים שלנו</p>
          </div>

          {serverError && <div className="auth-alert error">{serverError}</div>}
          {successMsg && <div className="auth-alert success">{successMsg}</div>}

          <form onSubmit={handleRegister} noValidate>
            
            <div className="input-group">
              <input 
                type="text" 
                name="username" 
                placeholder="שם משתמש *" 
                value={form.username} 
                onChange={handleChange} 
                className={`auth-input ${errors.username ? 'has-error' : ''}`} 
              />
              {errors.username && <span className="error-text">{errors.username}</span>}
            </div>

            <div className="input-group">
              <input 
                type="email" 
                name="email" 
                placeholder="כתובת אימייל *" 
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
                placeholder="סיסמה (לפחות 6 תווים) *" 
                value={form.password} 
                onChange={handleChange} 
                className={`auth-input ${errors.password ? 'has-error' : ''}`} 
              />
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <div className="input-group">
              <input 
                type="password" 
                name="confirmPassword" 
                placeholder="אימות סיסמה *" 
                value={form.confirmPassword} 
                onChange={handleChange} 
                className={`auth-input ${errors.confirmPassword ? 'has-error' : ''}`} 
              />
              {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
            </div>

            <div className="input-group">
              <input 
                type="text" 
                name="address" 
                placeholder="כתובת (אופציונלי)" 
                value={form.address} 
                onChange={handleChange} 
                className="auth-input" 
              />
            </div>
            
            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? "יוצר חשבון..." : "הצטרפות עכשיו"}
            </button>

          </form>

          <div className="auth-footer-link">
            כבר רשומה? <span onClick={() => navigate("/login")}>התחברי כאן</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Register;