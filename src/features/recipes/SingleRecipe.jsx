
// react-client/src/features/recipes/SingleRecipe.jsx

import { Card, CardMedia, CardContent, Typography } from '@mui/material';

const SingleRecipe = ({ recipe }) => {
  const getImageUrl = () => {
    const rawName = recipe.imageUrl || recipe.image || "";
    if (!rawName) return null;
    const cleanName = rawName.split("/").pop().split("\\").pop();
    
    const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    const RENDER_BACKEND_URL = "https://yhudit-backend-project.onrender.com"; 
    const BASE_URL = isLocalhost ? "http://localhost:5005" : RENDER_BACKEND_URL;

    return `${BASE_URL}/images/${cleanName}`;
  };

  const finalImageUrl = getImageUrl();

  return (
    <Card sx={{ maxWidth: 345, boxShadow: 3, borderRadius: 3, transition: '0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
      {finalImageUrl ? (
        <CardMedia
          component="img"
          height="200"
          image={finalImageUrl}
          alt={recipe.name}
          sx={{ objectFit: 'cover' }}
        />
      ) : (
        <div style={{ height: 200, backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography color="textSecondary" sx={{ fontWeight: 'bold' }}>📸 אין תמונה</Typography>
        </div>
      )}
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" align="center">
          {recipe.name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SingleRecipe;