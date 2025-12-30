//src/features/common/Navbar.jsx
// src/features/common/Navbar.jsx
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav>
      <div className="nav">
        {/* קישורים ראשיים */}
        <div className="nav-links">
          <Link className="nav-link" to="/">דף הבית</Link>
          <Link className="nav-link" to="/recipes">מתכונים</Link>
          <Link className="nav-link" to="/gallery">גלריה</Link>
        </div>

        {/* כפתורי התחברות והרשמה – בצד שמאל (RTL) */}
        <div className="nav-auth">
          <Link className="nav-link auth-link" to="/login">התחברות</Link>
          <Link className="nav-link primary-btn" to="/register">הרשמה</Link>
        </div>
      </div>
    </nav>
  );
}