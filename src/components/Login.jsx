// src/components/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import userService from '../services/userService';
import './AuthStyles.css';
// חשוב מאוד:
// האימייל כאן בדיוק כמו בהרשמה – הוא מזהה ייחודי (unique) במערכת
// • בהרשמה: נבדק שלא קיים כבר → 409 אם כן
// • כאן ב-login: מחפשים את המשתמש לפי האימייל הזה בדיוק
// • לכן חייבים להשתמש באותו אימייל שנרשם (case-insensitive – toLowerCase בשרת)
// • אין אפשרות (ולא צריך) להתחבר עם אימייל של משתמש אחר
// • זה מה שמאפשר למערכת לדעת בדיוק מי את/ה ומחזיר את הטוקן הנכון

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // מנקה שגיאה ספציפית לשדה שמשתנה – חוויית משתמש נעימה יותר
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};

    // ולידציית אימייל – אותו regex כמו בהרשמה
    if (!form.email) {
      newErrors.email = 'חובה למלא כתובת אימייל';
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.email)) {
      newErrors.email = 'אימייל לא תקין (דוגמה: example@mail.com)';
    }

    // ולידציית סיסמה – בדיוק אותם כללים כמו בהרשמה
    if (!form.password) {
      newErrors.password = 'חובה למלא סיסמה';
    } else if (form.password.length < 6 || form.password.length > 12) {
      newErrors.password = 'סיסמה חייבת להיות בין 6 ל-12 תווים';
    } else if (!/[A-Z]/.test(form.password)) {
      newErrors.password = 'חובה לפחות אות גדולה אחת (A-Z)';
    } else if (!/[a-z]/.test(form.password)) {
      newErrors.password = 'חובה לפחות אות קטנה אחת (a-z)';
    } else if (!/[0-9]/.test(form.password)) {
      newErrors.password = 'חובה לפחות מספר אחד (0-9)';
    } else if (!/[^A-Za-z0-9]/.test(form.password)) {
      newErrors.password = 'חובה לפחות תו מיוחד אחד (!@#$%^&* וכו׳)';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const validationErrors = validate();
    setErrors(validationErrors);

    // אם יש שגיאות ולידציה מקומיות – לא שולחים לשרת
    if (Object.keys(validationErrors).length > 0) {
      enqueueSnackbar('⚠️ יש לתקן את השגיאות המסומנות', { variant: 'warning' });
      return;
    }

    try {
      setLoading(true);

      const data = await userService.login({
        email: form.email.trim(), // מנקה רווחים מיותרים
        password: form.password,
      });

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      enqueueSnackbar('🎉 התחברת בהצלחה! ברוכה הבאה חזרה! 🌟', {
        variant: 'success',
        autoHideDuration: 3000,
      });

      setTimeout(() => navigate('/'), 1200);
    } catch (err) {
      let msg = '❌ שגיאה בהתחברות, נסי שוב מאוחר יותר';

      if (err?.response?.status === 401) {
        msg = '❌ אימייל או סיסמה שגויים';
      } else if (err?.response?.status === 400) {
        msg = err?.response?.data?.message || '⚠️ נתונים לא תקינים';
      }

      enqueueSnackbar(msg, { variant: 'error', autoHideDuration: 5000 });

      // הצגת שגיאה ספציפית מתחת לשדה – אם השרת שלח field
      if (err?.response?.data?.field) {
        setErrors((prev) => ({
          ...prev,
          [err.response.data.field]: err.response.data.message || 'שגיאה בשדה זה',
        }));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 420,
        mx: 'auto',
        mt: 8,
        p: 3,
        borderRadius: 4,
        boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
      }}
    >
      <CardContent>
        <Typography variant="h4" align="center" mb={1} fontWeight="bold">
          ברוכה הבאה 🍳
        </Typography>
        <Typography align="center" mb={4} color="text.secondary">
          התחברי לחשבון שלך
        </Typography>

        <form onSubmit={handleSubmit} noValidate>
          <div style={{ marginBottom: '20px' }}>
            <TextField
              label="אימייל"
              name="email"
              type="email"
              fullWidth
              margin="normal"
              value={form.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              FormHelperTextProps={{ style: { color: 'red', fontWeight: 500 } }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <TextField
              label="סיסמה"
              name="password"
              type="password"
              fullWidth
              margin="normal"
              value={form.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              FormHelperTextProps={{ style: { color: 'red', fontWeight: 500 } }}
            />
          </div>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              mt: 2,
              py: 1.5,
              fontSize: '1.1rem',
              borderRadius: 3,
              background: 'linear-gradient(45deg, #f97316, #fb923c)',
              '&:hover': {
                background: 'linear-gradient(45deg, #ea580c, #f59e0b)',
              },
            }}
          >
            {loading ? (
              <CircularProgress size={26} color="inherit" />
            ) : (
              'התחברי'
            )}
          </Button>
        </form>

        <Typography align="center" mt={3} color="text.secondary">
          אין לך חשבון עדיין?{' '}
          <Button
            onClick={() => navigate('/register')}
            sx={{ fontWeight: 'bold', color: '#f97316' }}
          >
            הרשמה
          </Button>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Login;