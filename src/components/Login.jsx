// // src/components/Login.jsx
// import { useState } from 'react';
// import CookingAnimation from './CookingAnimation';

// const Login = () => {
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     setTimeout(() => {
//       setLoading(false);
//       alert('התחברת 🎉');
//     }, 2000);
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-card">
//         <CookingAnimation active={loading} />

//         <h1>בואי נבשל משהו טעים 🍝</h1>

//         <form onSubmit={handleLogin}>
//           <input className="auth-input" placeholder="אימייל" />
//           <input className="auth-input" placeholder="סיסמה" />
//           <button className="auth-button">
//             {loading ? 'מבשל...' : 'התחברי'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CookingAnimation from './CookingAnimation';
import api from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/users/signin', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data));
      alert('התחברת בהצלחה!');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error?.message || 'שגיאה בהתחברות');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <CookingAnimation active={loading} />
        <h1>בואי נבשל משהו טעים 🍳</h1>
        <p>התחברי לחשבון שלך</p>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleLogin}>
          <input className="auth-input" placeholder="אימייל" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input className="auth-input" type="password" placeholder="סיסמה" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button className="auth-button" type="submit">
            {loading ? 'מבשל...' : 'התחברי'}
          </button>
        </form>
        <div className="auth-link">
          <span onClick={() => navigate('/register')}>אין חשבון? הירשמי כאן</span>
        </div>
      </div>
    </div>
  );
};

export default Login;