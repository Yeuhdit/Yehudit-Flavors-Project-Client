// src/pages/Signup.jsx
import { useState } from 'react';
import { authAPI } from '../services/api';
import { Container, Paper, TextField, Button, Typography, Box, Alert, CircularProgress, InputAdornment } from '@mui/material';
import { Person, Email, Lock, Home } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

export default function Signup() {
  const [form, setForm] = useState({ username: '', email: '', password: '', address: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authAPI.signup(form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      enqueueSnackbar('🎉 נרשמת בהצלחה! ברוכה הבאה!', { variant: 'success' });
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      const msg = err.response?.data?.message || 'שגיאה בהרשמה';
      enqueueSnackbar(`❌ ${msg}`, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', py: 4 }}>
      <Paper elevation={12} sx={{ p: 5, borderRadius: 4, bgcolor: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)' }}>
        <Typography variant="h3" align="center" gutterBottom sx={{ color: '#d35400', fontWeight: 900, mb: 1 }}>
          יהודית פלייבורס
        </Typography>
        <Typography variant="h5" align="center" gutterBottom sx={{ color: '#e67e22', fontWeight: 700 }}>
          הרשמה
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <TextField
            fullWidth label="שם משתמש" variant="outlined"
            value={form.username}
            onChange={e => setForm({ ...form, username: e.target.value })}
            InputProps={{ startAdornment: <InputAdornment position="start"><Person /></InputAdornment> }}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
          />
          <TextField
            fullWidth label="אימייל" type="email" variant="outlined"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            InputProps={{ startAdornment: <InputAdornment position="start"><Email /></InputAdornment> }}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
          />
          <TextField
            fullWidth label="סיסמה" type="password" variant="outlined"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            InputProps={{ startAdornment: <InputAdornment position="start"><Lock /></InputAdornment> }}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
          />
          <TextField
            fullWidth label="כתובת" variant="outlined"
            value={form.address}
            onChange={e => setForm({ ...form, address: e.target.value })}
            InputProps={{ startAdornment: <InputAdornment position="start"><Home /></InputAdornment> }}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
          />

          <Button
            type="submit" fullWidth variant="contained" disabled={loading}
            sx={{
              mt: 3, py: 1.8, borderRadius: 3, fontWeight: 700, fontSize: '1.1rem',
              bgcolor: '#d35400', '&:hover': { bgcolor: '#e67e22' },
              boxShadow: '0 8px 20px rgba(211, 84, 0, 0.3)',
              transition: '0.3s'
            }}
          >
            {loading ? <CircularProgress size={28} color="inherit" /> : 'הרשמה'}
          </Button>
        </Box>

        <Typography align="center" sx={{ mt: 3, color: '#7f8c8d', fontSize: '0.9rem' }}>
          כבר יש לך חשבון? <a href="/login" style={{ color: '#d35400', textDecoration: 'none' }}>התחברי</a>
        </Typography>
      </Paper>
    </Container>
  );
}