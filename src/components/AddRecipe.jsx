// src/components/AddRecipe.jsx
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRecipe, clearSuccess, clearError } from '../features/recipes/recipeSlice';
import { getAllCategories } from '../features/categories/categorySlice';
import { getAllLevels } from '../features/levels/levelSlice';
import './AddRecipe.css';

function AddRecipe() {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(state => state.recipes);
  const { allCategories } = useSelector(state => state.categories);
  const { allLevels } = useSelector(state => state.levels);

  const [formData, setFormData] = useState({
    name: '',
    preparationTime: '',
    difficulty: 'easy',
    categories: [],
    levels: [],
    isPrivate: false,
    image: null,
  });

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
      alert('המתכון הוסף בהצלחה!');
    }
  }, [success, dispatch]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCategoryChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({
      ...prev,
      categories: selectedOptions
    }));
  };

  const handleLevelChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({
      ...prev,
      levels: selectedOptions
    }));
  };

  const handleImageChange = (e) => {
    setFormData(prev => ({
      ...prev,
      image: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.preparationTime || formData.categories.length === 0) {
      alert('אנא מלא את כל השדות הנדרשים');
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

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="add-recipe-container">
      <h2>הוסף מתכון חדש</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">שם המתכון *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="הכנס שם מתכון"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="preparationTime">זמן הכנה (דקות) *</label>
          <input
            type="number"
            id="preparationTime"
            name="preparationTime"
            value={formData.preparationTime}
            onChange={handleInputChange}
            placeholder="הכנס זמן בדקות"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="difficulty">רמת קושי</label>
          <select
            id="difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleInputChange}
          >
            <option value="easy">קל</option>
            <option value="medium">בינוני</option>
            <option value="hard">קשה</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="categories">בחר קטגוריות *</label>
          <select
            id="categories"
            multiple
            value={formData.categories}
            onChange={handleCategoryChange}
            required
          >
            {allCategories.map(category => (
              <option key={category._id} value={category._id}>
                {category.description}
              </option>
            ))}
          </select>
          <small>* החזק Ctrl/Cmd כדי לבחור מספר קטגוריות</small>
        </div>

        <div className="form-group">
          <label htmlFor="levels">בחר רמות</label>
          <select
            id="levels"
            multiple
            value={formData.levels}
            onChange={handleLevelChange}
          >
            {allLevels.map(level => (
              <option key={level._id} value={level._id}>
                {level.description}
              </option>
            ))}
          </select>
          <small>* החזק Ctrl/Cmd כדי לבחור מספר רמות</small>
        </div>

        <div className="form-group">
          <label htmlFor="image">תמונה</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <div className="form-group checkbox">
          <label htmlFor="isPrivate">
            <input
              type="checkbox"
              id="isPrivate"
              name="isPrivate"
              checked={formData.isPrivate}
              onChange={handleInputChange}
            />
            מתכון פרטי (רק בשבילי)
          </label>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'שמירה...' : 'שמור מתכון'}
        </button>
      </form>
    </div>
  );
}

export default AddRecipe;
