// react-client/src/features/common/Home.jsx
import React from "react";
import { Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper" dir="rtl">
      
      {/* רקע חי ונושם */}
      <div className="ambient-background">
        <div className="glow-orb orb-primary"></div>
        <div className="glow-orb orb-secondary"></div>
      </div>

      <section className="hero-section">
        <Container maxWidth="md" className="hero-content">
          
          <div className="reveal-stagger-1">
            <Typography className="hero-subtitle">
              הבית של האוכל הטוב
            </Typography>
          </div>

          <div className="reveal-stagger-2">
            <Typography component="h1" className="hero-title">
              לבשל עם <span className="text-highlight">נשמה</span>,<br />
              לאכול עם חיוך.
            </Typography>
          </div>

          <div className="reveal-stagger-3">
            <Typography className="hero-description">
              מתכונים שנבחרו בקפידה, טיפים מהמטבח של יהודית וקהילה שלמה של טעמים.
            </Typography>
          </div>

          <Box className="hero-actions reveal-stagger-4">
            <button
              className="btn-premium btn-primary"
              onClick={() => navigate("/recipes")}
            >
              לכל המתכונים <ArrowBackRoundedIcon className="btn-icon" />
            </button>

            <button
              className="btn-premium btn-outline"
              onClick={() => navigate("/register")}
            >
              הצטרפות לקהילה
            </button>
          </Box>

        </Container>
      </section>
    </div>
  );
};

export default Home;