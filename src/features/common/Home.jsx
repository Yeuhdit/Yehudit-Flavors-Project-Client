
// // react-client/src/features/common/Home.jsx
// import { useState, useEffect } from "react";
// import { Container, Typography, Box, CircularProgress, Grid, Card, CardMedia, CardContent, Chip } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
// import DeviceThermostatRoundedIcon from '@mui/icons-material/DeviceThermostatRounded';
// import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
// import axios from "axios";
// import { useSelector } from "react-redux";
// import "./Home.css";

// // פונקציית עזר לשליפת כתובת ה-URL של שרת ה-Node.js
// const getBaseUrl = () => {
//   const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
//   return isLocalhost ? "http://localhost:5005" : "https://yhudit-backend-project.onrender.com";
// };

// // פונקציית עזר לשליפת תמונות מהשרת
// const getImageUrl = (imageName) => {
//   if (!imageName) return null;
//   // אם imageName הוא כבר URL מלא, נחזיר אותו כמות שהוא
//   if (imageName.startsWith("http")) return imageName;
//   // אחרת, נבנה את ה-URL לתיקיית images בשרת ה-Node
//   const cleanName = imageName.split("/").pop().split("\\").pop();
//   return `${getBaseUrl()}/images/${cleanName}`;
// };

// const Home = () => {
//   const navigate = useNavigate();
//   const [weather, setWeather] = useState(null);
//   const [locationName, setLocationName] = useState("");
//   const [loadingWeather, setLoadingWeather] = useState(true);

//   const { recipes } = useSelector(state => state.recipes || {});
//   const recentRecipes = Array.isArray(recipes) ? recipes.slice(0, 3) : [];

//   const SERVER_URL = getBaseUrl();

//   // מערך חומרי הגלם המרכזיים שמרחפים באתר.
//   // הוספתי 5 שומים במיקומים שונים כדי להשיג את האפקט היוקרתי שביקשת!
//   const floatingIngredients = [
//     { file: "bread.png", className: "float-img float-bread-1" },
//     { file: "bread.png", className: "float-img float-bread-2" },
//     { file: "tomato_half.png", className: "float-img float-tomato" },
//     { file: "leaf.png", className: "float-img float-leaf-1" },
//     { file: "leaf.png", className: "float-img float-leaf-2" },
//     // חמשת השומים המיוחדים שביקשת! כל אחד עם מיקום ואנימציה משלו!
//     { file: "garlic.png", className: "float-img float-garlic-1" },
//     { file: "garlic.png", className: "float-img float-garlic-2" },
//     { file: "garlic.png", className: "float-img float-garlic-3" },
//     { file: "garlic.png", className: "float-img float-garlic-4" },
//     { file: "garlic.png", className: "float-img float-garlic-5" }
//   ];

//   // מערך הצימוקים המתפוצצים! הוספתי המון כדי שזה ייראה כמו מיליון דולר!
//   const floatingCranberries = Array.from({ length: 15 }).map((_, i) => ({
//     file: "cranberry.png", 
//     className: `float-img float-cranberry float-cranberry-${i + 1}`
//   }));

//   useEffect(() => {
//     // ווידג'ט מזג אוויר
//     const fetchWeather = (lat, lon, name) => {
//       axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
//         .then(response => {
//           setWeather(response.data.current_weather.temperature);
//           setLocationName(name);
//           setLoadingWeather(false);
//         })
//         .catch(error => {
//           console.error("Error fetching weather:", error);
//           setLoadingWeather(false);
//         });
//     };

//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => fetchWeather(position.coords.latitude, position.coords.longitude, "במיקומך"),
//         () => fetchWeather(31.769, 35.2163, "בירושלים")
//       );
//     } else {
//       fetchWeather(31.769, 35.2163, "בירושלים");
//     }
//   }, []);

//   return (
//     <div className="home-wrapper" dir="rtl">
      
//       {/* --- אפקט "דליס" - אלמנטים צפים מרשימים מהשרת שלך --- */}
//       <div className="luxury-floating-elements">
//         <div className="sparkle sp-1"></div>
//         <div className="sparkle sp-2"></div>
//         <div className="sparkle sp-3"></div>
//         <div className="sparkle sp-4"></div>
//         <div className="sparkle sp-5"></div>
//         <div className="sparkle sp-6"></div>

//         {/* הלולאה שמציירת את כל חומרי הגלם הצפים (לחם, עגבנייה, 5 שומים וכו') */}
//         {floatingIngredients.map((item, index) => (
//           <img 
//             key={`ing-${index}`}
//             src={getImageUrl(item.file)} 
//             alt="עיצוב צף" 
//             className={item.className} 
//             onError={(e) => e.target.style.display = 'none'} 
//           />
//         ))}

//         {/* הלולאה שמציירת את הצימוקים המתפוצצים! */}
//         {floatingCranberries.map((item, index) => (
//           <img 
//             key={`cran-${index}`}
//             src={getImageUrl(item.file)} 
//             alt="צימוק מתפוצץ" 
//             className={item.className} 
//             onError={(e) => e.target.style.display = 'none'} 
//           />
//         ))}
//       </div>

//       <div className="ambient-background">
//         <div className="glow-orb orb-primary"></div>
//         <div className="glow-orb orb-secondary"></div>
//       </div>

//       <section className="hero-section">
//         <Container maxWidth="md" className="hero-content">
//           <div className="reveal-stagger-1">
//             <Typography className="hero-subtitle">יהודית בטעמים: הבית של האוכל הטוב</Typography>
//           </div>

//           <div className="reveal-stagger-2">
//             <Typography component="h1" className="hero-title">
//               לבשל עם <span className="text-highlight">נשמה</span>,<br />
//               לאכול עם חיוך.
//             </Typography>
//           </div>

//           <div className="reveal-stagger-3">
//             <Typography className="hero-description">
//               מתכונים שנבחרו בקפידה, טיפים מהמטבח של יהודית וקהילה שלמה של טעמים שמחכה רק לך.
//             </Typography>
//           </div>

//           <Box className="hero-actions reveal-stagger-4">
//             <button className="btn-premium btn-primary" onClick={() => navigate("/recipes")}>
//               לכל המתכונים <ArrowBackRoundedIcon className="btn-icon" />
//             </button>
//             <button className="btn-premium btn-outline" onClick={() => navigate("/register")}>
//               הצטרפות לקהילה
//             </button>
//           </Box>

//           <div className="reveal-stagger-4 weather-glass-widget">
//             <Typography variant="h6" className="weather-widget-title">
//               <DeviceThermostatRoundedIcon sx={{ color: '#ff7e5f' }} /> מתכננים בישולים להיום?
//             </Typography>
//             {loadingWeather ? (
//               <CircularProgress size={24} sx={{ mt: 2, color: '#ff7e5f' }} />
//             ) : weather ? (
//               <Typography className="weather-widget-text">
//                 הטמפרטורה בחוץ כעת ({locationName}) היא <span className="weather-temp-highlight">{weather}°C</span>. <br/>
//                 {weather < 20 ? 'מזג אוויר מושלם למרק חם! 🍲' : 'זה הזמן לסלט מרענן או לקינוח קר! 🍨'}
//               </Typography>
//             ) : null}
//           </div>
//         </Container>
//       </section>

//       {/* אזור "מתכונים מומלצים" עם כרטיסיות */}
//       {recentRecipes.length > 0 && (
//         <section className="recent-recipes-section">
//           <Container maxWidth="lg">
//             <Typography variant="h3" className="section-title reveal-stagger-1">
//               טעימה מהקולקציה <span className="text-highlight">שלנו.</span>
//             </Typography>
            
//             <Grid container spacing={4} sx={{ mt: 4 }}>
//               {recentRecipes.map((recipe, index) => (
//                 <Grid item xs={12} sm={6} md={4} key={recipe._id} className={`reveal-stagger-${(index % 3) + 2}`}>
//                   <Card 
//                     className="preview-card" 
//                     onClick={() => navigate(`/recipe/${recipe._id}`)}
//                     sx={{ borderRadius: '24px', boxShadow: '0 15px 35px rgba(0,0,0,0.04)', cursor: 'pointer', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(10px)', transition: 'all 0.4s ease' }}
//                   >
//                     {getImageUrl(recipe.imageUrl) ? (
//                       <CardMedia component="img" height="220" image={getImageUrl(recipe.imageUrl)} alt={recipe.name} />
//                     ) : (
//                       <Box sx={{ height: 220, bgcolor: '#f0eeeb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                         <Typography color="text.secondary">אין תמונה</Typography>
//                       </Box>
//                     )}
//                     <CardContent sx={{ p: 3 }}>
//                       <Typography variant="h5" sx={{ fontWeight: 800, mb: 1.5, color: '#1a1a1a' }}>{recipe.name}</Typography>
//                       {recipe.preparationTime && (
//                         <Chip icon={<AccessTimeRoundedIcon sx={{ color: '#ff7e5f' }}/>} label={`${recipe.preparationTime} דק'`} sx={{ bgcolor: '#fff0eb', fontWeight: 600, color: '#1a1a1a', borderRadius: '10px' }} />
//                       )}
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>
//           </Container>
//         </section>
//       )}
//     </div>
//   );
// };

// export default Home;
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

const getImageUrl = (recipe) => {
  const rawName = recipe.imageUrl || recipe.image || recipe.img || "";
  if (!rawName) return null;
  const cleanName = rawName.split("/").pop().split("\\").pop();
  const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
  const BASE_URL = isLocalhost ? "http://localhost:5005" : "https://yhudit-backend-project.onrender.com";
  return `${BASE_URL}/images/${cleanName}`;
};

const Home = () => {
  const navigate = useNavigate();
  const [weather, setWeather] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [loadingWeather, setLoadingWeather] = useState(true);

  const { recipes } = useSelector(state => state.recipes || {});
  
  // 🔥 התיקון: מסננים *רק* מתכונים שיש להם תמונה, ואז לוקחים את ה-3 הראשונים
  const safeRecipes = Array.isArray(recipes) ? recipes : [];
  const recentRecipes = safeRecipes
    .filter(recipe => getImageUrl(recipe) !== null) // מוודא שיש תמונה
    .slice(0, 3); // לוקח רק 3

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
            <Typography className="hero-subtitle">הבית של האוכל הטוב</Typography>
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
            <button className="btn-premium btn-primary" onClick={() => navigate("/recipes")}>
              לכל המתכונים <ArrowBackRoundedIcon className="btn-icon" />
            </button>
            <button className="btn-premium btn-outline" onClick={() => navigate("/register")}>
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
                {weather < 20 ? 'מזג אוויר מושלם למרק חם! 🍲' : 'זה הזמן לסלט מרענן או לקינוח קר! 🍨'}
              </Typography>
            ) : null}
          </div>
        </Container>
      </section>

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
                    sx={{ borderRadius: '24px', boxShadow: '0 15px 35px rgba(0,0,0,0.05)', cursor: 'pointer', background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)', transition: '0.4s' }}
                  >
                    <CardMedia component="img" height="220" image={getImageUrl(recipe)} alt={recipe.name} />
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h5" sx={{ fontWeight: 800, mb: 1.5, color: '#1a1a1a' }}>{recipe.name}</Typography>
                      {recipe.preparationTime && (
                        <Chip icon={<AccessTimeRoundedIcon sx={{ color: '#ff7e5f' }}/>} label={`${recipe.preparationTime} דק'`} sx={{ bgcolor: '#fff0eb', fontWeight: 600, color: '#1a1a1a' }} />
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