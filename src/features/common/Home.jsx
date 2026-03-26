//react-client/src/features/common/Home.jsx
import { useState, useEffect } from "react";
import { Container, Typography, Box, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import DeviceThermostatRoundedIcon from '@mui/icons-material/DeviceThermostatRounded';
import axios from "axios";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const [weather, setWeather] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [loadingWeather, setLoadingWeather] = useState(true);

  useEffect(() => {
    const fetchWeather = (lat, lon, name) => {
      axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
        .then(response => {
          setWeather(response.data.current_weather.temperature);
          setLocationName(name);
          setLoadingWeather(false);
        })
        .catch(error => {
          console.error("Error fetching weather:", error);
          setLoadingWeather(false);
        });
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude, "במיקומך");
        },
        (_error) => {
          fetchWeather(31.769, 35.2163, "בירושלים");
        }
      );
    } else {
      fetchWeather(31.769, 35.2163, "בירושלים");
    }
  }, []);

  return (
    <div className="home-wrapper" dir="rtl">
      
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

          <div className="reveal-stagger-4 weather-glass-widget">
            <Typography variant="h6" className="weather-widget-title">
              <DeviceThermostatRoundedIcon sx={{ color: '#E07A5F' }} /> מתכננים בישולים להיום?
            </Typography>
            
            {loadingWeather ? (
              <CircularProgress size={24} sx={{ mt: 2, color: '#E07A5F' }} />
            ) : weather ? (
              <Typography className="weather-widget-text">
                הטמפרטורה בחוץ כעת ({locationName}) היא <span className="weather-temp-highlight">{weather}°C</span>. <br/>
                {weather < 20 ? 'מזג אוויר מושלם למרק חם! 🥣' : 'זה הזמן לסלט מרענן או לקינוח קר! 🥗'}
              </Typography>
            ) : null}
          </div>

        </Container>
      </section>
    </div>
  );
};

export default Home;