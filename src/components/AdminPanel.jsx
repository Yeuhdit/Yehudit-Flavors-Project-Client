// react-client/src/components/AdminPanel.jsx
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories, addCategory, updateCategory, deleteCategory } from '../features/categories/categorySlice';
import { getAllLevels, addLevel, updateLevel, deleteLevel } from '../features/levels/levelSlice';
import './AdminPanel.css';

function AdminPanel() {
  const dispatch = useDispatch();
  const { allCategories, loading: categoriesLoading } = useSelector(state => state.categories);
  const { allLevels, loading: levelsLoading } = useSelector(state => state.levels);

  const [activeTab, setActiveTab] = useState('categories');
  const [isEditingCategory, setIsEditingCategory] = useState(null);
  const [isEditingLevel, setIsEditingLevel] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [levelName, setLevelName] = useState('');

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllLevels());
  }, [dispatch]);

  // ====== קטגוריות ======
  const handleAddCategory = () => {
    if (!categoryName.trim()) {
      alert('אנא הכנס שם קטגוריה');
      return;
    }

    if (isEditingCategory) {
      dispatch(updateCategory({
        id: isEditingCategory,
        data: { description: categoryName }
      }));
      setIsEditingCategory(null);
    } else {
      dispatch(addCategory({ description: categoryName }));
    }
    setCategoryName('');
  };

  const handleEditCategory = (category) => {
    setIsEditingCategory(category._id);
    setCategoryName(category.description);
  };

  const handleDeleteCategory = (id) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק קטגוריה זו?')) {
      dispatch(deleteCategory(id));
    }
  };

  const handleCancelEditCategory = () => {
    setIsEditingCategory(null);
    setCategoryName('');
  };

  // ====== רמות ======
  const handleAddLevel = () => {
    if (!levelName.trim()) {
      alert('אנא הכנס שם רמה');
      return;
    }

    if (isEditingLevel) {
      dispatch(updateLevel({
        id: isEditingLevel,
        data: { description: levelName }
      }));
      setIsEditingLevel(null);
    } else {
      dispatch(addLevel({ description: levelName }));
    }
    setLevelName('');
  };

  const handleEditLevel = (level) => {
    setIsEditingLevel(level._id);
    setLevelName(level.description);
  };

  const handleDeleteLevel = (id) => {
    if (window.confirm('האם אתה בטוח שברצונך למחוק רמה זו?')) {
      dispatch(deleteLevel(id));
    }
  };

  const handleCancelEditLevel = () => {
    setIsEditingLevel(null);
    setLevelName('');
  };

  return (
    <div className="admin-panel">
      <h1>פאנל ניהול</h1>
      
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'categories' ? 'active' : ''}`}
          onClick={() => setActiveTab('categories')}
        >
          קטגוריות
        </button>
        <button 
          className={`tab ${activeTab === 'levels' ? 'active' : ''}`}
          onClick={() => setActiveTab('levels')}
        >
          רמות
        </button>
      </div>

      {/* ====== טאב קטגוריות ====== */}
      {activeTab === 'categories' && (
        <div className="tab-content">
          <h2>ניהול קטגוריות</h2>
          
          <div className="form-group">
            <input
              type="text"
              placeholder="שם קטגוריה"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
            />
            <button onClick={handleAddCategory} disabled={categoriesLoading}>
              {isEditingCategory ? 'עדכן קטגוריה' : 'הוסף קטגוריה'}
            </button>
            {isEditingCategory && (
              <button onClick={handleCancelEditCategory} className="cancel-btn">
                ביטול
              </button>
            )}
          </div>

          <div className="items-list">
            <h3>קטגוריות קיימות</h3>
            {allCategories.length === 0 ? (
              <p className="empty-message">אין קטגוריות עדיין</p>
            ) : (
              <ul>
                {allCategories.map(category => (
                  <li key={category._id} className="item">
                    <span className="item-name">{category.description}</span>
                    <div className="item-actions">
                      <button 
                        onClick={() => handleEditCategory(category)}
                        className="edit-btn"
                      >
                        עריכה
                      </button>
                      <button 
                        onClick={() => handleDeleteCategory(category._id)}
                        className="delete-btn"
                      >
                        מחיקה
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* ====== טאב רמות ====== */}
      {activeTab === 'levels' && (
        <div className="tab-content">
          <h2>ניהול רמות</h2>
          
          <div className="form-group">
            <input
              type="text"
              placeholder="שם רמה"
              value={levelName}
              onChange={(e) => setLevelName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddLevel()}
            />
            <button onClick={handleAddLevel} disabled={levelsLoading}>
              {isEditingLevel ? 'עדכן רמה' : 'הוסף רמה'}
            </button>
            {isEditingLevel && (
              <button onClick={handleCancelEditLevel} className="cancel-btn">
                ביטול
              </button>
            )}
          </div>

          <div className="items-list">
            <h3>רמות קיימות</h3>
            {allLevels.length === 0 ? (
              <p className="empty-message">אין רמות עדיין</p>
            ) : (
              <ul>
                {allLevels.map(level => (
                  <li key={level._id} className="item">
                    <span className="item-name">{level.description}</span>
                    <div className="item-actions">
                      <button 
                        onClick={() => handleEditLevel(level)}
                        className="edit-btn"
                      >
                        עריכה
                      </button>
                      <button 
                        onClick={() => handleDeleteLevel(level._id)}
                        className="delete-btn"
                      >
                        מחיקה
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
