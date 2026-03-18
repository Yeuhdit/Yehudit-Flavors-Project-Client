
// react-client/src/features/recipes/RecipeDetail.jsx

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import "./RecipeDetail.css";
import { CircularProgress } from "@mui/material";

const RecipeDetail = () => {
  const { id } = useParams();
  const { recipes } = useSelector((state) => state.recipes);

  const recipe = recipes.find((r) => r._id === id || r._id === Number(id));

  const [checkedIngredients, setCheckedIngredients] = useState([]);

  const toggleIngredient = (index) => {
    setCheckedIngredients((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  // התיקון כאן: משיכת התמונה מכתובת השרת המדויקת
  const getImageUrl = () => {
    if (!recipe) return null;
    const rawName = recipe.imageUrl || recipe.image || recipe.img || recipe.imagUrl || "";
    if (!rawName) return null;
    const cleanName = rawName.split("/").pop().split("\\").pop();
    return `http://localhost:5005/images/${cleanName}`;
  };

  const handlePrint = (e) => {
    e.preventDefault(); 
    setTimeout(() => {
      window.print();
    }, 150); 
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

      <button 
        type="button"
        className="ydt-lux-print-btn fade-in-up" 
        style={{ animationDelay: '0.8s' }} 
        onClick={handlePrint} 
        title="הדפס מתכון"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none">
          <polyline points="6 9 6 2 18 2 18 9"></polyline>
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
          <rect x="6" y="14" width="12" height="8"></rect>
        </svg>
      </button>

      <div className="ydt-lux-container fade-in-up" style={{ animationDelay: '0.1s' }}>
        
        <section className="ydt-lux-hero">
          <div className="ydt-lux-image-wrapper fade-in-up" style={{ animationDelay: '0.2s' }}>
            {bgImage ? (
              <img src={bgImage} alt={recipe.name} className="ydt-lux-image" />
            ) : (
              <div className="ydt-lux-image-placeholder"></div>
            )}
          </div>
          
          <div className="ydt-lux-title-area fade-in-up" style={{ animationDelay: '0.3s' }}>
            <h1 className="ydt-lux-title">
              {recipe.name.split(' ').map((word, index) => (
                <span key={index} className={index === 0 ? "highlight-word" : ""}>
                  {word}{" "}
                </span>
              ))}
            </h1>
            <div className="ydt-lux-meta">
              {recipe.category && <span className="lux-tag">{recipe.category}</span>}
              {recipe.preparationTime && <span className="lux-tag">{recipe.preparationTime} דקות</span>}
              {recipe.difficulty && <span className="lux-tag">{recipe.difficulty}</span>}
              {recipe.servings && <span className="lux-tag">{recipe.servings} מנות</span>}
            </div>
            <p className="ydt-lux-subtitle">
              רכיבים מדויקים ושלבים ברורים ליצירת מנה בלתי נשכחת. קחו את הזמן, תיהנו מהתהליך.
            </p>
          </div>
        </section>

        <section className="ydt-lux-content">
          
          <div className="ydt-lux-ingredients fade-in-up" style={{ animationDelay: '0.4s' }}>
            <h2 className="ydt-lux-heading">מה נצטרך?</h2>
            <div className="ydt-lux-ingredients-list">
              {recipe.ingredients?.map((ing, i) => {
                const isChecked = checkedIngredients.includes(i);
                return (
                  <div
                    key={i}
                    onClick={() => toggleIngredient(i)}
                    className={`ydt-lux-ingredient-item ${isChecked ? "checked" : ""}`}
                    style={{ animationDelay: `${0.4 + (i * 0.05)}s` }}
                  >
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