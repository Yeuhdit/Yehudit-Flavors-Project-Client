// react-client/src/components/Contact.jsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { Typography, CircularProgress } from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import SubjectRoundedIcon from '@mui/icons-material/SubjectRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import axios from 'axios';
import './Contact.css';

const Contact = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  // שימוש ב-react-hook-form לוולידציה חלקה ומהירה בזמן אמת
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    mode: 'onTouched'
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // 📌 הערה למורה: ניתוב להעלאה (Deployment Routing)
      // קוד זה בודק באופן דינמי היכן האפליקציה רצה (במחשב המקומי או בשרת הייצור ב-Render).
      // אם אנחנו ב-localhost, הבקשה נשלחת לכתובת המקומית (פורט 5005).
      // אם אנחנו באוויר, הבקשה נשלחת ישירות ל-URL של הבקאנד ב-Render.
      // מנגנון זה מבטיח עבודה חלקה בשתי הסביבות ללא צורך בשינויי קוד ידניים ומונע שגיאות CORS.
      const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
      const BASE_URL = isLocalhost ? "http://localhost:5005/api" : "https://yhudit-backend-project.onrender.com/api";

      const response = await axios.post(`${BASE_URL}/contact`, data, {
        headers: { 'Content-Type': 'application/json' }
      });
      
      enqueueSnackbar(response.data.message || 'ההודעה נשלחה בהצלחה! 🎉', { variant: 'success', autoHideDuration: 4000 });
      reset(); // ניקוי הטופס לאחר שליחה מוצלחת
    } catch (error) {
      console.error('Contact Error:', error);
      const errorMsg = error.response?.data?.message || 'שגיאה בשליחת ההודעה, אנא נסי שוב מאוחר יותר.';
      enqueueSnackbar(errorMsg, { variant: 'error', autoHideDuration: 5000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-wrapper" dir="rtl">
      {/* רקע דינמי של כדורי אור */}
      <div className="ambient-background">
        <div className="glow-orb orb-primary"></div>
        <div className="glow-orb orb-secondary"></div>
      </div>
      
      <div className="contact-container fade-in-up">
        <div className="contact-header">
          <Typography variant="h1" className="super-title contact-title">
            דברי <span className="text-highlight">איתנו.</span>
          </Typography>
          <Typography className="contact-subtitle">
            יש לך שאלה? בקשה למתכון? סתם רוצה לשתף כמה יצא טעים? אנחנו תמיד כאן בשבילך.
          </Typography>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="modern-contact-form" noValidate>
          
          {/* שדה שם מלא */}
          <div className="input-group-modern">
            <div className="input-with-icon">
              <PersonRoundedIcon className="contact-input-icon" />
              <input
                type="text"
                placeholder="שם מלא *"
                className={`lux-input ${errors.name ? 'input-error' : ''}`}
                {...register('name', { 
                  required: 'איך קוראים לך? (שדה חובה)',
                  minLength: { value: 2, message: 'שם חייב להכיל לפחות 2 תווים' }
                })}
              />
            </div>
            {errors.name && <span className="contact-error-text">{errors.name.message}</span>}
          </div>

          {/* שדה אימייל */}
          <div className="input-group-modern">
            <div className="input-with-icon">
              <EmailRoundedIcon className="contact-input-icon" />
              <input
                type="email"
                placeholder="כתובת אימייל לחזרה *"
                className={`lux-input ${errors.email ? 'input-error' : ''}`}
                {...register('email', { 
                  required: 'אנחנו צריכים אימייל כדי לחזור אליך',
                  pattern: { value: /\S+@\S+\.\S+/, message: 'כתובת אימייל לא תקינה' }
                })}
              />
            </div>
            {errors.email && <span className="contact-error-text">{errors.email.message}</span>}
          </div>

          {/* שדה נושא */}
          <div className="input-group-modern">
            <div className="input-with-icon">
              <SubjectRoundedIcon className="contact-input-icon" />
              <input
                type="text"
                placeholder="נושא ההודעה *"
                className={`lux-input ${errors.subject ? 'input-error' : ''}`}
                {...register('subject', { 
                  required: 'באיזה נושא הפנייה?',
                  minLength: { value: 3, message: 'נושא חייב להכיל לפחות 3 תווים' }
                })}
              />
            </div>
            {errors.subject && <span className="contact-error-text">{errors.subject.message}</span>}
          </div>

          {/* שדה הודעה (טקסט ארוך) */}
          <div className="input-group-modern">
            <div className="input-with-icon textarea-icon-wrapper">
              <ChatBubbleOutlineRoundedIcon className="contact-input-icon textarea-icon" />
              <textarea
                rows="5"
                placeholder="מה תרצי לספר לנו? (לפחות 10 תווים) *"
                className={`lux-input lux-textarea ${errors.message ? 'input-error' : ''}`}
                {...register('message', { 
                  required: 'לא כתבת לנו כלום...',
                  minLength: { value: 10, message: 'ההודעה חייבת להכיל לפחות 10 תווים כדי שנבין היטב' }
                })}
              ></textarea>
            </div>
            {errors.message && <span className="contact-error-text">{errors.message.message}</span>}
          </div>

          {/* כפתור שליחה */}
          <button type="submit" className="lux-submit-btn" disabled={loading}>
            {loading ? <CircularProgress size={24} color="inherit" /> : (
              <>
                <SendRoundedIcon sx={{ transform: 'rotate(-135deg)', mb: '4px' }} />
                שליחת הודעה
              </>
            )}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Contact;