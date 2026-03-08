import React, { useState } from 'react';
import {
  Box, TextField, Button, MenuItem, Typography, Grid
} from '@mui/material';
import { addUser } from './userSlice';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';

export default function Register() {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar();

  const [form1, setForm1] = useState({
    email: '',
    username: '',
    password: '',
    address: ''
  });

  const [errors1, setErrors1] = useState({});

  const handleChange1 = e => {
    setForm1({ ...form1, [e.target.name]: e.target.value });
  };

  const validate1 = () => {
    let temp = {};
    
    // בדיקת אימייל
    temp.email = form1.email && /\S+@\S+\.\S+/.test(form1.email) ? '' : '❌ אימייל לא תקין';
    
    // בדיקת שם משתמש
    temp.username = form1.username ? '' : '❌ חובה להזין שם משתמש';
    
    // ✅ התיקון בוצע כאן: תאימות מלאה לדרישות השרת (6-12 תווים, אות גדולה, קטנה, מספר ותו מיוחד)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,12}$/;
    temp.password = form1.password && passwordRegex.test(form1.password) 
      ? '' 
      : '❌ הסיסמה חייבת להיות 6-12 תווים, ולכלול אות אנגלית גדולה וקטנה, מספר ותו מיוחד';
      
    // בדיקת עיר/כתובת
    temp.address = form1.address ? '' : '❌ חובה להזין עיר';
    
    setErrors1(temp);
    return Object.values(temp).every(x => x === '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (err) {}

    if (!validate1()) {
      // הצגת כל השגיאות בהודעה אחת
      const errorMessages = Object.values(errors1).filter(e => e !== '').join(', ');
      enqueueSnackbar(`⚠️ ${errorMessages}`, { variant: 'warning', autoHideDuration: 4000 });
      return;
    }

    try {
      // אם addUser הוא thunk שמחזיר promise
      const result = await dispatch(addUser(form1));
      // בדיקה אם הפעולה הצליחה בהתאם לפי ה־payload שחוזר
      if (result?.payload?.error) {
        const errorMsg = result.payload.error;
        if (errorMsg.includes('already exists') || errorMsg.includes('duplicate')) {
          enqueueSnackbar('⚠️ משתמש זה כבר קיים במערכת', { variant: 'error', autoHideDuration: 4000 });
        } else {
          enqueueSnackbar(`❌ ${errorMsg}`, { variant: 'error', autoHideDuration: 4000 });
        }
        return;
      }
      
      // הודעת הצלחה
      enqueueSnackbar('✅ משתמש נוסף בהצלחה!', { variant: 'success', autoHideDuration: 3000 });
      // נקה טופס
      setForm1({ email: '', username: '', password: '', address: '' });
      setErrors1({});
    } catch (err) {
      console.error('Add user error:', err);
      let msg = 'שגיאה ביצירת משתמש';
      
      // התאמת הודעה לפי סוג השגיאה
      if (err?.message?.includes('duplicate')) {
        msg = '⚠️ משתמש זה כבר קיים במערכת';
      } else if (err?.message?.includes('validation')) {
        msg = '⚠️ הנתונים שהוזנו אינם תקינים';
      } else if (err?.message) {
        msg = `❌ ${err.message}`;
      }
      
      enqueueSnackbar(msg, { variant: 'error', autoHideDuration: 5000 });
    }
  };

  // פונקציה לעדכון משתמש
  const handleUpdate = async (userId) => {
    try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (err) {}
    
    try {
      if (!validate1()) {
        const errorMessages = Object.values(errors1).filter(e => e !== '').join(', ');
        enqueueSnackbar(`⚠️ ${errorMessages}`, { variant: 'warning', autoHideDuration: 4000 });
        return;
      }
      
      // כאן יכול להיות updateUser בעתיד
      enqueueSnackbar('✅ משתמש עודכן בהצלחה!', { variant: 'success', autoHideDuration: 3000 });
      setForm1({ email: '', username: '', password: '', address: '' });
    } catch (err) {
      enqueueSnackbar(`❌ שגיאה בעדכון משתמש: ${err?.message || 'נסו שוב'}`, { variant: 'error', autoHideDuration: 5000 });
    }
  };

  // פונקציה למחיקת משתמש
  const handleDelete = async (userId) => {
    try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (err) {}
    
    // אישור לפני מחיקה
    const confirmed = window.confirm('האם אתה בטוח שברצונך למחוק את המשתמש?');
    if (!confirmed) return;
    
    try {
      // כאן יכול להיות deleteUser בעתיד
      enqueueSnackbar('✅ משתמש נמחק בהצלחה!', { variant: 'success', autoHideDuration: 3000 });
    } catch (err) {
      enqueueSnackbar(`❌ שגיאה במחיקת משתמש: ${err?.message || 'נסו שוב'}`, { variant: 'error', autoHideDuration: 5000 });
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 480, mx: 'auto', mt: 5, p: 3, border: '1px solid #ccc', borderRadius: 2 }}
    >
      <Typography variant="h5" mb={2} sx={{textAlign: 'center'}}>הרשמה</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label='דוא"ל'
            name="email"
            value={form1.email}
            onChange={handleChange1}
            fullWidth
            error={!!errors1.email}
            helperText={errors1.email}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="שם משתמש"
            name="username"
            value={form1.username}
            onChange={handleChange1}
            fullWidth
            error={!!errors1.username}
            helperText={errors1.username}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="סיסמא"
            name="password"
            type="password"
            value={form1.password}
            onChange={handleChange1}
            fullWidth
            error={!!errors1.password}
            helperText={errors1.password}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="עיר"
            name="address"
            value={form1.address}
            onChange={handleChange1}
            fullWidth
            error={!!errors1.address}
            helperText={errors1.address}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" type="submit" fullWidth sx={{backgroundColor: '#ff9b8ca6', fontSize: "larger"}}>
            הוסף משתמש
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}