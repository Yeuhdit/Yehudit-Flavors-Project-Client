import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      textAlign: 'center',
      bgcolor: '#f5f5f5',
      p: 3
    }}>
      <Container maxWidth="md">
        <Typography variant="h2" fontWeight="bold" gutterBottom color="primary">
          ברוכים הבאים לספר המתכונים שלי
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          כאן תמצאו את כל המתכונים הכי טעימים, הישר מהמטבח של יהודית.
        </Typography>
        <Button 
          variant="contained" 
          size="large" 
          onClick={() => navigate('/recipes')}
          sx={{ mt: 4, px: 5, py: 1.5, borderRadius: '50px', fontSize: '1.2rem' }}
        >
          לכל המתכונים
        </Button>
      </Container>
    </Box>
  );
};

export default Home;