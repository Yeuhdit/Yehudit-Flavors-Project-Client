//react-server/src/features/recipes/Recipes.jsx
import { useNavigate } from "react-router-dom";
import Masonry from "react-masonry-css";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./Recipes.css";

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  TextField,
  CircularProgress
} from "@mui/material";

const breakpointColumnsObj = {
  default: 5,
  1400: 4,
  1100: 3,
  700: 2,
  500: 1
};

// פונקציה לקבלת URL תמונה
const getImageUrl = (recipe) => {
  const rawName = recipe.image || recipe.img || recipe.imagUrl || recipe.imageUrl || "";
  if (!rawName) return null;
  const cleanName = rawName.split("/").pop().split("\\").pop();
  return `http://localhost:5005/images/${cleanName}`;
};

// דפוס זיגזג לגובה
const getZigzagHeight = (index) => {
  const heights = [300, 180, 250, 200]; // דפוס חוזר
  return heights[index % heights.length];
};

// רכיב מתכון יחיד
const SingleRecipe = ({ recipe, index }) => {
  const navigate = useNavigate();
  const imageUrl = getImageUrl(recipe);
  const height = getZigzagHeight(index);

  return (
    <Card onClick={() => navigate(`/recipe/${recipe._id}`)} className="recipe-card">
      <div className="image-wrapper">
        {imageUrl ? (
          <CardMedia
            component="img"
            image={imageUrl}
            alt={recipe.name}
            className="recipe-image"
            style={{ height }}
          />
        ) : (
          <Box className="no-image" style={{ height }}>
            <Typography>אין תמונה 📷</Typography>
          </Box>
        )}

        <div className="overlay">
          <span>👀 צפייה במתכון</span>
        </div>
      </div>

      <CardContent className="recipe-content">
        <Typography className="recipe-title">{recipe.name}</Typography>
      </CardContent>
    </Card>
  );
};

// דף Recipes
const Recipes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { recipes, loading, error } = useSelector(state => state.recipes || {});
  const safeRecipes = Array.isArray(recipes) ? recipes : [];

  const filteredRecipes = safeRecipes.filter(r =>
    r.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading)
    return (
      <Box className="loading">
        <CircularProgress />
      </Box>
    );

  return (
    <Box className="recipes-page">
      <Typography className="page-title">ספר המתכונים 🍳</Typography>

      {error && (
        <Typography className="error">
          {typeof error === "string" ? error : "שגיאה בטעינת הנתונים"}
        </Typography>
      )}

      <Box className="search-box">
        <TextField
          fullWidth
          placeholder="חפש מתכון..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </Box>

      {filteredRecipes.length > 0 ? (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="masonry-grid"
          columnClassName="masonry-column"
        >
          {filteredRecipes.map((recipe, index) => (
            <SingleRecipe key={recipe._id} recipe={recipe} index={index} />
          ))}
        </Masonry>
      ) : (
        !error && <Typography className="empty">אין מתכונים להצגה</Typography>
      )}
    </Box>
  );
};

export default Recipes;