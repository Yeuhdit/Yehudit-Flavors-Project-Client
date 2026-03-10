import React, { useState, useContext } from 'react';
import { AppBar, Toolbar, Button, Box, Avatar, Menu, MenuItem, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'; // הוספנו את החיבור לקונטקסט
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  
  // שואבים את המשתמש ופונקציית ההתנתקות ישירות מהקונטקסט שיצרנו!
  const { user, logoutContext } = useContext(AuthContext);

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogoutClick = () => {
    logoutContext(); // מפעיל את ההתנתקות
    handleMenuClose();
    navigate('/login'); // מעביר למסך התחברות
  };

  return (
    <AppBar position="sticky" className="navbar">
      <Toolbar className="navbar-toolbar">
        <Box className="navbar-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <Typography variant="h5">🍲 יהודית בטעמים</Typography>
        </Box>

        <Box className="navbar-links">
          <Button onClick={() => navigate('/')}>דף הבית</Button>
          <Button onClick={() => navigate('/recipes')}>מתכונים</Button>
          {user && <Button onClick={() => navigate('/add-recipe')}>הוסף מתכון</Button>}
        </Box>

        <Box className="navbar-user">
          {user ? (
            <>
              <Button onClick={handleMenuOpen} className="user-btn">
                <Avatar>{user.username?.charAt(0).toUpperCase()}</Avatar>
                שלום {user.username}
              </Button>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                {user.role === 'admin' && (
                  <MenuItem onClick={() => { navigate('/admin'); handleMenuClose(); }}>📊 ניהול</MenuItem>
                )}
                <MenuItem onClick={handleLogoutClick} className="logout">התנתקות</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button onClick={() => navigate('/login')}>התחברות</Button>
              <Button onClick={() => navigate('/register')} className="register-btn">הרשמה</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;