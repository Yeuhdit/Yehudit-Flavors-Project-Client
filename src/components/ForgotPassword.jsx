// src/components/ForgotPassword.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('קישור לשחזור סיסמה נשלח לאימייל שלך! 📧');
    // כאן תוסיפי את הקריאה ל-backend כשתרצי
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105">
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-8 text-center">
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">
              שכחתי סיסמה 🔑
            </h1>
            <p className="text-white/90 mt-2 text-lg">
              נשלח לך קישור לשחזור במייל
            </p>
          </div>

          <div className="p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="email"
                placeholder="הכניסי את האימייל שלך"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-6 py-4 text-lg rounded-full border-2 border-purple-200 focus:border-purple-500 focus:outline-none transition bg-white/80"
              />
              <button
                type="submit"
                className="w-full py-5 text-xl font-bold text-white bg-gradient-to-r from-pink-500 to-purple-600 rounded-full shadow-lg hover:from-pink-600 hover:to-purple-700 transform transition hover:scale-105"
              >
                שלחי קישור שחזור
              </button>
            </form>

            {message && (
              <p className="text-center mt-6 text-green-600 font-bold text-lg">
                {message}
              </p>
            )}

            <p className="text-center mt-8 text-gray-700">
              חזרה להתחברות?{' '}
              <span className="text-purple-600 font-bold cursor-pointer hover:text-purple-800 transition" onClick={() => navigate('/login')}>
                לחצי כאן
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;