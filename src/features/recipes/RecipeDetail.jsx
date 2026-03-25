// // react-client/src/features/recipes/RecipeDetail.jsx

// import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { useState } from "react";
// import { CircularProgress } from "@mui/material";
// import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
// import { useSnackbar } from 'notistack';
// import "./RecipeDetail.css";

// const RecipeDetail = () => {
//   const { id } = useParams();
//   const { recipes } = useSelector((state) => state.recipes);
//   const { enqueueSnackbar } = useSnackbar();

//   const recipe = recipes.find((r) => r._id === id || r._id === Number(id));
//   console.log("Recipe data from server:", recipe);
  
//   const [checkedIngredients, setCheckedIngredients] = useState([]);

//   const toggleIngredient = (index) => {
//     setCheckedIngredients((prev) =>
//       prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
//     );
//   };

//   const getImageUrl = () => {
//     if (!recipe) return null;
//     const rawName = recipe.imageUrl || recipe.image || recipe.img || recipe.imagUrl || "";
//     if (!rawName) return null;
//     const cleanName = rawName.split("/").pop().split("\\").pop();
    
//     const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
//     const RENDER_BACKEND_URL = "https://yhudit-backend-project.onrender.com"; 
//     const BASE_URL = isLocalhost ? "http://localhost:5005" : RENDER_BACKEND_URL;

//     return `${BASE_URL}/images/${cleanName}`;
//   };

//   const handlePrint = (e) => {
//     e.preventDefault(); 
//     setTimeout(() => window.print(), 150); 
//   };

//   const handleShare = () => {
//     navigator.clipboard.writeText(window.location.href)
//       .then(() => {
//         enqueueSnackbar('הקישור הועתק בהצלחה! אפשר לשלוח לחברים 🔗', { 
//           variant: 'success', 
//           autoHideDuration: 3000,
//           anchorOrigin: { vertical: 'bottom', horizontal: 'left' }
//         });
//       })
//       .catch((_err) => {
//         const textArea = document.createElement("textarea");
//         textArea.value = window.location.href;
//         document.body.appendChild(textArea);
//         textArea.select();
//         document.execCommand("copy");
//         document.body.removeChild(textArea);
//         enqueueSnackbar('הקישור הועתק בהצלחה! 🔗', { 
//           variant: 'success', 
//           autoHideDuration: 3000,
//           anchorOrigin: { vertical: 'bottom', horizontal: 'left' } 
//         });
//       });
//   };

//   if (!recipe) {
//     return (
//       <div className="ydt-lux-loader">
//         <CircularProgress sx={{ color: "#ff8c6b", strokeWidth: 1 }} size={60} />
//       </div>
//     );
//   }

//   const bgImage = getImageUrl();

//   return (
//     <div className="ydt-lux-wrapper">
//       <div className="ydt-lux-ambient-bg">
//         <div className="glow-circle glow-1"></div>
//         <div className="glow-circle glow-2"></div>
//       </div>

//       <div style={{ position: 'fixed', top: '40px', left: '40px', display: 'flex', gap: '15px', zIndex: 99999 }}>
//         <button type="button" className="ydt-lux-print-btn fade-in-up" onClick={handlePrint} title="הדפס מתכון" style={{ position: 'relative', top: 0, left: 0 }}>
//           <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
//         </button>

//         <button type="button" className="ydt-lux-print-btn fade-in-up" onClick={handleShare} title="העתק קישור" style={{ position: 'relative', top: 0, left: 0, animationDelay: '0.2s' }}>
//           <ShareRoundedIcon />
//         </button>
//       </div>

//       <div className="ydt-lux-container fade-in-up" style={{ animationDelay: '0.1s' }}>
//         <section className="ydt-lux-hero">
//           <div className="ydt-lux-image-wrapper fade-in-up" style={{ animationDelay: '0.2s' }}>
//             {bgImage ? <img src={bgImage} alt={recipe.name} className="ydt-lux-image" /> : <div className="ydt-lux-image-placeholder"></div>}
//           </div>
          
//           <div className="ydt-lux-title-area fade-in-up" style={{ animationDelay: '0.3s' }}>
//             <h1 className="ydt-lux-title">
//               {recipe.name.split(' ').map((word, index) => (
//                 <span key={index} className={index === 0 ? "highlight-word" : ""}>{word}{" "}</span>
//               ))}
//             </h1>
//             <div className="ydt-lux-meta">
//               {recipe.category && <span className="lux-tag">{recipe.category}</span>}
//               {recipe.preparationTime && <span className="lux-tag">{recipe.preparationTime} דקות</span>}
//               {recipe.difficulty && <span className="lux-tag">{recipe.difficulty === 'easy' ? 'קל' : recipe.difficulty === 'medium' ? 'בינוני' : 'קשה'}</span>}
//               {recipe.servings && <span className="lux-tag">{recipe.servings} מנות</span>}
//             </div>
//             <p className="ydt-lux-subtitle">רכיבים מדויקים ושלבים ברורים ליצירת מנה בלתי נשכחת. קחו את הזמן, תיהנו מהתהליך.</p>
//           </div>
//         </section>

//         <section className="ydt-lux-content">
//           <div className="ydt-lux-ingredients fade-in-up" style={{ animationDelay: '0.4s' }}>
//             <h2 className="ydt-lux-heading">מה נצטרך?</h2>
//             <div className="ydt-lux-ingredients-list">
//               {recipe.ingredients?.map((ing, i) => {
//                 const isChecked = checkedIngredients.includes(i);
//                 return (
//                   <div key={i} onClick={() => toggleIngredient(i)} className={`ydt-lux-ingredient-item ${isChecked ? "checked" : ""}`} style={{ animationDelay: `${0.4 + (i * 0.05)}s` }}>
//                     <div className="ydt-lux-radio"></div>
//                     <span className="ydt-lux-ing-text">{ing}</span>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           <div className="ydt-lux-instructions fade-in-up" style={{ animationDelay: '0.5s' }}>
//             <h2 className="ydt-lux-heading">שלבי ההכנה</h2>
//             <div className="ydt-lux-steps-container">
//               {recipe.instructions?.map((step, i) => (
//                 <div key={i} className="ydt-lux-step" data-step={`0${i + 1}`.slice(-2)}>
//                   <p className="ydt-lux-step-text">{step}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default RecipeDetail;
// react-client/src/features/recipes/RecipeDetail.jsx
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import { useSnackbar } from 'notistack';
import "./RecipeDetail.css";

const RecipeDetail = () => {
  const { id } = useParams();
  const { recipes } = useSelector((state) => state.recipes);
  const { enqueueSnackbar } = useSnackbar();

  const recipe = recipes.find((r) => r._id === id || r._id === Number(id));
  
  const [checkedIngredients, setCheckedIngredients] = useState([]);

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

      <div className="no-print" style={{ position: 'fixed', top: '40px', left: '40px', display: 'flex', gap: '15px', zIndex: 99999 }}>
        <button type="button" className="ydt-lux-print-btn fade-in-up" onClick={handlePrint} title="הדפס מתכון" style={{ position: 'relative', top: 0, left: 0 }}>
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
        </button>

        <button type="button" className="ydt-lux-print-btn fade-in-up" onClick={handleShare} title="העתק קישור" style={{ position: 'relative', top: 0, left: 0, animationDelay: '0.2s' }}>
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
        </section>
      </div>
    </div>
  );
};

export default RecipeDetail;