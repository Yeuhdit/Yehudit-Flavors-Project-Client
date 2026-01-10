// //src/features/common/Navbar.jsx
// // src/features/common/Navbar.jsx
// import { Link } from 'react-router-dom';
// import './Navbar.css';

// export default function Navbar() {
//   return (
//     <nav>
//       <div className="nav">
//         {/* קישורים ראשיים */}
//         <div className="nav-links">
//           <Link className="nav-link" to="/">דף הבית</Link>
//           <Link className="nav-link" to="/recipes">מתכונים</Link>
//           <Link className="nav-link" to="/gallery">גלריה</Link>
//         </div>

//         {/* כפתורי התחברות והרשמה – בצד שמאל (RTL) */}
//         <div className="nav-auth">
//           <Link className="nav-link auth-link" to="/login">התחברות</Link>
//           <Link className="nav-link primary-btn" to="/register">הרשמה</Link>
//         </div>
//       </div>
//     </nav>
//   );
// }

import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav style={{ padding: '20px', background: '#f97316', color: 'white', textAlign: 'center' }}>
      <h2>ספר המתכונים שלי 🍲</h2>
      <div>
        <button onClick={() => navigate('/')} style={{margin: '0 10px', background: 'none', border: 'none', color: 'white', fontSize: '18px', cursor: 'pointer'}}>דף הבית</button>
        <button onClick={() => navigate('/recipes')} style={{margin: '0 10px', background: 'none', border: 'none', color: 'white', fontSize: '18px', cursor: 'pointer'}}>כל המתכונים</button>
        {user ? (
          <>
            <span>שלום {user.username}!</span>
            <button onClick={handleLogout} style={{margin: '0 20px'}}>התנתקי</button>
            {user.role === 'admin' && <button onClick={() => navigate('/admin')}>ניהול</button>}
          </>
        ) : (
          <>
            <button onClick={() => navigate('/login')}>התחברות</button>
            <button onClick={() => navigate('/register')}>הרשמה</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;