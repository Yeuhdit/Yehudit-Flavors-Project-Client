import { useNavigate } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import './Recipes.css';

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  TextField,
  CircularProgress
} from '@mui/material';

const breakpointColumnsObj = {
  default: 5,
  1100: 4,
  700: 3,
  500: 2,
};

const SingleRecipe = ({ recipe }) => {
  const navigate = useNavigate();
  
  const getImageUrl = () => {
    const rawName = recipe.image || recipe.img || recipe.imagUrl || recipe.imageUrl || '';
    if (!rawName) return 'https://via.placeholder.com/300?text=No+Image';
    const cleanName = rawName.split('/').pop().split('\\').pop();
    return `http://localhost:5000/images/${cleanName}`;
  };

  return (
    <Card
      onClick={() => navigate(`/recipe/${recipe._id}`)}
      sx={{ borderRadius: 4, boxShadow: 3, cursor: 'pointer', mb: 2 }}
    >
      <CardMedia
        component="img"
        height="230"
        image={getImageUrl()}
        sx={{ objectFit: 'cover' }}
        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500'; }}
      />
      <CardContent sx={{ textAlign: 'right' }}>
        <Typography variant="h6" fontWeight="bold">{recipe.name}</Typography>
      </CardContent>
    </Card>
  );
};

const Recipes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const { recipes, loading, error } = useSelector((state) => state.recipes || {});

  const safeRecipes = Array.isArray(recipes) ? recipes : [];

  const filteredRecipes = safeRecipes.filter((recipe) =>
    recipe.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 20 }}><CircularProgress /></Box>;

  return (
    <Box sx={{ py: 6, px: 3, direction: 'rtl' }}>
      <Typography variant="h3" textAlign="center" mb={1} fontWeight="bold">ספר המתכונים 🍳</Typography>
      
      {error && <Typography color="error" textAlign="center" mb={2}>{typeof error === 'string' ? error : 'שגיאה בטעינת הנתונים'}</Typography>}

      <Box sx={{ maxWidth: '600px', mx: 'auto', mb: 7 }}>
        <TextField
          fullWidth
          placeholder="חפשי מתכון..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ bgcolor: 'white', borderRadius: '30px', '& fieldset': { borderRadius: '30px' } }}
        />
      </Box>

      {filteredRecipes.length > 0 ? (
        <Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
          {filteredRecipes.map((recipe) => <SingleRecipe key={recipe._id} recipe={recipe} />)}
        </Masonry>
      ) : (
        !error && <Typography textAlign="center">אין מתכונים להצגה.</Typography>
      )}
    </Box>
  );
};

export default Recipes;