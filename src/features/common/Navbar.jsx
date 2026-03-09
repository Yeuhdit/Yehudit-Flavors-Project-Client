import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Box, Avatar, Menu, MenuItem, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ user, handleLogout }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar position="sticky" className="navbar">
      <Toolbar className="navbar-toolbar">
        <Box className="navbar-logo" onClick={() => navigate('/')}>
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
                {user.role === 'admin' && <MenuItem onClick={() => { navigate('/admin'); handleMenuClose(); }}>📊 ניהול</MenuItem>}
                <MenuItem onClick={() => { handleLogout(); handleMenuClose(); }} className="logout">התנתקות</MenuItem>
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