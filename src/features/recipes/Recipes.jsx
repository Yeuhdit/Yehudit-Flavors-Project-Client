// react-client/src/features/recipes/Recipes.jsx
import { useNavigate } from "react-router-dom";
import Masonry from "react-masonry-css";
import { useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Select, MenuItem, FormControl, InputLabel, Chip } from "@mui/material";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import LocalDiningRoundedIcon from '@mui/icons-material/LocalDiningRounded';
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

const Recipes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  
  const { recipes, loading, error } = useSelector(state => state.recipes || {});
  const { allCategories } = useSelector(state => state.categories || {});
  const safeRecipes = Array.isArray(recipes) ? recipes : [];

  const filteredRecipes = safeRecipes.filter(r => {
    // חסימת מתכונים פרטיים!
    if (r.isPrivate === true) return false;

    const matchText = r.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === "" || (r.categories && r.categories.some(c => c._id === selectedCategory || c === selectedCategory));
    const matchDifficulty = selectedDifficulty === "" || r.difficulty === selectedDifficulty;
    return matchText && matchCategory && matchDifficulty;
  });

  if (loading) return <div className="page-loader"><CircularProgress sx={{ color: '#ff7e5f' }} size={60} thickness={4} /></div>;

  return (
    <div className="recipes-wrapper" dir="rtl">
      <div className="ambient-background">
        <div className="glow-orb orb-primary"></div>
        <div className="glow-orb orb-secondary"></div>
      </div>
      <div className="recipes-container">
        <header className="recipes-header fade-in" style={{ marginBottom: '40px' }}>
          <h1 className="super-title">ספר <span className="text-highlight">המתכונים.</span></h1>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px' }}>
            <div className="search-glass-container" style={{ flex: '1', minWidth: '250px', margin: '0' }}>
              <SearchRoundedIcon className="search-icon" />
              <input type="text" className="search-glass-input" placeholder="מה בא לך להכין היום?..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <FormControl sx={{ minWidth: 150, backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: '50px' }}>
              <InputLabel>קטגוריה</InputLabel>
              <Select value={selectedCategory} label="קטגוריה" onChange={e => setSelectedCategory(e.target.value)} sx={{ borderRadius: '50px' }}>
                <MenuItem value=""><em>הכל</em></MenuItem>
                {allCategories && allCategories.map(cat => <MenuItem key={cat._id} value={cat._id}>{cat.description}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 150, backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: '50px' }}>
              <InputLabel>רמת קושי</InputLabel>
              <Select value={selectedDifficulty} label="רמת קושי" onChange={e => setSelectedDifficulty(e.target.value)} sx={{ borderRadius: '50px' }}>
                <MenuItem value=""><em>הכל</em></MenuItem>
                <MenuItem value="easy">קלי קלות</MenuItem>
                <MenuItem value="medium">דורש תשומת לב</MenuItem>
                <MenuItem value="hard">מאתגר ומספק</MenuItem>
              </Select>
            </FormControl>
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
              <div className="empty-illustration">🍳</div>
              <h2>אופס... לא מצאנו מתכונים כאלה 🧐</h2>
              <p>אולי כדאי לנסות שילוב סינונים אחר או לחפש מילה שונה!</p>
              <Button 
                variant="outlined" 
                sx={{ mt: 3, color: '#ff7e5f', borderColor: '#ff7e5f', borderRadius: '50px', padding: '8px 24px' }} 
                onClick={() => { setSearchTerm(""); setSelectedCategory(""); setSelectedDifficulty(""); }}
              >
                נקה סינונים
              </Button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Recipes;