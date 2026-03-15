// react-client/src/components/AddRecipe.jsx
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRecipe, clearSuccess } from '../features/recipes/recipeSlice';
import { getAllCategories, addCategory } from '../features/categories/categorySlice';
import { getAllLevels, addLevel } from '../features/levels/levelSlice';
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
  OutlinedInput,
  Alert,
  IconButton,
  Divider,
  Tooltip
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import './AddRecipe.css';

function AddRecipe() {
  const dispatch = useDispatch();
  
  const recipesState = useSelector(state => state.recipes) || {};
  const categoriesState = useSelector(state => state.categories) || {};
  const levelsState = useSelector(state => state.levels) || {};

  const loading = recipesState.loading || false;
  const error = recipesState.error || null;
  const success = recipesState.success || false;
  
  // 🔥 התיקון הקריטי: חילוץ המערך בצורה בטוחה, גם אם השרת מחזיר אובייקט Data!
  const rawCategories = categoriesState.allCategories;
  const allCategories = Array.isArray(rawCategories) 
    ? rawCategories 
    : (rawCategories?.data && Array.isArray(rawCategories.data) ? rawCategories.data : []);

  const rawLevels = levelsState.allLevels;
  const allLevels = Array.isArray(rawLevels) 
    ? rawLevels 
    : (rawLevels?.data && Array.isArray(rawLevels.data) ? rawLevels.data : []);

  const [formData, setFormData] = useState({
    name: '',
    preparationTime: '',
    difficulty: '',
    categories: [],
    levels: [],
    ingredients: [''], 
    instructions: [''], 
    isPrivate: false,
    image: null,
  });

  // שדות להוספת קטגוריה ורמה חדשה ישירות מהטופס
  const [newCategory, setNewCategory] = useState('');
  const [newLevel, setNewLevel] = useState('');

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
        difficulty: '',
        categories: [],
        levels: [],
        ingredients: [''],
        instructions: [''],
        isPrivate: false,
        image: null,
      });
      dispatch(clearSuccess());
      setIsError(false);
      setServerMsg('המתכון התווסף בהצלחה לאוסף! 🎉');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => setServerMsg(''), 5000);
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

  // --- הוספת קטגוריות ורמות אונליין ---
  const handleAddInlineCategory = async () => {
    if (newCategory.trim()) {
      await dispatch(addCategory({ description: newCategory }));
      setNewCategory('');
      dispatch(getAllCategories()); // ריענון הרשימה
    }
  };

  const handleAddInlineLevel = async () => {
    if (newLevel.trim()) {
      await dispatch(addLevel({ description: newLevel }));
      setNewLevel('');
      dispatch(getAllLevels()); // ריענון הרשימה
    }
  };

  // --- פונקציות לטיפול ברכיבים ---
  const handleIngredientChange = (index, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const addIngredient = () => {
    setFormData({ ...formData, ingredients: [...formData.ingredients, ''] });
  };

  const removeIngredient = (index) => {
    if (formData.ingredients.length > 1) {
      const newIngredients = formData.ingredients.filter((_, i) => i !== index);
      setFormData({ ...formData, ingredients: newIngredients });
    }
  };

  // --- פונקציות לטיפול בשלבי הכנה ---
  const handleInstructionChange = (index, value) => {
    const newInstructions = [...formData.instructions];
    newInstructions[index] = value;
    setFormData({ ...formData, instructions: newInstructions });
  };

  const addInstruction = () => {
    setFormData({ ...formData, instructions: [...formData.instructions, ''] });
  };

  const removeInstruction = (index) => {
    if (formData.instructions.length > 1) {
      const newInstructions = formData.instructions.filter((_, i) => i !== index);
      setFormData({ ...formData, instructions: newInstructions });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerMsg('');
    setIsError(false);
    
    if (!formData.name || !formData.preparationTime || formData.categories.length === 0 || !formData.difficulty) {
      setIsError(true);
      setServerMsg('נא למלא את כל שדות החובה: שם, זמן הכנה, רמת קושי וקטגוריות');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const filteredIngredients = formData.ingredients.filter(i => i.trim() !== '');
    const filteredInstructions = formData.instructions.filter(i => i.trim() !== '');

    if (filteredIngredients.length === 0 || filteredInstructions.length === 0) {
      setIsError(true);
      setServerMsg('חובה להזין לפחות רכיב אחד ושלב הכנה אחד');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('preparationTime', formData.preparationTime);
    data.append('difficulty', formData.difficulty);
    data.append('isPrivate', formData.isPrivate);
    data.append('categories', JSON.stringify(formData.categories));
    data.append('ingredients', JSON.stringify(filteredIngredients));
    data.append('instructions', JSON.stringify(filteredInstructions));
    
    if (formData.levels.length > 0) {
      data.append('levels', JSON.stringify(formData.levels));
    }
    if (formData.image) {
      data.append('image', formData.image);
    }

    dispatch(addRecipe(data));
  };

  const getCategoryNames = (selectedIds) => {
    return selectedIds.map(id => allCategories.find(c => c._id === id)?.description || id);
  };
  const getLevelNames = (selectedIds) => {
    return selectedIds.map(id => allLevels.find(l => l._id === id)?.description || id);
  };

  return (
    <div className="add-recipe-wrapper">
      <div className="add-recipe-card">
        <Typography variant="h4" align="center" fontWeight="800" color="#ff7e5f" mb={1}>
          הוספת מתכון חדש 🍰
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" mb={4}>
          שתפי את הקסם שלך עם הקהילה!
        </Typography>

        {(serverMsg || error) && (
          <Alert severity={(isError || error) ? "error" : "success"} sx={{ mb: 3, borderRadius: 2, fontWeight: 'bold' }}>
            {error || serverMsg}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="recipe-form">
          {/* חלק א: פרטים כלליים */}
          <div className="form-section">
            <Typography variant="h6" className="section-title">פרטים כלליים</Typography>
            <TextField 
              label="שם המתכון *" name="name" fullWidth 
              value={formData.name} onChange={handleTextChange} required
              variant="outlined" color="warning"
              sx={{ mb: 2 }}
            />

            <Box sx={{ display: 'flex', gap: 2, mb: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
              <TextField 
                label="זמן הכנה (דקות) *" name="preparationTime" type="number" fullWidth 
                value={formData.preparationTime} onChange={handleTextChange} required
                color="warning"
              />

              <FormControl fullWidth required color="warning">
                <InputLabel>רמת קושי</InputLabel>
                <Select name="difficulty" value={formData.difficulty} onChange={handleTextChange} label="רמת קושי">
                  <MenuItem value="easy">קלי קלות 🍓</MenuItem>
                  <MenuItem value="medium">בינוני 🍋</MenuItem>
                  <MenuItem value="hard">מאתגר לקונדיטורים 🎂</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* בחירת קטגוריות + הוספה חדשה */}
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', mb: 2, flexDirection: { xs: 'column', md: 'row' } }}>
              <FormControl sx={{ flex: 2, width: '100%' }} required color="warning">
                <InputLabel>בחירת קטגוריות *</InputLabel>
                <Select
                  multiple
                  name="categories"
                  value={formData.categories}
                  onChange={handleMultiSelectChange}
                  input={<OutlinedInput label="בחירת קטגוריות *" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {getCategoryNames(selected).map((value) => (
                        <Chip key={value} label={value} sx={{ bgcolor: '#ffe8e0', color: '#d35400', fontWeight: 'bold' }} />
                      ))}
                    </Box>
                  )}
                >
                  {categoriesState.loading ? (
                    <MenuItem disabled>טוען קטגוריות... ⏳</MenuItem>
                  ) : allCategories.length === 0 ? (
                    <MenuItem disabled>אין קטגוריות במסד הנתונים</MenuItem>
                  ) : (
                    allCategories.map((cat) => (
                      <MenuItem key={cat._id} value={cat._id}>
                        {cat.description || cat.name}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
              
              <Box className="inline-add-box">
                <TextField 
                  label="קטגוריה חדשה" 
                  variant="outlined" 
                  color="warning" 
                  size="small"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddInlineCategory())}
                />
                <Tooltip title="הוסף קטגוריה">
                  <IconButton onClick={handleAddInlineCategory} className="inline-add-btn">
                    <AddCircleOutlineIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            {/* בחירת רמות + הוספה חדשה */}
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', mb: 2, flexDirection: { xs: 'column', md: 'row' } }}>
              <FormControl sx={{ flex: 2, width: '100%' }} color="warning">
                <InputLabel>בחירת רמות מתאימות (אופציונלי)</InputLabel>
                <Select
                  multiple
                  name="levels"
                  value={formData.levels}
                  onChange={handleMultiSelectChange}
                  input={<OutlinedInput label="בחירת רמות מתאימות (אופציונלי)" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {getLevelNames(selected).map((value) => (
                        <Chip key={value} label={value} sx={{ bgcolor: '#f0f4f8', color: '#2c3e50', fontWeight: '500' }} />
                      ))}
                    </Box>
                  )}
                >
                  {levelsState.loading ? (
                    <MenuItem disabled>טוען רמות... ⏳</MenuItem>
                  ) : allLevels.length === 0 ? (
                    <MenuItem disabled>אין רמות במסד הנתונים</MenuItem>
                  ) : (
                    allLevels.map((level) => (
                      <MenuItem key={level._id} value={level._id}>
                        {level.description || level.name}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>

              <Box className="inline-add-box">
                <TextField 
                  label="רמה חדשה" 
                  variant="outlined" 
                  color="warning" 
                  size="small"
                  value={newLevel}
                  onChange={(e) => setNewLevel(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddInlineLevel())}
                />
                <Tooltip title="הוסף רמה">
                  <IconButton onClick={handleAddInlineLevel} className="inline-add-btn">
                    <AddCircleOutlineIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </div>

          <Divider sx={{ my: 1 }} />

          {/* חלק ב: רכיבים */}
          <div className="form-section">
            <Typography variant="h6" className="section-title">מצרכים ורכיבים</Typography>
            {formData.ingredients.map((ingredient, index) => (
              <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1.5, alignItems: 'center' }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  color="warning"
                  label={`רכיב ${index + 1}`}
                  value={ingredient}
                  onChange={(e) => handleIngredientChange(index, e.target.value)}
                />
                <IconButton color="error" onClick={() => removeIngredient(index)} disabled={formData.ingredients.length === 1}>
                  <RemoveCircleOutlineIcon />
                </IconButton>
              </Box>
            ))}
            <Button startIcon={<AddCircleOutlineIcon />} onClick={addIngredient} sx={{ color: '#ff7e5f', fontWeight: 'bold' }}>
              הוסף רכיב
            </Button>
          </div>

          <Divider sx={{ my: 1 }} />

          {/* חלק ג: שלבי הכנה */}
          <div className="form-section">
            <Typography variant="h6" className="section-title">שלבי הכנה</Typography>
            {formData.instructions.map((instruction, index) => (
              <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1.5, alignItems: 'flex-start' }}>
                <TextField
                  fullWidth
                  multiline
                  minRows={2}
                  variant="outlined"
                  size="small"
                  color="warning"
                  label={`שלב ${index + 1}`}
                  value={instruction}
                  onChange={(e) => handleInstructionChange(index, e.target.value)}
                />
                <IconButton color="error" onClick={() => removeInstruction(index)} sx={{ mt: 1 }} disabled={formData.instructions.length === 1}>
                  <RemoveCircleOutlineIcon />
                </IconButton>
              </Box>
            ))}
            <Button startIcon={<AddCircleOutlineIcon />} onClick={addInstruction} sx={{ color: '#ff7e5f', fontWeight: 'bold' }}>
              הוסף שלב הכנה
            </Button>
          </div>

          <Divider sx={{ my: 1 }} />

          <Box className="file-upload-box">
            <Typography variant="body2" color="text.secondary" mb={1}>תמונת מגרה חושים (אופציונלי):</Typography>
            <input type="file" accept="image/*" onChange={handleImageChange} className="elegant-file-input" />
          </Box>

          <FormControlLabel 
            control={<Checkbox checked={formData.isPrivate} onChange={handleCheckboxChange} sx={{ color: '#ff7e5f', '&.Mui-checked': { color: '#ff7e5f' } }} />} 
            label={<Typography sx={{ fontWeight: '500', color: '#2c3e50' }}>סוד שמור! (מתכון פרטי רק בשבילי 🤫)</Typography>} 
            sx={{ mt: 1, justifyContent: 'center' }}
          />

          <Button 
            type="submit" fullWidth variant="contained" disabled={loading} 
            className="submit-btn"
          >
            {loading ? <CircularProgress size={26} color="inherit" /> : 'הוסיפי לאוסף! ❤️'}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AddRecipe;