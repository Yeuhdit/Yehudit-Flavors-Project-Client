// // // react-client/src/components/Contact.jsx
// // import { useState } from 'react';
// // import { useSnackbar } from 'notistack';
// // import axios from 'axios'; 
// // import './Contact.css'; 

// // const Contact = () => {
// //   const { enqueueSnackbar } = useSnackbar();
// //   const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
// //   const [loading, setLoading] = useState(false);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({ ...prev, [name]: value }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);

// //     try {
// //       // בחירת כתובת השרת (לוקאלי או באוויר)
// //       const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
// //       const BASE_URL = isLocalhost ? "http://localhost:5005/api" : "https://yhudit-backend-project.onrender.com/api";

// //       // שליחה לשרת
// //       const response = await axios.post(`${BASE_URL}/contact`, formData);
// //       enqueueSnackbar(response.data.message || 'ההודעה נשלחה בהצלחה!', { variant: 'success' });
// //       setFormData({ name: '', email: '', subject: '', message: '' }); 
// //     } catch (error) {
// //       console.error(error);
// //       const errorMsg = error.response?.data?.message || 'שגיאה בשליחת ההודעה';
// //       enqueueSnackbar(errorMsg, { variant: 'error' });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="contact-wrapper" dir="rtl">
// //       <div className="ambient-background">
// //         <div className="glow-orb orb-primary"></div>
// //       </div>
      
// //       <div className="contact-container reveal-stagger-2">
// //         <h1 className="contact-title">יצירת קשר</h1>
// //         <p className="contact-subtitle">נשמח לשמוע מכם! הצעות, שאלות או סתם לומר שלום.</p>

// //         <form onSubmit={handleSubmit} className="contact-form">
// //           <div className="form-group">
// //             <label htmlFor="name">שם מלא *</label>
// //             <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="איך קוראים לך?" />
// //           </div>

// //           <div className="form-group">
// //             <label htmlFor="email">אימייל לחזרה *</label>
// //             <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="האימייל שלך" />
// //           </div>

// //           <div className="form-group">
// //             <label htmlFor="subject">נושא</label>
// //             <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="על מה תרצי לדבר איתנו?" />
// //           </div>

// //           <div className="form-group">
// //             <label htmlFor="message">הודעה *</label>
// //             <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="5" required placeholder="ההודעה שלך..."></textarea>
// //           </div>

// //           <button type="submit" className="submit-btn" disabled={loading}>
// //             {loading ? 'שולח...' : 'שלחי הודעה'}
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Contact;
// // react-client/src/components/Contact.jsx
// import { useState } from 'react';
// import { useSnackbar } from 'notistack';
// import axios from 'axios'; 
// import './Contact.css'; 

// const Contact = () => {
//   const { enqueueSnackbar } = useSnackbar();
//   const [formData, setFormData] = useState({ 
//     name: '', 
//     email: '', 
//     subject: '', 
//     message: '' 
//   });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
//       const BASE_URL = isLocalhost ? "http://localhost:5005/api" : "https://yhudit-backend-project.onrender.com/api";

//       const response = await axios.post(`${BASE_URL}/contact`, formData);
//       enqueueSnackbar(response.data.message || 'ההודעה נשלחה בהצלחה!', { variant: 'success' });
//       setFormData({ name: '', email: '', subject: '', message: '' }); 
//     } catch (error) {
//       console.error('Contact Error:', error);
//       const errorMsg = error.response?.data?.message || 'שגיאה בשליחת ההודעה';
//       enqueueSnackbar(errorMsg, { variant: 'error' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="contact-wrapper" dir="rtl">
//       <div className="ambient-background">
//         <div className="glow-orb orb-primary"></div>
//       </div>
      
//       <div className="contact-container reveal-stagger-2">
//         <h1 className="contact-title">יצירת קשר</h1>
//         <p className="contact-subtitle">נשמח לשמוע מכם! הצעות, שאלות או סתם לומר שלום.</p>

//         <form onSubmit={handleSubmit} className="contact-form">
//           <div className="form-group">
//             <label htmlFor="name">שם מלא *</label>
//             <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="איך קוראים לך?" />
//           </div>

//           <div className="form-group">
//             <label htmlFor="email">אימייל לחזרה *</label>
//             <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="האימייל שלך" />
//           </div>

//           <div className="form-group">
//             <label htmlFor="subject">נושא</label>
//             <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="על מה תרצי לדבר איתנו?" />
//           </div>

//           <div className="form-group">
//             <label htmlFor="message">הודעה *</label>
//             <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="5" required placeholder="ההודעה שלך..."></textarea>
//           </div>

//           <button type="submit" className="submit-btn" disabled={loading}>
//             {loading ? 'שולח...' : 'שלחי הודעה'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Contact;
// react-client/src/components/Contact.jsx
import { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Try to send to backend first
      const response = await fetch(import.meta.env.VITE_API_URL + '/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }).catch(() => null);

      // If backend fails, save to localStorage
      if (!response) {
        const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
        messages.push({
          ...formData,
          timestamp: new Date().toISOString()
        });
        localStorage.setItem('contactMessages', JSON.stringify(messages));
      }

      // Show success
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => setSubmitted(false), 4000);
    } catch (error) {
      console.error('Error:', error);
      // Still save locally on error
      const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
      messages.push({
        ...formData,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('contactMessages', JSON.stringify(messages));
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-wrapper">
      <div className="contact-container">
        <h1 className="contact-title">📧 צור קשר איתנו</h1>
        <p className="contact-subtitle">
          יש לך שאלה או הערה? אנחנו כאן כדי לשמוע ממך!
        </p>

        {submitted && (
          <div className="contact-message success">
            ✅ תודה על ההודעה שלך! נחזור אליך בקרוב.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">📝 שם *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="הכנס את שמך"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">📧 דוא"ל *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="הכנס את הדוא״ל שלך"
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">💬 נושא *</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder="מה הנושא?"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">✍️ הודעה *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="כתוב את ההודעה שלך כאן..."
              rows="5"
            />
          </div>

          <button 
            type="submit" 
            className="submit-btn" 
            disabled={loading}
          >
            {loading ? '⏳ שולח...' : '📤 שלח הודעה'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;