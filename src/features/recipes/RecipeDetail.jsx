// src/features/recipes/RecipeDetail.jsx
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './RecipeDetail.css'; 
import { CircularProgress } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const RecipeDetail = () => {
  const { id } = useParams();
  const { recipes } = useSelector((state) => state.recipes); 
  const recipe = recipes.find((r) => r._id === id || r._id === Number(id));

  const getImageUrl = () => {
    if (!recipe) return '';
    const rawName = recipe.image || recipe.img || recipe.imageUrl || '';
    if (!rawName) return 'https://images.unsplash.com/photo-1495195134817-a169d2679f03?w=1600';
    
    const cleanName = rawName.split('/').pop().split('\\').pop();
    return `http://localhost:5000/images/${cleanName}`;
  };

  if (!recipe) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="yael-recipe-container">
      
      {/* אזור הבאנר בדיוק כמו בתמונה */}
      <div className="yael-hero-banner" style={{ backgroundImage: `url(${getImageUrl()})` }}>
        <div className="yael-hero-overlay">
          <h1 className="yael-recipe-title">{recipe.name}</h1>
          
          <p className="yael-recipe-subtitle">
            {recipe.servings ? `מס' מנות: ${recipe.servings}` : 'מושלם לכל המשפחה'}
          </p>

          <div className="yael-chips">
            {recipe.category && <span className="yael-chip">{recipe.category}</span>}
            {recipe.preparationTime && <span className="yael-chip">{recipe.preparationTime} דקות</span>}
            {recipe.difficulty && <span className="yael-chip">{recipe.difficulty}</span>}
          </div>
        </div>
      </div>

      {/* אזור התוכן הלבן והנקי */}
      <div className="yael-content-area">
        
        {/* מצרכים */}
        {recipe.ingredients && recipe.ingredients.length > 0 && (
          <div>
            <h2 className="yael-section-title">אז מה צריך בשביל להתחיל?</h2>
            <ul className="yael-list">
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className="yael-list-item">
                  <CheckIcon className="yael-check-icon" />
                  <span>{ing}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* הוראות הכנה */}
        {recipe.instructions && recipe.instructions.length > 0 && (
          <div>
            <h2 className="yael-section-title">איך מכינים?</h2>
            <ul className="yael-list">
              {recipe.instructions.map((step, i) => (
                <li key={i} className="yael-list-item">
                  <span className="yael-step-number">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="clean-footer">
          בתיאבון!
        </div>

      </div>
    </div>
  );
};

export default RecipeDetail;