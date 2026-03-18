
// react-client/src/components/AddRecipe.jsx

import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRecipe, updateRecipe, clearSuccess, clearError } from '../features/recipes/recipeSlice';
import { getAllCategories } from '../features/categories/categorySlice';
import { getAllLevels } from '../features/levels/levelSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  TextField, 
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
  Button,
  Autocomplete
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'; 
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'; 
import InsertPhotoRoundedIcon from '@mui/icons-material/InsertPhotoRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import './AddRecipe.css';

const steps = [
  'שם וזמן',
  'קטגוריות וקושי',
  'מרכיבים',
  'שלבי הכנה',
  'תמונה ופרטיות'
];

function AddRecipe() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); 
  const isEditMode = !!id;
  const formRef = useRef(null);
  
  const recipesState = useSelector(state => state.recipes) || {};
  const categoriesState = useSelector(state => state.categories) || {};
  const levelsState = useSelector(state => state.levels) || {};

  const loading = recipesState.loading || false;
  const error = recipesState.error || null;
  const success = recipesState.success || false;
  
  const allCategories = Array.isArray(categoriesState.allCategories) ? categoriesState.allCategories : [];
  const allLevels = Array.isArray(levelsState.allLevels) ? levelsState.allLevels : [];

  const [activeStep, setActiveStep] = useState(0);
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

  const [imagePreview, setImagePreview] = useState(null);
  const [serverMsg, setServerMsg] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    dispatch(clearError());
    dispatch(getAllCategories());
    dispatch(getAllLevels());
  }, [dispatch]);

  useEffect(() => {
    if (isEditMode && recipesState.recipes?.length > 0) {
      const recipeToEdit = recipesState.recipes.find(r => r._id === id);
      if (recipeToEdit) {
        setFormData({
          name: recipeToEdit.name || '',
          preparationTime: recipeToEdit.preparationTime || '',
          difficulty: recipeToEdit.difficulty || '',
          categories: recipeToEdit.categories?.map(c => c._id || c) || [],
          levels: recipeToEdit.levels?.map(l => l._id || l) || [],
          ingredients: recipeToEdit.ingredients?.length > 0 ? recipeToEdit.ingredients : [''],
          instructions: recipeToEdit.instructions?.length > 0 ? recipeToEdit.instructions : [''],
          isPrivate: recipeToEdit.isPrivate || false,
          image: null
        });
        if (recipeToEdit.imageUrl) {
          const cleanName = recipeToEdit.imageUrl.split("/").pop().split("\\").pop();
          setImagePreview(`http://localhost:5005/images/${cleanName}`);
        }
      }
    }
  }, [id, isEditMode, recipesState.recipes]);

  useEffect(() => {
    if (success) {
      dispatch(clearSuccess());
      if (isEditMode) {
        navigate(`/recipes`); 
      } else {
        setFormData({
          name: '', preparationTime: '', difficulty: '', categories: [], levels: [],
          ingredients: [''], instructions: [''], isPrivate: false, image: null,
        });
        setImagePreview(null);
        setIsError(false);
        setServerMsg('היצירה שלך נוספה בהצלחה.');
        setActiveStep(0); 
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => setServerMsg(''), 5000);
      }
    }
  }, [success, dispatch, isEditMode, navigate]);

  const handleTextChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setServerMsg('');
  };

  const handleCheckboxChange = (e) => {
    setFormData(prev => ({ ...prev, isPrivate: e.target.checked }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFormData(prev => ({ ...prev, image: null }));
    setImagePreview(null);
  };

  const handleCategoriesChange = (event, newValue) => {
    const newCategories = newValue.map((val) => {
      if (typeof val === 'string') return val;
      if (val && val._id) return val._id;
      return val;
    });
    setFormData(prev => ({ ...prev, categories: newCategories }));
  };

  const handleMultiSelectChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: typeof value === 'string' ? value.split(',') : value,
    }));
  };

  const handleArrayChange = (index, field, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayItem = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ''] });
  };

  const removeArrayItem = (index, field) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    if (newArray.length === 0) newArray.push('');
    setFormData({ ...formData, [field]: newArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerMsg('');
    setIsError(false);
    
    // התיקון שביקשת! הסרנו את החובה לבחור קטגוריה כדי לאפשר עריכה קלה
    if (!formData.name || !formData.preparationTime || !formData.difficulty) {
      setIsError(true);
      setServerMsg('נא להשלים שם, זמן הכנה ורמת קושי.');
      return;
    }

    const filteredIngredients = formData.ingredients.filter(i => i.trim() !== '');
    const filteredInstructions = formData.instructions.filter(i => i.trim() !== '');

    if (filteredIngredients.length === 0 || filteredInstructions.length === 0) {
      setIsError(true);
      setServerMsg('יש להזין לפחות מרכיב אחד ושלב הכנה אחד.');
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

    if (isEditMode) {
      dispatch(updateRecipe({ id, data }));
    } else {
      dispatch(addRecipe(data));
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getLevelNames = (selectedIds) => {
    return selectedIds.map(id => allLevels.find(l => l._id === id)?.description || id);
  };

  const modernInputProps = {
    sx: {
      '& .MuiOutlinedInput-root': {
        borderRadius: '20px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        '& fieldset': { borderColor: 'rgba(0,0,0,0.03)' },
        '&:hover fieldset': { borderColor: 'rgba(0,0,0,0.08)' },
        '&.Mui-focused fieldset': { borderColor: '#ff7e5f' },
        '&.Mui-focused': { boxShadow: '0 10px 30px rgba(255, 126, 95, 0.15)' }
      },
      '& .MuiInputLabel-root': { color: '#888' },
      '& .MuiInputLabel-root.Mui-focused': { color: '#ff7e5f' }
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box className="step-content-inner fade-in">
            <Typography variant="h2" className="step-title">איך קוראים לזה?</Typography>
            <TextField 
              label="שם המתכון *" name="name" fullWidth 
              value={formData.name} onChange={handleTextChange} required
              {...modernInputProps} sx={{ mb: 4, ...modernInputProps.sx }}
            />
            <TextField 
              label="זמן הכנה (דקות) *" name="preparationTime" type="number" fullWidth 
              value={formData.preparationTime} onChange={handleTextChange} required
              {...modernInputProps}
            />
          </Box>
        );
      case 1:
        return (
          <Box className="step-content-inner fade-in">
            <Typography variant="h2" className="step-title">קצת הגדרות</Typography>
            <FormControl fullWidth {...modernInputProps} sx={{ mb: 4, ...modernInputProps.sx }}>
              <InputLabel>רמת קושי *</InputLabel>
              <Select name="difficulty" value={formData.difficulty} onChange={handleTextChange} label="רמת קושי *">
                <MenuItem value="easy">קלי קלות</MenuItem>
                <MenuItem value="medium">דורש תשומת לב</MenuItem>
                <MenuItem value="hard">מאתגר ומספק</MenuItem>
              </Select>
            </FormControl>
            
            <Autocomplete
              multiple
              freeSolo
              options={allCategories}
              getOptionLabel={(option) => {
                if (typeof option === 'string') return option;
                return option.description || option.name || '';
              }}
              value={formData.categories.map(cat => {
                const existing = allCategories.find(c => c._id === cat);
                return existing ? existing : cat;
              })}
              onChange={handleCategoriesChange}
              renderInput={(params) => (
                <TextField 
                  {...params} 
                  label="קטגוריות (אופציונלי)" 
                  {...modernInputProps} 
                  sx={{ mb: 4, ...modernInputProps.sx }}
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip 
                    label={typeof option === 'string' ? option : (option.description || option.name)} 
                    {...getTagProps({ index })} 
                    className="designer-chip" 
                  />
                ))
              }
            />

            <FormControl fullWidth {...modernInputProps}>
              <InputLabel>רמות התאמה (אופציונלי)</InputLabel>
              <Select
                multiple name="levels" value={formData.levels}
                onChange={handleMultiSelectChange}
                input={<OutlinedInput label="רמות התאמה (אופציונלי)" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {getLevelNames(selected).map((value) => (
                      <Chip key={value} label={value} className="designer-chip outlined" variant="outlined" />
                    ))}
                  </Box>
                )}
              >
                {allLevels.map((level) => (
                  <MenuItem key={level._id} value={level._id}>{level.description || level.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        );
      case 2:
        return (
          <Box className="step-content-inner fade-in">
            <Typography variant="h2" className="step-title">מה צריך?</Typography>
            <div className="builder-list ingredients-list">
              {formData.ingredients.map((ingredient, index) => (
                <div key={index} className="builder-row ingredients-row">
                  <div className="row-indicator"></div>
                  <input 
                    type="text" 
                    className="clean-input" 
                    placeholder="לדוגמא: 2 כוסות קמח מנופה..."
                    value={ingredient}
                    onChange={(e) => handleArrayChange(index, 'ingredients', e.target.value)}
                  />
                  <IconButton type="button" onClick={() => removeArrayItem(index, 'ingredients')} className="delete-icon">
                    <RemoveRoundedIcon fontSize="small" />
                  </IconButton>
                </div>
              ))}
              <Button type="button" startIcon={<AddRoundedIcon />} onClick={() => addArrayItem('ingredients')} className="text-action-btn">
                הוספת מרכיב נוסף
              </Button>
            </div>
          </Box>
        );
      case 3:
        return (
          <Box className="step-content-inner fade-in">
            <Typography variant="h2" className="step-title">שלב אחרי שלב</Typography>
            <div className="builder-list instructions-list">
              {formData.instructions.map((instruction, index) => (
                <div key={index} className="builder-row instructions-row align-top">
                  <div className="step-counter">{index + 1}</div>
                  <textarea 
                    className="clean-textarea" 
                    placeholder="תארי את שלב ההכנה בצורה ברורה..."
                    value={instruction}
                    onChange={(e) => handleArrayChange(index, 'instructions', e.target.value)}
                    rows={3}
                  />
                  <IconButton type="button" onClick={() => removeArrayItem(index, 'instructions')} className="delete-icon">
                    <RemoveRoundedIcon fontSize="small" />
                  </IconButton>
                </div>
              ))}
              <Button type="button" startIcon={<AddRoundedIcon />} onClick={() => addArrayItem('instructions')} className="text-action-btn">
                הוספת שלב נוסף
              </Button>
            </div>
          </Box>
        );
      case 4:
        return (
          <Box className="step-content-inner fade-in">
            <Typography variant="h2" className="step-title">תמונה וסיום</Typography>
            <div className="spectacular-upload">
              <input type="file" id="recipe-image-upload" accept="image/*" onChange={handleImageChange} hidden />
              
              {!imagePreview ? (
                <label htmlFor="recipe-image-upload" className="upload-empty-state">
                  <div className="icon-circle">
                    <InsertPhotoRoundedIcon />
                  </div>
                  <Typography className="upload-title">העלאת תמונה מגרת חושים</Typography>
                  <Typography className="upload-hint">לחיצה לבחירת קובץ (מומלץ מאוד, אבל אופציונלי!)</Typography>
                </label>
              ) : (
                <div className="upload-filled-state">
                  <img src={imagePreview} alt="תצוגה מקדימה" />
                  <IconButton type="button" className="remove-image-btn" onClick={handleRemoveImage} aria-label="הסר תמונה">
                    <CloseRoundedIcon />
                  </IconButton>
                </div>
              )}
            </div>
            
            <FormControlLabel 
              control={<Checkbox checked={formData.isPrivate} onChange={handleCheckboxChange} sx={{ color: '#ccc', '&.Mui-checked': { color: '#ff7e5f' } }} />} 
              label={<Typography sx={{ fontSize: '1rem', color: '#666', fontWeight: 500, mt: 3 }}>שמור במחברת הפרטית שלי (לא יפורסם בקהילה)</Typography>} 
              className="privacy-checkbox"
            />
          </Box>
        );
      default:
        return 'שלב לא ידוע';
    }
  };

  return (
    <div className="layout-2028-wrapper stepped-form-wrapper" dir="rtl" ref={formRef}>
      
      <div className="dynamic-bg">
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
      </div>

      <div className="stepped-form-container">
        
        <header className="form-header fade-in">
          <Typography variant="h1" className="super-title">
            {isEditMode ? <><span className="text-highlight">ערכי</span> קסם.</> : <><span className="text-highlight">צרי</span> קסם.</>}
          </Typography>
        </header>

        {(serverMsg || error) && (
          <Alert severity={(isError || error) ? "error" : "success"} className="modern-alert fade-in">
            {error || serverMsg}
          </Alert>
        )}

        <div className="modern-stepper fade-in delay-1">
          {steps.map((label, index) => (
            <div key={label} className={`stepper-item ${index <= activeStep ? 'active' : ''} ${index < activeStep ? 'completed' : ''}`}>
              <div className="stepper-icon">
                {index < activeStep ? <CheckCircleRoundedIcon /> : index + 1}
              </div>
              <Typography className="stepper-label">{label}</Typography>
              {index < steps.length - 1 && <div className="stepper-line"></div>}
            </div>
          ))}
        </div>

        <div className="avant-garde-form fade-in delay-2">
          
          <div className="step-content-area">
            {renderStepContent(activeStep)}
          </div>

          <div className="form-navigation fade-in delay-3">
            <Button
              type="button"
              disabled={activeStep === 0}
              onClick={handleBack}
              startIcon={<ArrowForwardRoundedIcon />} 
              className="nav-btn back-btn"
              disableRipple
            >
              חזרה
            </Button>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              {/* החידוש: כפתור שמירה שמופיע בכל שלב בעריכה! */}
              {isEditMode && activeStep < steps.length - 1 && (
                <Button 
                  type="button" 
                  onClick={handleSubmit}
                  variant="contained" 
                  disabled={loading} 
                  sx={{ backgroundColor: '#27ae60', borderRadius: '12px', fontWeight: 'bold' }}
                  endIcon={<SaveRoundedIcon />}
                >
                  {loading ? <CircularProgress size={20} color="inherit" /> : 'שמור וצא'}
                </Button>
              )}

              {activeStep === steps.length - 1 ? (
                <Button 
                  type="button" 
                  onClick={handleSubmit}
                  variant="contained" 
                  disabled={loading} 
                  className="master-submit-btn"
                  endIcon={<CheckCircleRoundedIcon />}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : (isEditMode ? 'שמירת שינויים!' : (imagePreview ? 'פרסום המתכון!' : 'פרסום (ללא תמונה)'))}
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="contained"
                  onClick={handleNext}
                  endIcon={<ArrowBackRoundedIcon />} 
                  className="nav-btn next-btn"
                >
                  השלב הבא
                </Button>
              )}
            </Box>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AddRecipe;