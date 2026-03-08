import { useNavigate } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Recipes.css';

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  TextField,
  CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const breakpointColumnsObj = {
  default: 5,
  1100: 4,
  700: 3,
  500: 2,
};

const SingleRecipe = ({ recipe }) => {
  const navigate = useNavigate();
  
  const getImageUrl = () => {
    const rawName = recipe.image || recipe.img || recipe.imageUrl || '';
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
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        console.log("Calling server: http://localhost:5000/api/recipes/getallrecipes");
        const response = await axios.get('http://localhost:5000/api/recipes/getallrecipes');
        
        console.log("Server response data:", response.data);

        // בדיקה: האם הנתונים הם מערך? אם לא, אולי הם בתוך response.data.recipes?
        const data = Array.isArray(response.data) ? response.data : (response.data.recipes || []);
        
        setRecipes(data);
        if (data.length === 0) setErrorMsg("השרת ענה, אבל רשימת המתכונים ריקה ב-Database");
      } catch (error) {
        console.error("Axios Error:", error);
        setErrorMsg("שגיאה בתקשורת: השרת לא מצא את הנתיב (404)");
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 20 }}><CircularProgress /></Box>;

  return (
    <Box sx={{ py: 6, px: 3, direction: 'rtl' }}>
      <Typography variant="h3" textAlign="center" mb={1} fontWeight="bold">ספר המתכונים 🍳</Typography>
      
      {errorMsg && <Typography color="error" textAlign="center" mb={2}>{errorMsg}</Typography>}

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
        !errorMsg && <Typography textAlign="center">אין מתכונים להצגה.</Typography>
      )}
    </Box>
  );
};

export default Recipes;