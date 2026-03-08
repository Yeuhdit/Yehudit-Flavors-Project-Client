import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { 
  AppBar, Toolbar, Button, Typography, Box, Avatar, Menu, MenuItem 
} from '@mui/material';
import { Logout, Home, Restaurant, Add } from '@mui/icons-material';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    enqueueSnackbar('👋 התנתקת בהצלחה!', { variant: 'success', autoHideDuration: 2500 });
    setTimeout(() => navigate('/login'), 800);
  };

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar position="sticky" sx={{ background: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
        {/* לוגו וכותרת */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer' }} onClick={() => navigate('/')}>
          <Typography variant="h5" sx={{ fontWeight: 900, fontSize: '1.8rem' }}>
            🍲 יהודית בטעמים
          </Typography>
        </Box>

        {/* קישורים מרכזיים */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button color="inherit" startIcon={<Home />} onClick={() => navigate('/')} sx={{ fontSize: '1rem', fontWeight: 600, '&:hover': { background: 'rgba(255,255,255,0.15)' } }}>
            דף הבית
          </Button>
          <Button color="inherit" startIcon={<Restaurant />} onClick={() => navigate('/recipes')} sx={{ fontSize: '1rem', fontWeight: 600, '&:hover': { background: 'rgba(255,255,255,0.15)' } }}>
            מתכונים
          </Button>
          {user && (
            <Button color="inherit" startIcon={<Add />} onClick={() => navigate('/add-recipe')} sx={{ fontSize: '1rem', fontWeight: 600, '&:hover': { background: 'rgba(255,255,255,0.15)' } }}>
              הוסף מתכון
            </Button>
          )}
        </Box>

        {/* מופע משתמש / כפתורי התחברות */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {user ? (
            <>
              <Button 
                onClick={handleMenuOpen}
                sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'white', textTransform: 'none', fontSize: '1rem' }}
              >
                <Avatar sx={{ width: 36, height: 36, background: 'rgba(255,255,255,0.3)', fontWeight: 700 }}>
                  {user.username?.charAt(0).toUpperCase()}
                </Avatar>
                <Typography sx={{ fontWeight: 600 }}>שלום {user.username}</Typography>
              </Button>
              
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} PaperProps={{ sx: { mt: 1 } }}>
                {user.role === 'admin' && (
                  <MenuItem onClick={() => { navigate('/admin'); handleMenuClose(); }}>
                    📊 ניהול
                  </MenuItem>
                )}
                <MenuItem onClick={() => { handleLogout(); handleMenuClose(); }} sx={{ color: 'error.main' }}>
                  <Logout sx={{ mr: 1 }} />
                  התנתקות
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate('/login')} sx={{ fontWeight: 600, fontSize: '1rem' }}>
                התחברות
              </Button>
              <Button 
                onClick={() => navigate('/register')}
                variant="contained"
                sx={{ background: 'white', color: '#f97316', fontWeight: 700, '&:hover': { background: '#f0f0f0' } }}
              >
                הרשמה
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
 