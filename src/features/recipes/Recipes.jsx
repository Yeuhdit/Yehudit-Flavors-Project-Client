// // //src/recipes/Recipes.jsx

// import './Recipes.css';

// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
// import { mockRecipes } from './recipesData.js'; // נשאיר בינתיים את ה-mock

// const SingleRecipe = ({ recipe }) => {
//   const navigate = useNavigate();

//   return (
//     <Card
//       onClick={() => navigate(`/recipe/${recipe._id}`)}
//       sx={{
//         maxWidth: 345,
//         borderRadius: 4,
//         boxShadow: 4,
//         overflow: 'hidden',
//         transition: 'all 0.3s',
//         cursor: 'pointer',
//         '&:hover': {
//           transform: 'translateY(-8px)',
//           boxShadow: 8,
//         },
//       }}
//     >
//       <CardMedia
//         component="img"
//         height="220"
//         image={recipe.imageUrl}
//         alt={recipe.name}
//       />
//       <CardContent sx={{ textAlign: 'center', pb: 3 }}>
//         <Typography variant="h6" fontWeight="bold">
//           {recipe.name}
//         </Typography>
//         <Typography variant="body2" color="text.secondary" mt={1}>
//           {recipe.category} • {recipe.difficulty}
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// };

// const Recipes = () => {
//   // בינתיים mock – אחר כך נחליף ב-state.recipes.allRecipes
//   const recipes = mockRecipes;

//   return (
//     <Box sx={{ py: 6, px: 4 }}>
//       <Typography variant="h4" textAlign="center" mb={6} fontWeight="bold">
//         כל המתכונים
//       </Typography>

//       <Box
//         sx={{
//           display: 'grid',
//           gridTemplateColumns: {
//             xs: '1fr',
//             sm: 'repeat(2, 1fr)',
//             md: 'repeat(3, 1fr)',
//             lg: 'repeat(4, 1fr)',
//             xl: 'repeat(5, 1fr)',
//           },
//           gap: 4,
//           maxWidth: '1400px',
//           mx: 'auto',
//         }}
//       >
//         {recipes.map((recipe) => (
//           <SingleRecipe key={recipe._id} recipe={recipe} />
//         ))}
//       </Box>
//     </Box>
//   );
// };

// export default Recipes;
import { useNavigate } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import { useState } from 'react';
import './Recipes.css';

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { mockRecipes } from './recipesData.js';

const breakpointColumnsObj = {
  default: 5,
  1100: 4,
  700: 3,
  500: 2,
};

const SingleRecipe = ({ recipe }) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/recipe/${recipe._id}`)}
      sx={{
        borderRadius: 4,
        boxShadow: 4,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: '0.3s',
        '&:hover': { transform: 'translateY(-10px)', boxShadow: 10 },
        mb: 2,
      }}
    >
      <CardMedia
        component="img"
        height={recipe.cardHeight || '280px'}
        image={recipe.imageUrl}
        alt={recipe.name}
        sx={{ objectFit: 'cover' }}
        loading="lazy"
      />
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant="h6" fontWeight="bold">
          {recipe.name}
        </Typography>
        <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center', gap: 1 }}>
          <Chip label={recipe.category} size="small" />
          <Chip label={recipe.difficulty} size="small" color="secondary" />
        </Box>
      </CardContent>
    </Card>
  );
};

const Recipes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');

  const filteredRecipes = mockRecipes.filter((recipe) => {
    const matchesSearch = recipe.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === '' || recipe.category === selectedCategory;
    const matchesDifficulty =
      selectedDifficulty === '' || recipe.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <Box sx={{ py: 6, px: 4 }}>
      <Typography variant="h4" textAlign="center" mb={6} fontWeight="bold">
        כל המתכונים
      </Typography>

      {/* חיפוש + פילטרים – בדיוק כמו אצל יעל */}
      <Box sx={{ maxWidth: '800px', mx: 'auto', mb: 6 }}>
        <TextField
          fullWidth
          placeholder="מה תרצו להכין היום?"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            mb: 4,
            '& .MuiOutlinedInput-root': {
              borderRadius: '50px',
              backgroundColor: 'white',
              boxShadow: 3,
            },
          }}
          InputProps={{
            endAdornment: <SearchIcon />,
          }}
        />

        {/* פילטר קטגוריה */}
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap', mb: 3 }}>
          {['', 'חלבי', 'בשרי', 'פרווה'].map((cat) => (
            <Chip
              key={cat || 'all'}
              label={cat || 'כל הקטגוריות'}
              clickable
              color={selectedCategory === cat ? 'primary' : 'default'}
              onClick={() => setSelectedCategory(cat)}
              sx={{ fontWeight: 'bold' }}
            />
          ))}
        </Box>

        {/* פילטר קושי */}
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
          {['', 'קל', 'בינוני', 'קשה'].map((diff) => (
            <Chip
              key={diff || 'all'}
              label={diff || 'כל הרמות'}
              clickable
              color={selectedDifficulty === diff ? 'secondary' : 'default'}
              onClick={() => setSelectedDifficulty(diff)}
              sx={{ fontWeight: 'bold' }}
            />
          ))}
        </Box>
      </Box>

      {/* Masonry עם המתכונים המסוננים */}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {filteredRecipes.map((recipe) => (
          <SingleRecipe key={recipe._id} recipe={recipe} />
        ))}
      </Masonry>

      {filteredRecipes.length === 0 && (
        <Typography textAlign="center" variant="h6" color="text.secondary" mt={8}>
          לא נמצאו מתכונים תואמים 😔<br />
          נסי חיפוש או פילטר אחר
        </Typography>
      )}
    </Box>
  );
};

export default Recipes;