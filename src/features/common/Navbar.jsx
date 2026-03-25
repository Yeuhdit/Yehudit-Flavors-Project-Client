// react-client/src/features/common/Navbar.jsx

import  { useState, useContext, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Container
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const { user, logoutContext } = useContext(AuthContext);

  // ----------------------------------------------------
  // כאן הוספתי בדיקה! ברגע שתתחברי, זה ידפיס לקונסול את הנתונים
  // ----------------------------------------------------
  useEffect(() => {
    if (user) {
      console.log("=== בדיקת גלאי הרשאות: מה ריאקט חושב שאת? ===");
      console.log("נתוני המשתמש המלאים:", user);
      console.log("התפקיד שלך הוא:", user.role);
    }
  }, [user]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoutClick = () => {
    logoutContext();
    setAnchorEl(null);
    navigate("/login");
  };

  return (
    <AppBar position="fixed" className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <Container maxWidth="xl">
        <Toolbar disableGutters className="navbar-toolbar">
          
          <Typography
            variant="h5"
            className="navbar-logo"
            onClick={() => navigate("/")}
          >
            יהודית <span>בטעמים</span>
          </Typography>

          <Box className="navbar-links">
            <Button onClick={() => navigate('/')}>דף הבית</Button>
            <Button onClick={() => navigate('/about')}>אודות</Button>
            <Button onClick={() => navigate('/recipes')}>מתכונים</Button>
            
            {user && (
                <>
                    <Button onClick={() => navigate('/my-recipes')}>המתכונים שלי</Button>
                    <Button onClick={() => navigate('/add-recipe')}>הוספת מתכון</Button>
                </>
            )}
          </Box>

          <Box className="navbar-user">
            {user ? (
              <>
                <Button
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                  className="user-btn"
                  sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', textAlign: 'right' }}
                >
                  <Avatar sx={{ width: 36, height: 36, bgcolor: "#ff7e5f", ml: 1 }}>
                    {user.username?.charAt(0).toUpperCase()}
                  </Avatar>
                  <span className="user-name" style={{ lineHeight: '1.2' }}>
                    שלום, {user.username} <br/>
                    {/* הוספתי כאן את הצגת ההרשאה ישירות על המסך! */}
                    <span style={{ fontSize: '0.75rem', color: '#3498db', fontWeight: 'bold' }}>
                      הרשאה במערכת: {user.role || 'לא נמצאה הרשאה'}
                    </span>
                  </span>
                </Button>

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                >
                  {/* הכפתור הזה יופיע אך ורק אם רשום במפורש המילה admin */}
                  {user.role === "admin" && (
                    <MenuItem
                      onClick={() => {
                        navigate("/admin");
                        setAnchorEl(null);
                      }}
                    >
                      📊 ניהול מערכת
                    </MenuItem>
                  )}
                  
                  <MenuItem
                    onClick={() => {
                        navigate("/my-recipes");
                        setAnchorEl(null);
                    }}
                  >
                    👩‍🍳 המתכונים שלי
                  </MenuItem>

                  <MenuItem
                    onClick={handleLogoutClick}
                    sx={{ color: "#ff4d4d" }}
                  >
                    התנתקות
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  onClick={() => navigate("/login")}
                  className="login-btn"
                >
                  התחברות
                </Button>
                <Button
                  onClick={() => navigate("/register")}
                  className="register-btn"
                >
                  הרשמה
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;