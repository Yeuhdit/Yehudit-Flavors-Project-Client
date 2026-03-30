
// react-client/src/features/recipes/Favorites.jsx
import { useNavigate } from "react-router-dom";
import Masonry from "react-masonry-css";
import { useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Chip } from "@mui/material";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import LocalDiningRoundedIcon from '@mui/icons-material/LocalDiningRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { AuthContext } from "../../context/AuthContext";
import { deleteRecipe } from "./recipeSlice";
import ScrollReveal from "../../components/ScrollReveal";
import "./Recipes.css";

const breakpointColumnsObj = { default: 4, 1400: 4, 1100: 3, 700: 2, 500: 1 };

const getImageUrl = (recipe) => {
  const rawName = recipe.imageUrl || recipe.image || recipe.img || recipe.imagUrl || "";
  if (!rawName) return null;
  const cleanName = rawName.split("/").pop().split("\\").pop();
  const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
  const RENDER_BACKEND_URL = "https://yhudit-backend-project.onrender.com";
  const BASE_URL = isLocalhost ? "http://localhost:5005" : RENDER_BACKEND_URL;
  return `${BASE_URL}/images/${cleanName}`;
};

const SingleRecipeCard = ({ recipe }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);
  const imageUrl = getImageUrl(recipe);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const isOwnerOrAdmin = user && (user.role === 'admin' || user._id === recipe.user?._id);

  const handleDeleteClick = (e) => { e.stopPropagation(); setOpenDeleteDialog(true); };
  const handleCancelDelete = (e) => { e.stopPropagation(); setOpenDeleteDialog(false); };
  const handleConfirmDelete = (e) => { e.stopPropagation(); dispatch(deleteRecipe(recipe._id)); setOpenDeleteDialog(false); };
  const handleEdit = (e) => { e.stopPropagation(); navigate(`/edit-recipe/${recipe._id}`); };

  return (
    <>
      <div className="modern-recipe-card fade-in" onClick={() => navigate(`/recipe/${recipe._id}`)}>
        <div className="card-image-container">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={recipe.name}
              className="card-image"
              loading="lazy"
            />
          ) : (
            <div className="card-no-image"><span>אין תמונה 📷</span></div>
          )}
          <div className="card-overlay"><span className="overlay-text">צפייה במתכון <ArrowBackRoundedIcon fontSize="small"/></span></div>
        </div>
        <div className="card-content">
          <h3 className="card-title">{recipe.name}</h3>
          <div className="card-meta">
            {recipe.preparationTime && (
              <Chip
                icon={<AccessTimeRoundedIcon style={{ fontSize: '1rem', color: '#ff7e5f' }}/>}
                label={`${recipe.preparationTime} דק'`}
                size="small"
                className="meta-chip primary-chip"
              />
            )}
            {recipe.difficulty && (
              <Chip
                icon={<LocalDiningRoundedIcon style={{ fontSize: '1rem', color: '#666' }}/>}
                label={recipe.difficulty === 'easy' ? 'קל' : recipe.difficulty === 'medium' ? 'בינוני' : 'קשה'}
                size="small"
                variant="outlined"
                className="meta-chip secondary-chip"
              />
            )}
          </div>
          {isOwnerOrAdmin && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', borderTop: '1px solid #f0f0f0', paddingTop: '12px' }}>
                  <IconButton onClick={handleEdit} style={{ color: '#555' }} title="עריכה"><EditRoundedIcon /></IconButton>
                  <IconButton onClick={handleDeleteClick} style={{ color: '#e74c3c' }} title="מחיקה"><DeleteRoundedIcon /></IconButton>
              </div>
          )}
        </div>
      </div>
      <Dialog open={openDeleteDialog} onClose={handleCancelDelete} onClick={(e) => e.stopPropagation()} PaperProps={{ sx: { borderRadius: '24px', padding: '10px', direction: 'rtl' } }}>
        <DialogTitle sx={{ fontWeight: 'bold', color: '#1a1a1a' }}>מחיקת מתכון</DialogTitle>
        <DialogContent><DialogContentText sx={{ fontSize: '1.1rem', color: '#666' }}>האם את בטוחה שברצונך למחוק את המתכון "{recipe.name}" לצמיתות?<br/>לא יהיה ניתן לשחזר פעולה זו.</DialogContentText></DialogContent>
        <DialogActions sx={{ padding: '0 24px 16px 24px', gap: '12px' }}>
          <Button onClick={handleCancelDelete} sx={{ color: '#666', fontWeight: 'bold' }}>ביטול</Button>
          <Button onClick={handleConfirmDelete} variant="contained" sx={{ backgroundColor: '#e74c3c', borderRadius: '12px', boxShadow: 'none', '&:hover': { backgroundColor: '#c0392b', boxShadow: 'none' } }}>מחק מתכון</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const Favorites = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const { recipes, loading, error } = useSelector(state => state.recipes || {});
  const safeRecipes = Array.isArray(recipes) ? recipes : [];

  // הסינון החשוב: מציג רק מתכונים שמערך ה-likes שלהם מכיל את מזהה המשתמש!
  const favoriteRecipes = safeRecipes.filter(r => r.likes && r.likes.includes(user?._id));
  const filteredRecipes = favoriteRecipes.filter(r => r.name?.toLowerCase().includes(searchTerm.toLowerCase()));

  if (loading) return <div className="page-loader"><CircularProgress sx={{ color: '#ff7e5f' }} size={60} thickness={4} /></div>;

  if (!user) {
    return (
        <div className="empty-state-modern fade-in" style={{ marginTop: '100px' }}>
            <div className="empty-illustration">🔒</div>
            <h2>יש להתחבר כדי לצפות במועדפים שלך</h2>
            <Button variant="contained" sx={{ mt: 3, backgroundColor: '#ff7e5f', borderRadius: '50px' }} onClick={() => navigate('/login')}>מעבר להתחברות</Button>
        </div>
    );
  }

  return (
    <div className="recipes-wrapper" dir="rtl">
      <div className="ambient-background">
        <div className="glow-orb orb-primary"></div>
        <div className="glow-orb orb-secondary"></div>
      </div>
      <div className="recipes-container">
        <header className="recipes-header fade-in">
          <h1 className="super-title">המועדפים <span className="text-highlight">שלי.</span></h1>
          <p style={{ color: '#666', fontSize: '1.2rem', marginTop: '10px' }}>
            כל המתכונים שאהבת ושמרת במקום אחד ❤️
          </p>
          <div className="search-glass-container">
            <SearchRoundedIcon className="search-icon" />
            <input type="text" className="search-glass-input" placeholder="חיפוש במועדפים..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
        </header>

        {error && <div className="error-message fade-in">{typeof error === "string" ? error : "שגיאה בטעינת הנתונים"}</div>}

        {filteredRecipes.length > 0 ? (
          <div className="fade-in delay-1">
            <Masonry breakpointCols={breakpointColumnsObj} className="masonry-grid" columnClassName="masonry-column">
              {filteredRecipes.map((recipe) => (
                <ScrollReveal key={recipe._id}>
                  <SingleRecipeCard recipe={recipe} />
                </ScrollReveal>
              ))}
            </Masonry>
          </div>
        ) : (
          !error && (
            <div className="empty-state-modern fade-in delay-1">
              <div className="empty-illustration" style={{ color: '#ff7e5f' }}><FavoriteRoundedIcon sx={{ fontSize: 80 }} /></div>
              {searchTerm ? <h2>לא מצאנו מתכון כזה במועדפים 🧐</h2> : <h2>רשימת המועדפים שלך ריקה</h2>}
              <p>{searchTerm ? "נסי לחפש מילה אחרת." : "זה הזמן לחקור את האתר ולסמן בלב את המתכונים שהכי עשו לך תיאבון!"}</p>
              {!searchTerm && (
                <Button variant="contained" sx={{ mt: 3, backgroundColor: '#1a1a1a', borderRadius: '50px', padding: '12px 30px', fontSize: '1.1rem' }} onClick={() => navigate('/recipes')}>
                  לכל המתכונים
                </Button>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Favorites;
