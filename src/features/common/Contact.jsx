// src/components/Contact.jsx
import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState('');
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
    setStatus('');

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('✅ ההודעה נשלחה בהצלחה!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('❌ שגיאה בשליחת ההודעה');
      }
    } catch (error) {
      setStatus('❌ שגיאה בחיבור לשרת');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-wrapper">
      <div className="contact-container">
        <h1 className="contact-title">צור איתנו קשר</h1>
        <p className="contact-subtitle">יש לך שאלה או הצעה? אנחנו כאן כדי לשמוע</p>

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">שם מלא</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="שם שלך"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">אימייל</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">נושא</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="נושא ההודעה"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">הודעה</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="כתוב את ההודעה שלך כאן..."
              rows="6"
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'שולח...' : 'שלח הודעה'}
          </button>

          {status && <p className="form-status">{status}</p>}
        </form>
      </div>
    </div>
  );
};

export default Contact;