import { useParams } from 'react-router-dom';
import { mockRecipes } from './recipesData.js'; // חשוב – אותו קובץ עם כל 35!
import { Box, Typography, Chip, Divider, List, ListItem, ListItemText, Paper } from '@mui/material';

const RecipeDetail = () => {
  const { id } = useParams(); // לוקח את ה-ID מה-URL (כמו /recipe/5)
  const recipe = mockRecipes.find((r) => r._id === id); // מושך את המתכון הנכון!

  if (!recipe) {
    return (
      <Typography textAlign="center" variant="h5" mt={10}>
        מתכון לא נמצא 😔
      </Typography>
    );
  }

  return (
    <Box sx={{ maxWidth: '1000px', mx: 'auto', py: 6, px: 4 }}>
      {/* תמונה גדולה */}
      <Paper elevation={8} sx={{ borderRadius: 4, overflow: 'hidden', mb: 5 }}>
        <img
          src={recipe.imageUrl}
          alt={recipe.name}
          style={{ width: '100%', height: '450px', objectFit: 'cover' }}
        />
      </Paper>

      {/* כותרת */}
      <Typography variant="h3" textAlign="center" mb={3} fontWeight="bold">
        {recipe.name}
      </Typography>

      {/* צ'יפים */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 5, flexWrap: 'wrap' }}>
        <Chip label={recipe.category} color="primary" />
        <Chip label={recipe.difficulty} color="secondary" />
        <Chip label={`הכנה: ${recipe.prepTime}`} />
        <Chip label={`בישול: ${recipe.cookTime}`} />
        <Chip label={`מנות: ${recipe.servings}`} />
      </Box>

      <Divider sx={{ my: 5 }} />

      {/* מצרכים */}
      <Typography variant="h4" mb={3} fontWeight="bold">
        מצרכים
      </Typography>
      <List>
        {recipe.ingredients.map((ing, i) => (
          <ListItem key={i}>
            <ListItemText primary={`• ${ing}`} sx={{ fontSize: '1.1rem' }} />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 5 }} />

      {/* הוראות */}
      <Typography variant="h4" mb={3} fontWeight="bold">
        הוראות הכנה
      </Typography>
      <List>
        {recipe.instructions.map((step, i) => (
          <ListItem key={i}>
            <ListItemText primary={`${i + 1}. ${step}`} sx={{ fontSize: '1.1rem' }} />
          </ListItem>
        ))}
      </List>

      {/* בתאבון חמוד */}
      <Box sx={{ textAlign: 'center', my: 8 }}>
        <Typography variant="h3" fontWeight="bold" color="error.main" sx={{ fontFamily: 'cursive' }}>
          בתאבון!!! 🍴✨😋
        </Typography>
      </Box>
    </Box>
  );
};

export default RecipeDetail;