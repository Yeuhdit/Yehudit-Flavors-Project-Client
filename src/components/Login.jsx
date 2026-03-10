// src/components/Login.jsx
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, TextField, Button, CircularProgress, Box } from '@mui/material';
import userService from '../services/userService';
import { AuthContext } from '../context/AuthContext';
import './AuthStyles.css';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { loginContext } = useContext(AuthContext);

  // משתנים להודעות על המסך
  const [serverError, setServerError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setServerError(''); // מנקה שגיאה כשמתחילים להקליד שוב
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

      setSuccessMsg('🎉 התחברת בהצלחה! מעביר לדף הבית...');
      setTimeout(() => navigate('/'), 1200);
    } catch (err) {
      const msg = err?.response?.status === 401 ? '❌ אימייל או סיסמה שגויים' : '❌ שגיאה בהתחברות';
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ maxWidth: 420, mx: 'auto', mt: 8, p: 3, borderRadius: 4, boxShadow: '0 12px 40px rgba(0,0,0,0.15)' }}>
      <CardContent>
        <Typography variant="h4" align="center" mb={1} fontWeight="bold">ברוכה הבאה 🍳</Typography>
        <Typography align="center" mb={3} color="text.secondary">התחברי לחשבון שלך</Typography>

        {/* תצוגת הודעות שרת / הצלחה ישר בתוך המסך */}
        {serverError && (
          <Box sx={{ bgcolor: '#ffebee', color: '#c62828', p: 1.5, borderRadius: 1, mb: 2, textAlign: 'center', fontWeight: 'bold' }}>
            {serverError}
          </Box>
        )}
        {successMsg && (
          <Box sx={{ bgcolor: '#e8f5e9', color: '#2e7d32', p: 1.5, borderRadius: 1, mb: 2, textAlign: 'center', fontWeight: 'bold' }}>
            {successMsg}
          </Box>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <TextField 
            label="אימייל" name="email" type="email" fullWidth margin="normal" 
            value={form.email} onChange={handleChange} 
            error={!!errors.email} helperText={errors.email} 
          />
          <TextField 
            label="סיסמה" name="password" type="password" fullWidth margin="normal" 
            value={form.password} onChange={handleChange} 
            error={!!errors.password} helperText={errors.password} 
          />
          <Button type="submit" fullWidth variant="contained" disabled={loading} sx={{ mt: 2, py: 1.5, background: 'linear-gradient(45deg, #f97316, #fb923c)' }}>
            {loading ? <CircularProgress size={26} color="inherit" /> : 'התחברי'}
          </Button>
        </form>
        <Typography align="center" mt={3} color="text.secondary">
          אין לך חשבון עדיין? <Button onClick={() => navigate('/register')} sx={{ fontWeight: 'bold', color: '#f97316' }}>הרשמה</Button>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Login;