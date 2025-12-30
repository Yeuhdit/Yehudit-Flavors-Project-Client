// //src/recipes/Recipes.jsx

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { mockRecipes } from './recipesData.js'; // נשאיר בינתיים את ה-mock

const SingleRecipe = ({ recipe }) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/recipe/${recipe._id}`)}
      sx={{
        maxWidth: 345,
        borderRadius: 4,
        boxShadow: 4,
        overflow: 'hidden',
        transition: 'all 0.3s',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: 8,
        },
      }}
    >
      <CardMedia
        component="img"
        height="220"
        image={recipe.imageUrl}
        alt={recipe.name}
      />
      <CardContent sx={{ textAlign: 'center', pb: 3 }}>
        <Typography variant="h6" fontWeight="bold">
          {recipe.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={1}>
          {recipe.category} • {recipe.difficulty}
        </Typography>
      </CardContent>
    </Card>
  );
};

const Recipes = () => {
  // בינתיים mock – אחר כך נחליף ב-state.recipes.allRecipes
  const recipes = mockRecipes;

  return (
    <Box sx={{ py: 6, px: 4 }}>
      <Typography variant="h4" textAlign="center" mb={6} fontWeight="bold">
        כל המתכונים
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
            xl: 'repeat(5, 1fr)',
          },
          gap: 4,
          maxWidth: '1400px',
          mx: 'auto',
        }}
      >
        {recipes.map((recipe) => (
          <SingleRecipe key={recipe._id} recipe={recipe} />
        ))}
      </Box>
    </Box>
  );
};

export default Recipes;