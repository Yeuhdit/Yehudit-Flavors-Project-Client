// react-client/src/components/AdminPanel.jsx
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllCategories, addCategory, updateCategory, deleteCategory } from '../features/categories/categorySlice';
import { getAllLevels, addLevel, updateLevel, deleteLevel } from '../features/levels/levelSlice';
import { 
  Box, Typography, Tabs, Tab, TextField, Button, List, ListItem, 
  ListItemText, IconButton, Paper, Container, Avatar, Fade
} from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import LocalFireDepartmentRoundedIcon from '@mui/icons-material/LocalFireDepartmentRounded';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import RestaurantRoundedIcon from '@mui/icons-material/RestaurantRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import './AdminPanel.css';

function AdminPanel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allCategories, loading: categoriesLoading } = useSelector(state => state.categories);
  const { allLevels, loading: levelsLoading } = useSelector(state => state.levels);

  const [activeTab, setActiveTab] = useState(0);
  const [isEditingCategory, setIsEditingCategory] = useState(null);
  const [isEditingLevel, setIsEditingLevel] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [levelName, setLevelName] = useState('');

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllLevels());
  }, [dispatch]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // ====== קטגוריות ======
  const handleAddCategory = () => {
    if (!categoryName.trim()) return;
    if (isEditingCategory) {
      dispatch(updateCategory({ id: isEditingCategory, data: { description: categoryName } }));
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
    if (window.confirm('האם את בטוחה שברצונך למחוק קטגוריה זו?')) {
      dispatch(deleteCategory(id));
    }
  };

  const handleCancelEditCategory = () => {
    setIsEditingCategory(null);
    setCategoryName('');
  };

  // ====== רמות ======
  const handleAddLevel = () => {
    if (!levelName.trim()) return;
    if (isEditingLevel) {
      dispatch(updateLevel({ id: isEditingLevel, data: { description: levelName } }));
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
    if (window.confirm('האם את בטוחה שברצונך למחוק רמה זו?')) {
      dispatch(deleteLevel(id));
    }
  };

  const handleCancelEditLevel = () => {
    setIsEditingLevel(null);
    setLevelName('');
  };

  // בחירת אייקון מותאם לקטגוריה
  const getCategoryIcon = (description) => {
    if (description.includes('חריפ') || description.includes('אש')) return <LocalFireDepartmentRoundedIcon className="category-icon" />;
    return <CategoryRoundedIcon className="category-icon" />;
  };

  return (
    <div className="admin-wrapper" dir="rtl">
      
      {/* תפריט צד (Sidebar) */}
      <Box className="admin-sidebar">
        <Avatar className="admin-avatar">י</Avatar>
        <Typography className="menu-user-name">יהודית יברוב</Typography>
        <Typography className="menu-user-role">מנהלת מערכת</Typography>
        
        <List className="menu-actions-list">
          <ListItem button className="menu-action-item" onClick={() => navigate('/admin')}>
            <SettingsRoundedIcon className="menu-item-icon" sx={{ ml: 2 }}/>
            <ListItemText primary="ניהול הגדרות" primaryTypographyProps={{ fontWeight: 700 }} />
          </ListItem>
          <ListItem button className="menu-action-item" onClick={() => navigate('/my-recipes')}>
            <RestaurantRoundedIcon className="menu-item-icon" sx={{ ml: 2 }}/>
            <ListItemText primary="המתכונים שלי" primaryTypographyProps={{ fontWeight: 700 }} />
          </ListItem>
          <ListItem button className="menu-action-item logout" onClick={() => navigate('/login')}>
            <LogoutRoundedIcon className="menu-item-icon" sx={{ ml: 2 }}/>
            <ListItemText primary="התנתקות" primaryTypographyProps={{ fontWeight: 700 }} />
          </ListItem>
        </List>
      </Box>

      {/* אזור מרכזי */}
      <Container maxWidth="md" className="admin-container">
        <Typography variant="h1" className="admin-title">
          מרכז <span>ניהול.</span>
        </Typography>

        <Paper elevation={0} className="admin-glass-panel">
          <Tabs value={activeTab} onChange={handleTabChange} centered className="admin-tabs">
            <Tab label="ניהול קטגוריות" />
            <Tab label="ניהול רמות קושי" />
          </Tabs>

          <Box className="tab-content">
            {/* ====== טאב קטגוריות ====== */}
            {activeTab === 0 && (
              <Fade in timeout={500}>
                <Box>
                  <Typography variant="h5" className="inner-title">הוספה ועדכון קטגוריות</Typography>
                  
                  <Box className="form-group">
                    <TextField 
                      fullWidth label="שם קטגוריה חדשה..." value={categoryName} 
                      onChange={(e) => setCategoryName(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
                      className="modern-input"
                    />
                    <Button variant="contained" onClick={handleAddCategory} disabled={categoriesLoading} className="add-btn-round">
                      {isEditingCategory ? <CheckRoundedIcon /> : <AddRoundedIcon />}
                    </Button>
                    {isEditingCategory && (
                      <Button variant="outlined" color="error" onClick={handleCancelEditCategory} sx={{ borderRadius: '16px', minHeight: '55px' }}>
                        <CloseRoundedIcon />
                      </Button>
                    )}
                  </Box>

                  <List className="categories-list">
                    {allCategories.length === 0 && <Typography align="center" color="text.secondary">אין קטגוריות במערכת</Typography>}
                    {allCategories.map(category => (
                      <ListItem key={category._id} className="item">
                        {getCategoryIcon(category.description)}
                        <ListItemText primary={category.description} className="item-name" sx={{ pr: 2 }} />
                        <Box className="item-actions">
                          <Button className="action-btn edit-btn" onClick={() => handleEditCategory(category)}>עריכה</Button>
                          <Button className="action-btn delete-btn" onClick={() => handleDeleteCategory(category._id)}>מחיקה</Button>
                        </Box>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Fade>
            )}

            {/* ====== טאב רמות ====== */}
            {activeTab === 1 && (
              <Fade in timeout={500}>
                <Box>
                  <Typography variant="h5" className="inner-title">הוספה ועדכון רמות קושי</Typography>
                  
                  <Box className="form-group">
                    <TextField 
                      fullWidth label="שם רמה חדשה..." value={levelName} 
                      onChange={(e) => setLevelName(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddLevel()}
                      className="modern-input"
                    />
                    <Button variant="contained" onClick={handleAddLevel} disabled={levelsLoading} className="add-btn-round">
                      {isEditingLevel ? <CheckRoundedIcon /> : <AddRoundedIcon />}
                    </Button>
                    {isEditingLevel && (
                      <Button variant="outlined" color="error" onClick={handleCancelEditLevel} sx={{ borderRadius: '16px', minHeight: '55px' }}>
                        <CloseRoundedIcon />
                      </Button>
                    )}
                  </Box>

                  <List className="levels-list">
                    {allLevels.length === 0 && <Typography align="center" color="text.secondary">אין רמות במערכת</Typography>}
                    {allLevels.map(level => (
                      <ListItem key={level._id} className="item">
                        <BarChartRoundedIcon className="category-icon" />
                        <ListItemText primary={level.description} className="item-name" sx={{ pr: 2 }} />
                        <Box className="item-actions">
                          <Button className="action-btn edit-btn" onClick={() => handleEditLevel(level)}>עריכה</Button>
                          <Button className="action-btn delete-btn" onClick={() => handleDeleteLevel(level._id)}>מחיקה</Button>
                        </Box>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Fade>
            )}
          </Box>
        </Paper>
      </Container>
    </div>
  );
}

export default AdminPanel;