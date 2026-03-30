
// react-client/src/features/common/Home.jsx
import { useState, useEffect } from "react";
import { Container, Typography, Box, CircularProgress, Grid, Card, CardMedia, CardContent, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import DeviceThermostatRoundedIcon from '@mui/icons-material/DeviceThermostatRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import axios from "axios";
import { useSelector } from "react-redux";
import "./Home.css";

// פונקציית עזר לשליפת כתובת ה-URL של שרת ה-Node.js שלנו
const getBaseUrl = () => {
  const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
  return isLocalhost ? "http://localhost:5005" : "https://yhudit-backend-project.onrender.com";
};

// פונקציית עזר לשליפת תמונות (של מתכונים או עיצוב) מהשרת
const getImageUrl = (imageName) => {
  if (!imageName) return null;
  // אם imageName הוא כבר URL מלא, נחזיר אותו כמות שהוא
  if (imageName.startsWith("http")) return imageName;
  // אחרת, נבנה את ה-URL לתיקיית images בשרת ה-Node
  const cleanName = imageName.split("/").pop().split("\\").pop();
  return `${getBaseUrl()}/images/${cleanName}`;
};

const Home = () => {
  const navigate = useNavigate();
  const [weather, setWeather] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [loadingWeather, setLoadingWeather] = useState(true);

  // משיכת מתכונים מ-Redux לתצוגה המקדימה
  const { recipes } = useSelector(state => state.recipes || {});
  const recentRecipes = Array.isArray(recipes) ? recipes.slice(0, 3) : [];

  useEffect(() => {
    // ווידג'ט מזג אוויר
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
        (position) => fetchWeather(position.coords.latitude, position.coords.longitude, "במיקומך"),
        () => fetchWeather(31.769, 35.2163, "בירושלים")
      );
    } else {
      fetchWeather(31.769, 35.2163, "בירושלים");
    }
  }, []);

  return (
    <div className="home-wrapper" dir="rtl">
     
      {/* --- אפקט "דליס" - אלמנטים צפים מרשימים מהשרת שלך --- */}
      <div className="luxury-floating-elements">
        <div className="sparkle sp-1"></div>
        <div className="sparkle sp-2"></div>
        <div className="sparkle sp-3"></div>
        <div className="sparkle sp-4"></div>
        <div className="sparkle sp-5"></div>

        {/* תמונות צפות. השתמשתי בפונקציית העזר כדי למשוך את הכתובת המלאה */}
        {/* פרוסת לחם גדולה מאוד בצד שמאל */}
        <img src={getImageUrl("bread.png")} alt="" className="float-img float-left-1" onError={(e) => e.target.style.display = 'none'} />
        {/* עגבנייה חצויה ואפקט ברק בצד ימין */}
        <img src={getImageUrl("tomato_half.png")} alt="" className="float-img float-right-1" onError={(e) => e.target.style.display = 'none'} />
        {/* שן שום למטה בצד שמאל */}
        <img src={getImageUrl("garlic.png")} alt="" className="float-img float-left-2" onError={(e) => e.target.style.display = 'none'} />
        {/* עלה בזיליקום למעלה בצד ימין */}
        <img src={getImageUrl("leaf.png")} alt="" className="float-img float-right-2" onError={(e) => e.target.style.display = 'none'} />
      </div>

      <div className="ambient-background">
        <div className="glow-orb orb-primary"></div>
        <div className="glow-orb orb-secondary"></div>
      </div>

      <section className="hero-section">
        <Container maxWidth="md" className="hero-content">
          <div className="reveal-stagger-1">
            <Typography className="hero-subtitle">יהודית בטעמים: הבית של האוכל הטוב</Typography>
          </div>

          <div className="reveal-stagger-2">
            <Typography component="h1" className="hero-title">
              לבשל עם <span className="text-highlight">נשמה</span>,<br />
              לאכול עם חיוך.
            </Typography>
          </div>

          <div className="reveal-stagger-3">
            <Typography className="hero-description">
              מתכונים שנבחרו בקפידה, טיפים מהמטבח של יהודית וקהילה שלמה של טעמים שמחכה רק לך.
            </Typography>
          </div>

          <Box className="hero-actions reveal-stagger-4">
            <button className="btn-premium btn-primary" onClick={() => navigate("/recipes")}>
              לכל המתכונים <ArrowBackRoundedIcon className="btn-icon" />
            </button>
            <button className="btn-premium btn-outline" onClick={() => navigate("/register")}>
              הצטרפות לקהילה
            </button>
          </Box>

          <div className="reveal-stagger-4 weather-glass-widget">
            <Typography variant="h6" className="weather-widget-title">
              <DeviceThermostatRoundedIcon sx={{ color: '#ff7e5f' }} /> מתכננים בישולים להיום?
            </Typography>
            {loadingWeather ? (
              <CircularProgress size={24} sx={{ mt: 2, color: '#ff7e5f' }} />
            ) : weather ? (
              <Typography className="weather-widget-text">
                הטמפרטורה בחוץ כעת ({locationName}) היא <span className="weather-temp-highlight">{weather}°C</span>. <br/>
                {weather < 20 ? 'מזג אוויר מושלם למרק חם! 🍲' : 'זה הזמן לסלט מרענן או לקינוח קר! 🍨'}
              </Typography>
            ) : null}
          </div>
        </Container>
      </section>

      {/* אזור "מתכונים מומלצים" עם כרטיסיות */}
      {recentRecipes.length > 0 && (
        <section className="recent-recipes-section">
          <Container maxWidth="lg">
            <Typography variant="h3" className="section-title reveal-stagger-1">
              טעימה מהקולקציה <span className="text-highlight">שלנו.</span>
            </Typography>
           
            <Grid container spacing={4} sx={{ mt: 4 }}>
              {recentRecipes.map((recipe, index) => (
                <Grid item xs={12} sm={6} md={4} key={recipe._id} className={`reveal-stagger-${(index % 3) + 2}`}>
                  <Card
                    className="preview-card"
                    onClick={() => navigate(`/recipe/${recipe._id}`)}
                    sx={{ borderRadius: '24px', boxShadow: '0 15px 35px rgba(0,0,0,0.04)', cursor: 'pointer', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(10px)', transition: 'all 0.4s ease' }}
                  >
                    {getImageUrl(recipe.imageUrl) ? (
                      <CardMedia component="img" height="220" image={getImageUrl(recipe.imageUrl)} alt={recipe.name} />
                    ) : (
                      <Box sx={{ height: 220, bgcolor: '#f0eeeb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography color="text.secondary">אין תמונה</Typography>
                      </Box>
                    )}
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h5" sx={{ fontWeight: 800, mb: 1.5, color: '#1a1a1a' }}>{recipe.name}</Typography>
                      {recipe.preparationTime && (
                        <Chip icon={<AccessTimeRoundedIcon sx={{ color: '#ff7e5f' }}/>} label={`${recipe.preparationTime} דק'`} sx={{ bgcolor: '#fff0eb', fontWeight: 600, color: '#1a1a1a', borderRadius: '10px' }} />
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </section>
      )}
    </div>
  );
};

export default Home;
