// react-client/src/components/Contact.jsx

import { useState } from 'react';
import { Container, TextField, Button, Box, Typography, Paper } from '@mui/material';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import './Contact.css';

const Contact = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
      const BASE_URL = isLocalhost 
        ? "http://localhost:5005/api" 
        : "https://yhudit-backend-project.onrender.com/api";

      console.log('📤 שולח הודעה לכתובת:', `${BASE_URL}/contact`);
      console.log('📝 תוכן:', formData);

      const response = await axios.post(`${BASE_URL}/contact`, formData);

      console.log('✅ תגובה מהשרת:', response.data);

      enqueueSnackbar('ההודעה נשלחה בהצלחה! 🎉', { variant: 'success' });
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('❌ שגיאה בשליחה:', error);
      
      let errorMessage = 'אירעה שגיאה בשליחת ההודעה';
      
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.request) {
        errorMessage = 'לא ניתן להתחבר לשרת. בדוק שהשרת עובד.';
      }
      
      enqueueSnackbar(errorMessage, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 8, mt: 10 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            mb: 3, 
            textAlign: 'center', 
            fontWeight: 'bold', 
            color: '#ff7e5f' 
          }}
        >
          📧 צור קשר איתנו
        </Typography>
        
        <Typography 
          variant="body1" 
          sx={{ 
            mb: 4, 
            textAlign: 'center', 
            color: '#666' 
          }}
        >
          יש לך שאלה או הצעה? אנחנו רוצים לשמוע ממך!
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="שם מלא"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              placeholder="הכנס את שמך"
            />

            <TextField
              label="דוא״ל"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              placeholder="הכנס את הדוא״ל שלך"
            />

            <TextField
              label="נושא"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              placeholder="נושא ההודעה"
            />

            <TextField
              label="הודעה"
              name="message"
              value={formData.message}
              onChange={handleChange}
              fullWidth
              required
              multiline
              rows={5}
              variant="outlined"
              placeholder="כתוב את הודעתך כאן..."
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                backgroundColor: '#ff7e5f',
                color: 'white',
                fontWeight: 'bold',
                padding: '12px 24px',
                fontSize: '16px',
                '&:hover': {
                  backgroundColor: '#ff6347'
                },
                '&:disabled': {
                  backgroundColor: '#ccc'
                }
              }}
            >
              {loading ? '⏳ שולח...' : '✉️ שלח הודעה'}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Contact;