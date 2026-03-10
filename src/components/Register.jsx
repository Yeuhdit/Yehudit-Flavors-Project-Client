// src/components/Register.jsx
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

  // משתנים להודעות על המסך
  const [serverError, setServerError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setServerError('');
  };

  const validate = () => {
    const newErrors = {};
    if (!form.username) newErrors.username = "שם משתמש חובה";
    
    if (!form.email) {
      newErrors.email = "אימייל חובה";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.email)) {
      newErrors.email = "אימייל לא תקין";
    }
    
    if (!form.password) {
      newErrors.password = "סיסמה חובה";
    } else if (form.password.length < 6) {
      newErrors.password = "חובה לפחות 6 תווים";
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "הסיסמאות אינן תואמות";
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
      setServerError('יש לתקן את השגיאות בטופס');
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

      setSuccessMsg("🎉 נרשמת בהצלחה! מעביר לדף הבית...");
      setTimeout(() => navigate("/"), 1200);
    } catch (err) {
      if (err?.response?.status === 409) {
        setErrors({ email: "האימייל הזה כבר קיים במערכת" });
        setServerError("האימייל הזה כבר קיים במערכת, נסי להתחבר");
      } else {
        setServerError("❌ שגיאה בהרשמה");
      }
    } finally {
      setLoading(false);
    }
  };

  const errorStyle = { color: '#d32f2f', fontSize: '13px', marginTop: '4px', fontWeight: 'bold' };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>הרשמה</h1>
        </div>

        {/* תצוגת הודעות שרת / הצלחה ישר בתוך המסך */}
        {serverError && <div style={{ backgroundColor: '#ffebee', color: '#c62828', padding: '10px', borderRadius: '5px', marginBottom: '15px', textAlign: 'center', fontWeight: 'bold' }}>{serverError}</div>}
        {successMsg && <div style={{ backgroundColor: '#e8f5e9', color: '#2e7d32', padding: '10px', borderRadius: '5px', marginBottom: '15px', textAlign: 'center', fontWeight: 'bold' }}>{successMsg}</div>}

        <form onSubmit={handleRegister}>
          <div className="input-group">
            <input type="text" name="username" placeholder="שם משתמש" value={form.username} onChange={handleChange} className="auth-input" style={errors.username ? { borderColor: 'red' } : {}} />
            {errors.username && <div style={errorStyle}>{errors.username}</div>}
          </div>
          <div className="input-group">
            <input type="email" name="email" placeholder="אימייל" value={form.email} onChange={handleChange} className="auth-input" style={errors.email ? { borderColor: 'red' } : {}} />
            {errors.email && <div style={errorStyle}>{errors.email}</div>}
          </div>
          <div className="input-group">
            <input type="password" name="password" placeholder="סיסמה (לפחות 6 תווים)" value={form.password} onChange={handleChange} className="auth-input" style={errors.password ? { borderColor: 'red' } : {}} />
            {errors.password && <div style={errorStyle}>{errors.password}</div>}
          </div>
          <div className="input-group">
            <input type="password" name="confirmPassword" placeholder="אימות סיסמה" value={form.confirmPassword} onChange={handleChange} className="auth-input" style={errors.confirmPassword ? { borderColor: 'red' } : {}} />
            {errors.confirmPassword && <div style={errorStyle}>{errors.confirmPassword}</div>}
          </div>
          <div className="input-group">
            <input type="text" name="address" placeholder="כתובת (אופציונלי)" value={form.address} onChange={handleChange} className="auth-input" />
          </div>
          
          <button type="submit" className="auth-button" disabled={loading}>{loading ? "נרשם..." : "הרשמי"}</button>
        </form>
        <div className="auth-link">
          <p>כבר רשומה? <span onClick={() => navigate("/login")} style={{ cursor: "pointer", color: "#ff9b8c", fontWeight: "bold" }}>התחברי כאן</span></p>
        </div>
      </div>
    </div>
  );
};

export default Register;