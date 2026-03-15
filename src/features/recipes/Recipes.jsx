import { useNavigate } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import './Recipes.css';
import {
  Card, CardMedia, CardContent,
  Typography, Box, TextField, CircularProgress
} from '@mui/material';

const breakpointColumnsObj = { default: 5, 1100: 4, 700: 3, 500: 2 };

const SingleRecipe = ({ recipe }) => {
  const navigate = useNavigate();

  const getImageUrl = () => {
    const rawName = recipe.image || recipe.img || recipe.imagUrl || recipe.imageUrl || '';
    if (!rawName) return null;
    const cleanName = rawName.split('/').pop().split('\\').pop();
    return `http://localhost:5005/images/${cleanName}`;
  };

  const imageUrl = getImageUrl();

  return (
    <Card
      onClick={() => navigate(`/recipe/${recipe._id}`)}
      className={!imageUrl ? "shimmer" : ""}
      sx={{ borderRadius: 4, mb: 2, cursor: 'pointer', transition: '0.45s', '&:hover': { transform: 'scale(1.05)' } }}
    >
      {imageUrl ? (
        <CardMedia component="img" height="230" image={imageUrl} sx={{ objectFit: 'cover' }} alt={recipe.name}/>
      ) : (
        <Box sx={{ height: 230, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#ffe8e0', color: '#d35400' }}>
          <Typography fontWeight="bold">אין תמונה 📷</Typography>
        </Box>
      )}
      <CardContent>
        <Typography variant="h6">{recipe.name}</Typography>
      </CardContent>
    </Card>
  );
};

const Recipes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { recipes, loading, error } = useSelector(state => state.recipes || {});
  const safeRecipes = Array.isArray(recipes) ? recipes : [];
  const filteredRecipes = safeRecipes.filter(r => r.name?.toLowerCase().includes(searchTerm.toLowerCase()));

  if (loading) return <Box sx={{ display:'flex', justifyContent:'center', mt:20 }}><CircularProgress /></Box>;

  return (
    <Box sx={{ py:6, px:3, direction:'rtl' }}>
      <Typography variant="h3" textAlign="center" mb={1}>ספר המתכונים 🍳</Typography>

      {error && <Typography color="error" textAlign="center" mb={2}>{typeof error==='string'?error:'שגיאה בטעינת הנתונים'}</Typography>}

      <Box sx={{ maxWidth:'650px', mx:'auto', mb:7 }}>
        <TextField
          fullWidth placeholder="חפשי מתכון..."
          value={searchTerm} onChange={e=>setSearchTerm(e.target.value)}
          sx={{ bgcolor:'white', borderRadius:'50px', '& fieldset':{borderRadius:'50px'} }}
        />
      </Box>

      {filteredRecipes.length>0 ? (
        <Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
          {filteredRecipes.map(recipe => <SingleRecipe key={recipe._id} recipe={recipe} />)}
        </Masonry>
      ) : (
        !error && <Typography textAlign="center">אין מתכונים להצגה.</Typography>
      )}
    </Box>
  );
};

export default Recipes;