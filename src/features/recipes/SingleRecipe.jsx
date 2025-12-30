//src/features/recipes/SingleRecipe.jsx
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

const SingleRecipe = ({ recipe }) => {
  return (
    <Card sx={{ maxWidth: 345, boxShadow: 3, borderRadius: 3, transition: '0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
      <CardMedia
        component="img"
        height="200"
        image={recipe.imageUrl}
        alt={recipe.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" align="center">
          {recipe.name}
        </Typography>
        {/* בעתיד נוסיף כאן קטגוריה, קושי, זמן וכו' */}
      </CardContent>
    </Card>
  );
};

export default SingleRecipe;