import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
const navigate = useNavigate();

return (
<div className="home-wrapper">
<div className="hero-section">
<div className="overlay-shapes">
<div className="shape s1"></div>
<div className="shape s2"></div>
</div>

<Container maxWidth="md" className="hero-content">
<Typography variant="overline" className="hero-subtitle">
הבית של האוכל הטוב
</Typography>
<Typography variant="h1" className="hero-title">
לבשל עם <span className="highlight">נשמה</span>,<br />
לאכול עם חיוך.
</Typography>
<Typography variant="h6" className="hero-description">
מתכונים שנבחרו בקפידה, טיפים מהמטבח של יהודית וקהילה שלמה של טעמים.
</Typography>

<Box className="hero-actions">
<Button
variant="contained"
className="main-btn"
onClick={() => navigate('/recipes')}
>
לכל המתכונים
</Button>
<Button
variant="outlined"
className="secondary-btn"
onClick={() => navigate('/register')}
>
הצטרפות לקהילה
</Button>
</Box>
</Container>
</div>
</div>
);
};

export default Home;
