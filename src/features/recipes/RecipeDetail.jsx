// react-client/src/features/recipes/RecipeDetail.jsx

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import "./RecipeDetail.css";
import { CircularProgress } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

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

  const getImageUrl = () => {
    if (!recipe) return null;

    const rawName = recipe.image || recipe.img || recipe.imagUrl || recipe.imageUrl || "";

    // אם אין תמונה, מחזירים null ולא מחפשים באינטרנט!
    if (!rawName) return null;

    const cleanName = rawName.split("/").pop().split("\\").pop();

    // פונים אך ורק לשרת האמיתי שלך
    return `http://localhost:5005/images/${cleanName}`;
  };

  if (!recipe) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
        <CircularProgress />
      </div>
    );
  }

  const bgImage = getImageUrl();

  return (
    <div className="yehudit-recipe-container">
      
      <div
        className="yehudit-hero-banner"
        // מציגים רקע עדין במקום תמונה שבורה אם לא העלית תמונה
        style={{ 
          backgroundImage: bgImage ? `url(${bgImage})` : 'none',
          backgroundColor: bgImage ? 'transparent' : '#ffe8e0'
        }}
      >
        <div className="yehudit-hero-overlay">
          <h1 className="yehudit-recipe-title">{recipe.name}</h1>

          <p className="yehudit-recipe-subtitle">
            {recipe.servings ? `מס' מנות: ${recipe.servings}` : "מושלם לכל המשפחה"}
          </p>

          <div className="yehudit-chips">
            {recipe.category && (
              <span className="yehudit-chip">{recipe.category}</span>
            )}

            {recipe.preparationTime && (
              <span className="yehudit-chip">
                {recipe.preparationTime} דקות
              </span>
            )}

            {recipe.difficulty && (
              <span className="yehudit-chip">{recipe.difficulty}</span>
            )}
          </div>
        </div>
      </div>

      <div className="yehudit-content-area">
        
        {recipe.ingredients && recipe.ingredients.length > 0 && (
          <div>
            <h2 className="yehudit-section-title">אז מה צריך בשביל להתחיל?</h2>

            <ul className="yehudit-list">
              {recipe.ingredients.map((ing, i) => (
                <li
                  key={i}
                  onClick={() => toggleIngredient(i)}
                  className={`yehudit-list-item ${
                    checkedIngredients.includes(i) ? "checked" : ""
                  }`}
                >
                  <CheckIcon className="yehudit-check-icon" />
                  <span>{ing}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {recipe.instructions && recipe.instructions.length > 0 && (
          <div>
            <h2 className="yehudit-section-title">איך מכינים?</h2>

            <ul className="yehudit-list">
              {recipe.instructions.map((step, i) => (
                <li key={i} className="yehudit-list-item">
                  <span className="yehudit-step-number">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="yehudit-footer">בתיאבון!</div>
      </div>
    </div>
  );
};

export default RecipeDetail;