  // // src/components/Register.jsx
  // import { useState } from 'react';
  // import { useNavigate } from 'react-router-dom';
  // import { useSnackbar } from 'notistack';
  // import axios from '../features/common/axiosConfig'; // ייבוא הגדרות Axios
  // import './AuthStyles.css';
  // import userService from '../services/userService';

  // const Register = () => {
  //   const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '', address: '' });
  //   const [errors, setErrors] = useState({});
  //   const navigate = useNavigate();
  //   const { enqueueSnackbar } = useSnackbar();

  //   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  //   const validate = () => {
  //     const newErrors = {};
  //     if (!form.username) newErrors.username = 'חובה';
  //     if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = 'אימייל לא תקין';
  //     if (form.password.length < 8) newErrors.password = '8 תווים לפחות';
  //     if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'לא תואמות';
  //     return newErrors;
  //   };

  //   const handleRegister = async (e) => {
  //     console.log('handleRegister called');
  //     e.preventDefault();
  //     // גלילה לראש העמוד כדי שההודעות יהיו בולטות למשתמש
  //     try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (err) {}

  //     const validationErrors = validate();
  //     if (Object.keys(validationErrors).length > 0) {
  //       setErrors(validationErrors);
  //       console.log('Validation errors:', validationErrors);
  //       console.log('Form data:', form);
  //       // הודעת אזהרה קצרה למשתמש בלי להשתמש ב-alert
  //       enqueueSnackbar('אנא מלאי את השדות המסומנים ונסי שוב', { variant: 'warning', autoHideDuration: 3500 });
  //       return;
  //     }

  //     try {
  //       console.log('Submitting form:', form);
  //       const data = await userService.register({
  //         username: form.username,
  //         email: form.email,
  //         password: form.password,
  //         address: form.address
  //       });
  //       console.log('Registration successful:', data);
  //       localStorage.setItem('token', data.token);
  //       // הודעת הצלחה מעוצבת
  //       enqueueSnackbar('🎉 נרשמת בהצלחה! ברוכה הבאה!', { variant: 'success', autoHideDuration: 3000 });
  //       // המתנה קצרה כדי שהמשתמש יראה את ההודעה ואז ננווט
  //       setTimeout(() => {
  //         try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (err) {}
  //         navigate('/');
  //       }, 1400);
  //     } catch (err) {
  //       console.error('Register error:', err);
  //       // הודעות שגיאה ספציפיות לפי סוג הבעיה
  //       let msg = 'שגיאה בהרשמה';
  //       if (err?.response?.status === 409) {
  //         msg = '⚠️ משתמש זה כבר קיים במערכת';
  //       } else if (err?.response?.status === 400) {
  //         msg = err?.response?.data?.message || '⚠️ הנתונים שהוזנו אינם תקינים';
  //       } else if (err?.response?.data?.message) {
  //         msg = `❌ ${err.response.data.message}`;
  //       }
  //       enqueueSnackbar(msg, { variant: 'error', autoHideDuration: 5000 });
  //     }
  //   };

  //   return (
  //     <div className="auth-container">
  //       <div className="auth-card">
  //         <div className="auth-header">
  //           <h1>הרשמה</h1>
  //           <p>הצטרפי למשפחת המתכונים!</p>
  //         </div>
  //         <div className="auth-form">
  //           <form onSubmit={handleRegister}>
  //             <input type="text" name="username" placeholder="שם משתמש" onChange={handleChange} required className="auth-input" />
  //             <input type="email" name="email" placeholder="אימייל" onChange={handleChange} required className="auth-input" />
  //             <input type="password" name="password" placeholder="סיסמה" onChange={handleChange} required className="auth-input" />
  //             <input type="password" name="confirmPassword" placeholder="אימות סיסמה" onChange={handleChange} required className="auth-input" />
  //             <input type="text" name="address" placeholder="כתובת (אופציונלי)" onChange={handleChange} className="auth-input" />
  //             <button type="submit" className="auth-button">הרשמי</button>
  //           </form>
  //           <div className="auth-link">
  //             <p>כבר רשומה? <span onClick={() => navigate('/login')}>התחברי כאן</span></p>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  // export default Register;
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
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.email)) newErrors.email = 'אימייל לא תקין (דוגמה: user@example.com)';
    
    // ולידציית סיסמה מפורטת
    if (form.password.length < 6 || form.password.length > 12) newErrors.password = 'אורך סיסמה חייב להיות בין 6 ל-12 תווים';
    else if (!/[A-Z]/.test(form.password)) newErrors.password = 'חובה אות גדולה אחת לפחות (A-Z)';
    else if (!/[a-z]/.test(form.password)) newErrors.password = 'חובה אות קטנה אחת לפחות (a-z)';
    else if (!/[0-9]/.test(form.password)) newErrors.password = 'חובה מספר אחד לפחות (0-9)';
    else if (!/[^A-Za-z0-9]/.test(form.password)) newErrors.password = 'חובה תו מיוחד אחד לפחות (כמו !@#$%)';
    
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'הסיסמאות אינן תואמות';
    
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
      if (err?.response?.status === 409) msg = '⚠️ משתמש עם אימייל זה כבר קיים.';
      else if (err?.response?.status === 400) msg = `⚠️ ${err.response.data.message || 'נתונים לא תקינים'}`;
      enqueueSnackbar(msg, { variant: 'error' });
      // אם שגיאה ספציפית מהשרת (כמו סיסמה), הצג מתחת ל-input
      if (err?.response?.data?.field === 'password') {
        setErrors({ ...errors, password: err.response.data.message });
      } else if (err?.response?.data?.field === 'email') {
        setErrors({ ...errors, email: err.response.data.message });
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
              <input type="text" name="username" placeholder="שם משתמש" onChange={handleChange} className="auth-input" />
              {errors.username && <p className="error-text shake">{errors.username}</p>}
            </div>
            <div className="input-group">
              <input type="email" name="email" placeholder="אימייל" onChange={handleChange} className="auth-input" />
              {errors.email && <p className="error-text shake">{errors.email}</p>}
            </div>
            <div className="input-group">
              <input type="password" name="password" placeholder="סיסמה" onChange={handleChange} className="auth-input" />
              <p className="password-rules">כללי סיסמה: 6-12 תווים, אות גדולה, קטנה, מספר ותו מיוחד (כמו !@#$).</p>
              {errors.password && <p className="error-text shake">{errors.password}</p>}
            </div>
            <div className="input-group">
              <input type="password" name="confirmPassword" placeholder="אימות סיסמה" onChange={handleChange} className="auth-input" />
              {errors.confirmPassword && <p className="error-text shake">{errors.confirmPassword}</p>}
            </div>
            <div className="input-group">
              <input type="text" name="address" placeholder="כתובת (אופציונלי)" onChange={handleChange} className="auth-input" />
            </div>
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