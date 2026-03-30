

// import { useState, useContext, useEffect } from "react";
// import {
//   AppBar, Toolbar, Button, Box, Avatar, Menu, MenuItem, Typography, Container
// } from "@mui/material";
// import { useNavigate, useLocation } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";
// import "./Navbar.css";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [scrolled, setScrolled] = useState(false);

//   const { user, logoutContext } = useContext(AuthContext);

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleLogoutClick = () => {
//     logoutContext();
//     setAnchorEl(null);
//     navigate("/login");
//   };

//   return (
//     <AppBar position="fixed" className={`navbar ${scrolled ? "scrolled" : ""}`}>
//       <Container maxWidth="xl">
//         <Toolbar disableGutters className="navbar-toolbar">
          
//           <Typography
//             variant="h5"
//             className="navbar-logo"
//             onClick={() => navigate("/")}
//           >
//             יהודית <span>בטעמים</span>
//           </Typography>

//           <Box className="navbar-links">
//             <Button 
//               className={`nav-link-btn ${location.pathname === '/' ? 'active-nav-link' : ''}`}
//               onClick={() => navigate('/')}>דף הבית</Button>
//             <Button 
//               className={`nav-link-btn ${location.pathname === '/about' ? 'active-nav-link' : ''}`}
//               onClick={() => navigate('/about')}>אודות</Button>
//             <Button 
//               className={`nav-link-btn ${location.pathname.includes('/recipe') && !location.pathname.includes('my-recipes') ? 'active-nav-link' : ''}`}
//               onClick={() => navigate('/recipes')}>מתכונים</Button>
            
//             {user && (
//                 <>
//                     <Button 
//                       className={`nav-link-btn ${location.pathname === '/my-recipes' ? 'active-nav-link' : ''}`}
//                       onClick={() => navigate('/my-recipes')}>המתכונים שלי</Button>
//                     <Button 
//                       className={`nav-link-btn ${location.pathname.includes('/add-recipe') || location.pathname.includes('/edit-recipe') ? 'active-nav-link' : ''}`}
//                       onClick={() => navigate('/add-recipe')}>הוספת מתכון</Button>
//                 </>
//             )}
//           </Box>

//           <Box className="navbar-user">
//             {user ? (
//               <>
//                 <Button
//                   onClick={(e) => setAnchorEl(e.currentTarget)}
//                   className="user-btn"
//                   sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', textAlign: 'right' }}
//                 >
//                   <Avatar sx={{ width: 36, height: 36, bgcolor: "#ff7e5f", ml: 1 }}>
//                     {user.username?.charAt(0).toUpperCase()}
//                   </Avatar>
//                   <span className="user-name" style={{ lineHeight: '1.2' }}>
//                     שלום, {user.username} <br/>
//                     <span style={{ fontSize: '0.75rem', color: '#3498db', fontWeight: 'bold' }}>
//                       הרשאה במערכת: {user.role || 'לא נמצאה הרשאה'}
//                     </span>
//                   </span>
//                 </Button>

//                 <Menu
//                   anchorEl={anchorEl}
//                   open={Boolean(anchorEl)}
//                   onClose={() => setAnchorEl(null)}
//                 >
//                   {user.role === "admin" && (
//                     <MenuItem onClick={() => { navigate("/admin"); setAnchorEl(null); }}>
//                       📊 ניהול מערכת
//                     </MenuItem>
//                   )}
                  
//                   <MenuItem onClick={() => { navigate("/my-recipes"); setAnchorEl(null); }}>
//                     👩‍🍳 המתכונים שלי
//                   </MenuItem>

//                   <MenuItem onClick={handleLogoutClick} sx={{ color: "#ff4d4d" }}>
//                     התנתקות
//                   </MenuItem>
//                 </Menu>
//               </>
//             ) : (
//               <Box sx={{ display: "flex", gap: 2 }}>
//                 <Button onClick={() => navigate("/login")} className="login-btn">
//                   התחברות
//                 </Button>
//                 <Button onClick={() => navigate("/register")} className="register-btn">
//                   הרשמה
//                 </Button>
//               </Box>
//             )}
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// };

// export default Navbar;

// react-client/src/features/common/Navbar.jsx
import { useState, useContext, useEffect } from "react";
import {
  AppBar, Toolbar, Button, Box, Avatar, Menu, MenuItem, Typography, Container
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const { user, logoutContext } = useContext(AuthContext);

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
            <Button
              className={`nav-link-btn ${location.pathname === '/' ? 'active-nav-link' : ''}`}
              onClick={() => navigate('/')}>דף הבית</Button>
            <Button
              className={`nav-link-btn ${location.pathname === '/about' ? 'active-nav-link' : ''}`}
              onClick={() => navigate('/about')}>אודות</Button>
            <Button
              className={`nav-link-btn ${location.pathname.includes('/recipe') && !location.pathname.includes('my-recipes') && !location.pathname.includes('favorites') ? 'active-nav-link' : ''}`}
              onClick={() => navigate('/recipes')}>מתכונים</Button>
           
            {user && (
                <>
                    <Button
                      className={`nav-link-btn ${location.pathname === '/favorites' ? 'active-nav-link' : ''}`}
                      onClick={() => navigate('/favorites')}>מועדפים ❤️</Button>
                    <Button
                      className={`nav-link-btn ${location.pathname === '/my-recipes' ? 'active-nav-link' : ''}`}
                      onClick={() => navigate('/my-recipes')}>המתכונים שלי</Button>
                    <Button
                      className={`nav-link-btn ${location.pathname.includes('/add-recipe') || location.pathname.includes('/edit-recipe') ? 'active-nav-link' : ''}`}
                      onClick={() => navigate('/add-recipe')}>הוספת מתכון</Button>
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
                  {user.role === "admin" && (
                    <MenuItem onClick={() => { navigate("/admin"); setAnchorEl(null); }}>
                      📊 ניהול מערכת
                    </MenuItem>
                  )}
                 
                  <MenuItem onClick={() => { navigate("/favorites"); setAnchorEl(null); }}>
                    ❤️ המועדפים שלי
                  </MenuItem>

                  <MenuItem onClick={() => { navigate("/my-recipes"); setAnchorEl(null); }}>
                    👩‍🍳 המתכונים שלי
                  </MenuItem>

                  <MenuItem onClick={handleLogoutClick} sx={{ color: "#ff4d4d" }}>
                    התנתקות
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button onClick={() => navigate("/login")} className="login-btn">
                  התחברות
                </Button>
                <Button onClick={() => navigate("/register")} className="register-btn">
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
