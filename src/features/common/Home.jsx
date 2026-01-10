

import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { mockRecipes } from '../recipes/recipesData.js';
import { Card, CardMedia, CardContent, Chip } from '@mui/material';
import hopenProject from '../../assets/images/hopen_project.jpg'; // התמונה הצבעונית המדהימה שלך!!

const Home = () => {
  const navigate = useNavigate();

  // מתכונים אקראיים – כל פעם הפתעה טעימה!
  const featuredRecipes = [...mockRecipes].sort(() => 0.5 - Math.random()).slice(0, 8);

  const SingleFeatured = ({ recipe, index }) => (
    <motion.div
      initial={{ opacity: 0, rotateY: -90 }}
      whileInView={{ opacity: 1, rotateY: 0 }}
      transition={{ delay: index * 0.12, duration: 0.9, ease: 'easeOut' }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.1, rotateY: 10, boxShadow: '0 30px 60px rgba(255,107,53,0.4)' }}
    >
      <Card
        onClick={() => navigate(`/recipe/${recipe._id}`)}
        sx={{
          borderRadius: '32px',
          overflow: 'hidden',
          boxShadow: '0 20px 50px rgba(255,107,53,0.3)',
          cursor: 'pointer',
          background: 'linear-gradient(to bottom, #fff, #fff5f0)',
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="320"
            image={recipe.imageUrl}
            alt={recipe.name}
            sx={{
              objectFit: 'cover',
              transition: '0.7s',
              '&:hover': { transform: 'scale(1.2) rotate(3deg)' },
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 20,
              right: 20,
              background: 'linear-gradient(45deg, #ff6b35, #f50057)',
              color: 'white',
              px: 3.5,
              py: 1.5,
              borderRadius: '40px',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              boxShadow: '0 10px 25px rgba(245,0,87,0.5)',
            }}
          >
            חם ומגרה! 🔥
          </Box>
        </Box>
        <CardContent sx={{ textAlign: 'center', py: 5 }}>
          <Typography variant="h5" fontWeight="bold" color="#f50057">
            {recipe.name}
          </Typography>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Chip label={recipe.category} sx={{ background: '#ff6b35', color: 'white', fontWeight: 'bold', fontSize: '1rem' }} />
            <Chip label={recipe.difficulty} sx={{ background: '#ff4081', color: 'white', fontWeight: 'bold', fontSize: '1rem' }} />
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <>
      {/* HERO מטורף – עם התמונה שלך + גרדיאנט חם ומגרה */}
      <Box
        sx={{
          minHeight: '100vh',
          backgroundImage: `url(${hopenProject})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, rgba(255,107,53,0.75) 0%, rgba(245,0,87,0.85) 40%, rgba(255,64,129,0.75) 100%)',
          },
        }}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, type: 'spring', stiffness: 100 }}
        >
          <Typography variant="h1" fontWeight="bold" color="white" sx={{ fontSize: { xs: '4rem', md: '8rem' }, textShadow: '0 10px 30px rgba(0,0,0,0.7)' }}>
            טעמים שמכורים! 🍲💥
          </Typography>
        </motion.div>

        <motion.div
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 1.2 }}
        >
          <Typography variant="h4" color="white" sx={{ mt: 5, mb: 10, maxWidth: '1000px', fontWeight: '300', textShadow: '0 5px 20px rgba(0,0,0,0.6)' }}>
            מאות מתכונים צבעוניים, טריים וטעימים בטירוף – הכל כאן כדי להפוך את המטבח שלך למסיבה! 🥕🍅🍓
          </Typography>
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.2, duration: 1, type: 'spring', stiffness: 150 }}
          whileHover={{ scale: 1.2, rotate: 5 }}
        >
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/recipes')}
            sx={{
              background: 'linear-gradient(45deg, #ff6b35, #f50057)',
              color: 'white',
              px: 14,
              py: 4,
              fontSize: '2.2rem',
              borderRadius: '70px',
              fontWeight: 'bold',
              boxShadow: '0 25px 60px rgba(245,0,87,0.6)',
              '&:hover': { background: 'linear-gradient(45deg, #f50057, #ff4081)', transform: 'scale(1.15)' },
            }}
          >
            בואי נבשל משהו מטורף! 🚀
          </Button>
        </motion.div>
      </Box>

      {/* מתכונים מומלצים – חמים ומגרים */}
      <Box sx={{ py: 18, px: 4, background: 'linear-gradient(to bottom, #fff5f0, #ffe8e0)' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <Typography variant="h3" textAlign="center" mb={12} fontWeight="bold" color="#f50057">
            המתכונים שהכי מכורים עכשיו! 😍🔥
          </Typography>
        </motion.div>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' },
            gap: 8,
            maxWidth: '1700px',
            mx: 'auto',
          }}
        >
          {featuredRecipes.map((recipe, index) => (
            <SingleFeatured key={recipe._id} recipe={recipe} index={index} />
          ))}
        </Box>

        <Box textAlign="center" mt={14}>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/recipes')}
            sx={{
              borderColor: '#ff6b35',
              color: '#ff6b35',
              borderRadius: '70px',
              px: 14,
              py: 4,
              fontSize: '1.8rem',
              fontWeight: 'bold',
              '&:hover': { background: '#ff6b35', color: 'white' },
            }}
          >
            עוד טעמים מדהימים →
          </Button>
        </Box>
      </Box>

      {/* סקשן התחברות – חם ומזמין */}
      <Box sx={{ py: 16, textAlign: 'center', background: 'linear-gradient(135deg, #ff6b35, #f50057)', color: 'white' }}>
        <Typography variant="h3" fontWeight="bold" mb={5}>
          רוצה לשמור את המתכונים האהובים עלייך? ❤️
        </Typography>
        <Typography variant="h5" mb={8}>
          הירשמי עכשיו ותקבלי גישה מלאה – חינם!
        </Typography>
        <Box sx={{ display: 'flex', gap: 5, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/login')}
            sx={{
              background: 'white',
              color: '#f50057',
              px: 10,
              py: 3,
              borderRadius: '60px',
              fontWeight: 'bold',
              boxShadow: '0 15px 40px rgba(245,0,87,0.5)',
              '&:hover': { background: '#ffe0e0' },
            }}
          >
            התחברות
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/register')}
            sx={{
              borderColor: 'white',
              color: 'white',
              px: 10,
              py: 3,
              borderRadius: '60px',
              fontWeight: 'bold',
              '&:hover': { background: 'white', color: '#f50057' },
            }}
          >
            הרשמה עכשיו
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Home;