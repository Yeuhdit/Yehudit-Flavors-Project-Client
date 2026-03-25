import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import userService from '../services/userService';
import { AuthContext } from '../context/AuthContext';
import './AuthStyles.css';

const loginSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    'string.empty': 'חובה למלא כתובת אימייל',
    'string.email': 'אימייל לא תקין',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'חובה למלא סיסמה',
  })
});

const Login = () => {
  const navigate = useNavigate();
  const { loginContext } = useContext(AuthContext);
  
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: joiResolver(loginSchema),
    mode: 'onTouched'
  });

  const onSubmit = async (data) => {
    setServerError('');
    setSuccessMsg('');

    try {
      setLoading(true);
      const resData = await userService.login({ 
        email: data.email.trim(), 
        password: data.password 
      });

      loginContext(resData.user);

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

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            
            <div className="input-group">
              <input 
                type="email" 
                placeholder="כתובת אימייל" 
                {...register('email')}
                className={`auth-input ${errors.email ? 'has-error' : ''}`} 
              />
              <EmailRoundedIcon className="input-icon" />
              {errors.email && <span className="error-text">{errors.email.message}</span>}
            </div>

            <div className="input-group">
              <input 
                type="password" 
                placeholder="סיסמה" 
                {...register('password')}
                className={`auth-input ${errors.password ? 'has-error' : ''}`} 
              />
              <LockRoundedIcon className="input-icon" />
              {errors.password && <span className="error-text">{errors.password.message}</span>}
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