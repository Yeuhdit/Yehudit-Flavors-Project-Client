//react-client/src/features/common/Footer.jsx
import { Typography, Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import "./Footer.css";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="lux-clean-footer" dir="rtl">
      <Container maxWidth="lg">
        <Box className="footer-top-section">
          
          <div className="footer-brand">
            <Typography variant="h4" className="footer-logo">
              יהודית <span>בטעמים</span>
            </Typography>
            <Typography className="footer-slogan">
              לבשל עם נשמה, לאכול עם חיוך.<br/>
              המתכונים שיעשו לכם את היום, עכשיו אצלכם במטבח.
            </Typography>
            <div className="footer-socials">
              <InstagramIcon className="social-icon" />
              <FacebookIcon className="social-icon" />
              <MailOutlineIcon className="social-icon" />
            </div>
          </div>

          <div className="footer-links-group">
            <Typography variant="h6" className="footer-link-title">ניווט מהיר</Typography>
            <button onClick={() => navigate("/")}>דף הבית</button>
            <button onClick={() => navigate("/about")}>הסיפור שלנו</button>
            <button onClick={() => navigate("/recipes")}>ספר המתכונים</button>
          </div>

          <div className="footer-links-group">
            <Typography variant="h6" className="footer-link-title">האזור האישי</Typography>
            <button onClick={() => navigate("/login")}>התחברות לחשבון</button>
            <button onClick={() => navigate("/register")}>יצירת חשבון חדש</button>
            <button onClick={() => navigate("/add-recipe")}>הוספת מתכון אישי</button>
          </div>

        </Box>

        <Box className="footer-bottom-section">
          <Typography className="footer-copyright">
            © {new Date().getFullYear()} יהודית בטעמים. כל הזכויות שמורות.
          </Typography>
          <div className="footer-legal">
            <button>תקנון האתר</button>
            <span>|</span>
            <button>הצהרת נגישות</button>
          </div>
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;