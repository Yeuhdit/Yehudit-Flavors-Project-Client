// src/components/AddRecipe.jsx
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRecipe, clearSuccess } from '../features/recipes/recipeSlice';
import { getAllCategories } from '../features/categories/categorySlice';
import { getAllLevels } from '../features/levels/levelSlice';
import { 
  TextField, 
  Button, 
  Select, 
  MenuItem, 
  InputLabel, 
  FormControl, 
  Checkbox, 
  FormControlLabel, 
  CircularProgress,
  Box,
  Typography,
  Chip,
  OutlinedInput
} from '@mui/material';
import './AddRecipe.css';

function AddRecipe() {
  const dispatch = useDispatch();
  
  // משיכת נתונים מהסטייט עם הגנות
  const recipesState = useSelector(state => state.recipes) || {};
  const categoriesState = useSelector(state => state.categories) || {};
  const levelsState = useSelector(state => state.levels) || {};

  const loading = recipesState.loading || false;
  const error = recipesState.error || null;
  const success = recipesState.success || false;
  
  // ווידוא שתמיד יש לנו מערך, גם אם השרת החזיר undefined או שגיאה
  const allCategories = Array.isArray(categoriesState.allCategories) ? categoriesState.allCategories : [];
  const allLevels = Array.isArray(levelsState.allLevels) ? levelsState.allLevels : [];

  const [formData, setFormData] = useState({
    name: '',
    preparationTime: '',
    difficulty: 'easy',
    categories: [],
    levels: [],
    isPrivate: false,
    image: null,
  });

  const [serverMsg, setServerMsg] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllLevels());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      setFormData({
        name: '',
        preparationTime: '',
        difficulty: 'easy',
        categories: [],
        levels: [],
        isPrivate: false,
        image: null,
      });
      dispatch(clearSuccess());
      setIsError(false);
      setServerMsg('✨ המתכון המתוק שלך הוסף בהצלחה! ✨');
      setTimeout(() => setServerMsg(''), 4000);
    }
  }, [success, dispatch]);

  const handleTextChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setServerMsg('');
  };

  const handleCheckboxChange = (e) => {
    setFormData(prev => ({ ...prev, isPrivate: e.target.checked }));
  };

  const handleImageChange = (e) => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleMultiSelectChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: typeof value === 'string' ? value.split(',') : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerMsg('');
    setIsError(false);
    
    if (!formData.name || !formData.preparationTime || formData.categories.length === 0) {
      setIsError(true);
      setServerMsg('אופס! חסרים כמה פרטים מתוקים (שם, זמן וקטגוריות) 🧁');
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('preparationTime', formData.preparationTime);
    data.append('difficulty', formData.difficulty);
    data.append('isPrivate', formData.isPrivate);
    data.append('categories', JSON.stringify(formData.categories));
    
    if (formData.levels.length > 0) {
      data.append('levels', JSON.stringify(formData.levels));
    }
    if (formData.image) {
      data.append('image', formData.image);
    }

    dispatch(addRecipe(data));
  };

  // עזרים לתצוגת התגיות (Chips) בתוך ה-Select
  const getCategoryNames = (selectedIds) => {
    return selectedIds.map(id => allCategories.find(c => c._id === id)?.description || id);
  };
  const getLevelNames = (selectedIds) => {
    return selectedIds.map(id => allLevels.find(l => l._id === id)?.description || id);
  };

  return (
    <div className="add-recipe-wrapper">
      <div className="add-recipe-card">
        <Typography variant="h4" align="center" fontWeight="bold" color="#ff7b54" mb={3}>
          הוספת מתכון חדש 🍰
        </Typography>

        {(serverMsg || error) && (
          <Box sx={{ 
            bgcolor: (isError || error) ? '#ffebee' : '#fff3e0', 
            color: (isError || error) ? '#c62828' : '#e65100', 
            p: 2, borderRadius: 2, mb: 3, textAlign: 'center', fontWeight: 'bold' 
          }}>
            {error || serverMsg}
          </Box>
        )}

        <form onSubmit={handleSubmit} className="recipe-form">
          <TextField 
            label="שם המתכון המתוק שלך" name="name" fullWidth 
            value={formData.name} onChange={handleTextChange} required
            color="warning"
          />

          <TextField 
            label="זמן הכנה (בדקות)" name="preparationTime" type="number" fullWidth 
            value={formData.preparationTime} onChange={handleTextChange} required
            color="warning"
          />

          <FormControl fullWidth color="warning">
            <InputLabel>רמת קושי</InputLabel>
            <Select name="difficulty" value={formData.difficulty} onChange={handleTextChange} label="רמת קושי">
              <MenuItem value="easy">קלי קלות 🍓</MenuItem>
              <MenuItem value="medium">בינוני 🍋</MenuItem>
              <MenuItem value="hard">אתגר לקונדיטורים 🎂</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth color="warning">
            <InputLabel>בחירי קטגוריות (אפשר כמה!)</InputLabel>
            <Select
              multiple
              name="categories"
              value={formData.categories}
              onChange={handleMultiSelectChange}
              input={<OutlinedInput label="בחירי קטגוריות (אפשר כמה!)" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {getCategoryNames(selected).map((value) => (
                    <Chip key={value} label={value} sx={{ bgcolor: '#ffe0b2', color: '#e65100', fontWeight: 'bold' }} />
                  ))}
                </Box>
              )}
            >
              {allCategories.length === 0 ? (
                <MenuItem disabled>טוען קטגוריות מתוקות... ⏳</MenuItem>
              ) : (
                allCategories.map((cat) => (
                  <MenuItem key={cat._id} value={cat._id}>
                    {cat.description || cat.name}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>

          <FormControl fullWidth color="warning">
            <InputLabel>רמות מתאימות (אופציונלי)</InputLabel>
            <Select
              multiple
              name="levels"
              value={formData.levels}
              onChange={handleMultiSelectChange}
              input={<OutlinedInput label="רמות מתאימות (אופציונלי)" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {getLevelNames(selected).map((value) => (
                    <Chip key={value} label={value} sx={{ bgcolor: '#ffccbc', color: '#bf360c', fontWeight: 'bold' }} />
                  ))}
                </Box>
              )}
            >
              {allLevels.length === 0 ? (
                <MenuItem disabled>טוען רמות... ⏳</MenuItem>
              ) : (
                allLevels.map((level) => (
                  <MenuItem key={level._id} value={level._id}>
                    {level.description || level.name}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>

          <Box className="file-upload-box">
            <Typography variant="subtitle2" color="text.secondary" mb={1}>תמונה מגרת חושים (אופציונלי):</Typography>
            <input type="file" accept="image/*" onChange={handleImageChange} className="sweet-file-input" />
          </Box>

          <FormControlLabel 
            control={<Checkbox checked={formData.isPrivate} onChange={handleCheckboxChange} sx={{ color: '#ff7b54', '&.Mui-checked': { color: '#ff7b54' } }} />} 
            label={<Typography sx={{ fontWeight: '500', color: '#555' }}>סוד שמור! (מתכון פרטי רק בשבילי 🤫)</Typography>} 
            sx={{ mt: 1 }}
          />

          <Button 
            type="submit" fullWidth variant="contained" disabled={loading} 
            sx={{ 
              mt: 2, py: 1.5, fontSize: '1.1rem', fontWeight: 'bold', borderRadius: 3,
              background: 'linear-gradient(45deg, #ff9b8c, #ff7b54)',
              boxShadow: '0 4px 15px rgba(255, 123, 84, 0.3)',
              '&:hover': { background: 'linear-gradient(45deg, #ff7b54, #ff5722)' }
            }}
          >
            {loading ? <CircularProgress size={26} color="inherit" /> : 'הוסיפי לאוסף! 💖'}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AddRecipe;