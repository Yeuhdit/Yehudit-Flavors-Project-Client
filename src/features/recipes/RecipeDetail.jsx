// react-client/src/features/recipes/RecipeDetail.jsx
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useContext } from "react";
import { CircularProgress } from "@mui/material";
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import RecordVoiceOverRoundedIcon from '@mui/icons-material/RecordVoiceOverRounded';
import StopCircleRoundedIcon from '@mui/icons-material/StopCircleRounded';
import PrintRoundedIcon from '@mui/icons-material/PrintRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import { useSnackbar } from 'notistack';
import { AuthContext } from "../../context/AuthContext";
import { toggleLikeRecipe } from "./recipeSlice"; 
import "./RecipeDetail.css";

const RecipeDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { recipes } = useSelector((state) => state.recipes);
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useContext(AuthContext);

  const recipe = recipes.find((r) => r._id === id || r._id === Number(id)); 
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // חישוב מצב הלייקים
  const likesCount = recipe?.likes?.length || 0;
  const hasLiked = user && recipe?.likes?.includes(user._id);

  // עוצר את ההקראה אם המשתמש יוצא מהדף באמצע
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const toggleIngredient = (index) => {
    setCheckedIngredients((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const getImageUrl = () => {
    if (!recipe) return null;
    const rawName = recipe.imageUrl || recipe.image || recipe.img || recipe.imagUrl || "";
    if (!rawName) return null;
    const cleanName = rawName.split("/").pop().split("\\").pop();    
    const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    const RENDER_BACKEND_URL = "https://yhudit-backend-project.onrender.com"; 
    const BASE_URL = isLocalhost ? "http://localhost:5005" : RENDER_BACKEND_URL;

    return `${BASE_URL}/images/${cleanName}`;
  };

  const handlePrint = (e) => {
    e.preventDefault(); 
    setTimeout(() => window.print(), 150); 
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        enqueueSnackbar('הקישור הועתק בהצלחה! אפשר לשלוח לחברים 🔗', { 
           variant: 'success', 
           autoHideDuration: 3000,
           anchorOrigin: { vertical: 'bottom', horizontal: 'left' }
        });
      })
      .catch((_err) => {
        const textArea = document.createElement("textarea");
        textArea.value = window.location.href;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        enqueueSnackbar('הקישור הועתק בהצלחה! 🔗', { 
           variant: 'success', 
           autoHideDuration: 3000,
           anchorOrigin: { vertical: 'bottom', horizontal: 'left' } 
         });
      });
  };

  const handleReadRecipe = () => {
    if (!('speechSynthesis' in window)) {
      enqueueSnackbar('אופס, הדפדפן שלך לא תומך בהקראת קול.', { variant: 'error' });
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToRead = `
      מתכון ל${recipe.name}.
      זמן הכנה משוער: ${recipe.preparationTime || 'לא צוין'} דקות.
      
      מה נצטרך?
      ${recipe.ingredients.join('. ')}.
      
      שלבי ההכנה:
      ${recipe.instructions.join('. ')}.
      
      בתיאבון ובהצלחה!
    `;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'he-IL';
    utterance.rate = 0.9;     
    utterance.pitch = 1;      

    utterance.onend = () => { setIsSpeaking(false); };
    utterance.onerror = () => { setIsSpeaking(false); };

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const handleLike = () => {
    if (!user) {
      enqueueSnackbar('יש להתחבר לחשבון כדי לשמור מתכונים מועדפים ❤️', { variant: 'info' });
      return;
    }
    dispatch(toggleLikeRecipe(recipe._id));
  };

  if (!recipe) {
    return (
      <div className="ydt-lux-loader">
        <CircularProgress sx={{ color: "#ff8c6b", strokeWidth: 1 }} size={60} />
      </div>
    );
  }

  const bgImage = getImageUrl();

  return (
    <div className="ydt-lux-wrapper">
      <div className="ydt-lux-ambient-bg">
        <div className="glow-circle glow-1"></div>
        <div className="glow-circle glow-2"></div>
      </div>

      <div className="no-print" style={{ position: 'fixed', top: '100px', left: '40px', display: 'flex', flexDirection: 'column', gap: '20px', zIndex: 99999 }}>
        
        {/* כפתור הלייק 🔥 */}
        <button 
          type="button" 
          className="ydt-lux-print-btn fade-in-up" 
          onClick={handleLike} 
          title={hasLiked ? "הסר מהמועדפים" : "שמור למועדפים"} 
          style={{ position: 'relative', top: 0, left: 0, color: hasLiked ? '#ef4444' : '#888' }}
        >
          {hasLiked ? <FavoriteRoundedIcon sx={{ fontSize: '1.8rem' }} /> : <FavoriteBorderRoundedIcon sx={{ fontSize: '1.8rem' }} />}
          {likesCount > 0 && (
            <span style={{ 
              position: 'absolute', bottom: '-8px', right: '-8px', 
              backgroundColor: '#1a1a1a', color: 'white', 
              fontSize: '0.7rem', fontWeight: 'bold', 
              borderRadius: '50%', width: '20px', height: '20px', 
              display: 'flex', alignItems: 'center', justifyContent: 'center' 
            }}>
              {likesCount}
            </span>
          )}
        </button>

        <button 
          type="button" 
          className="ydt-lux-print-btn fade-in-up" 
          onClick={handleReadRecipe} 
          title={isSpeaking ? "עצור הקראה" : "הקרא מתכון"} 
          style={{ position: 'relative', top: 0, left: 0, animationDelay: '0.1s', color: isSpeaking ? '#ff4d4d' : '#1a1a1a' }}
        >
          {isSpeaking ? <StopCircleRoundedIcon /> : <RecordVoiceOverRoundedIcon />}
        </button>

        <button type="button" className="ydt-lux-print-btn fade-in-up" onClick={handlePrint} title="הדפס מתכון" style={{ position: 'relative', top: 0, left: 0, animationDelay: '0.2s' }}>
          <PrintRoundedIcon />
        </button>

        <button type="button" className="ydt-lux-print-btn fade-in-up" onClick={handleShare} title="העתק קישור" style={{ position: 'relative', top: 0, left: 0, animationDelay: '0.3s' }}>
          <ShareRoundedIcon />
        </button>
      </div>

      <div className="ydt-lux-container fade-in-up" style={{ animationDelay: '0.1s' }}>
        <section className="ydt-lux-hero">
          <div className="ydt-lux-image-wrapper fade-in-up" style={{ animationDelay: '0.2s' }}>
            {bgImage ? (
              <img 
                 src={bgImage} 
                 alt={recipe.name} 
                 className="ydt-lux-image" 
                 loading="lazy" 
                 decoding="async" 
               />
            ) : (
              <div className="ydt-lux-image-placeholder"></div>
            )}
          </div>
          
          <div className="ydt-lux-title-area fade-in-up" style={{ animationDelay: '0.3s' }}>
            <h1 className="ydt-lux-title">
              {recipe.name.split(' ').map((word, index) => (
                <span key={index} className={index === 0 ? "highlight-word" : ""}>{word}{" "}</span>
              ))}
            </h1>
            <div className="ydt-lux-meta">
              {recipe.category && <span className="lux-tag">{recipe.category}</span>}
              {recipe.preparationTime && <span className="lux-tag">{recipe.preparationTime} דקות</span>}
              {recipe.difficulty && <span className="lux-tag">{recipe.difficulty === 'easy' ? 'קל' : recipe.difficulty === 'medium' ? 'בינוני' : 'קשה'}</span>}
              {recipe.servings && <span className="lux-tag">{recipe.servings} מנות</span>}
            </div>
            <p className="ydt-lux-subtitle">רכיבים מדויקים ושלבים ברורים ליצירת מנה בלתי נשכחת. קחו את הזמן, תיהנו מהתהליך.</p>
          </div>
        </section>

        <section className="ydt-lux-content">
          <div className="ydt-lux-ingredients fade-in-up" style={{ animationDelay: '0.4s' }}>
            <h2 className="ydt-lux-heading">מה נצטרך?</h2>
            <div className="ydt-lux-ingredients-list">
              {recipe.ingredients?.map((ing, i) => {
                const isChecked = checkedIngredients.includes(i);
                return (
                  <div key={i} onClick={() => toggleIngredient(i)} className={`ydt-lux-ingredient-item ${isChecked ? "checked" : ""}`} style={{ animationDelay: `${0.4 + (i * 0.05)}s` }}>
                    <div className="ydt-lux-radio"></div>
                    <span className="ydt-lux-ing-text">{ing}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="ydt-lux-instructions fade-in-up" style={{ animationDelay: '0.5s' }}>
            <h2 className="ydt-lux-heading">שלבי ההכנה</h2>
            <div className="ydt-lux-steps-container">
              {recipe.instructions?.map((step, i) => (
                <div key={i} className="ydt-lux-step" data-step={`0${i + 1}`.slice(-2)}>
                  <p className="ydt-lux-step-text">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {recipe.youtubeUrl && (
            <div className="ydt-lux-video fade-in-up" style={{ animationDelay: '0.6s', gridColumn: '1 / -1', marginTop: '40px' }}>
              <h2 className="ydt-lux-heading">סרטון הדרכה</h2>
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '30px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                <iframe 
                   src={recipe.youtubeUrl.replace("watch?v=", "embed/")} 
                   style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }} 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                   allowFullScreen 
                  title="סרטון הכנה" 
                ></iframe>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default RecipeDetail;