// react-client/src/features/common/About.jsx
import React from "react";
import { Container, Typography } from "@mui/material";
import "./About.css";

const About = () => {
  return (
    <div className="about-wrapper" dir="rtl">
      {/* רקע מודרני עם גרדיאנטים רכים וצורות מרחפות */}
      <div className="modern-gradient-bg">
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
        <div className="glow-orb orb-3"></div>
      </div>

      <Container maxWidth="lg" className="about-container">
        
        {/* אזור הכותרת הראשית - סטייל 2027 */}
        <header className="about-header text-center fade-in-up">
          <Typography variant="h1" className="massive-title">
            הסיפור <span className="text-accent">שלנו.</span>
          </Typography>
          <Typography className="subtitle">
            יהודית בטעמים היא מסע של טעמים, חוויות ורגעים קטנים סביב שולחן האוכל.
          </Typography>
        </header>

        {/* גריד תוכן חכם ונקי */}
        <div className="about-content-grid">
          
          <div className="content-card fade-in-up delay-1">
            <Typography variant="h3" className="card-title">איך הכל התחיל?</Typography>
            <Typography className="card-text">
              במטבח ביתי קטן, עם סירים מבעבעים, תבלינים על השיש והרבה סקרנות לנסות דברים חדשים. כל מנה התחילה מניסוי קטן – שילוב מפתיע של טעמים או זיכרון של מתכון ישן שקיבל חיים חדשים.
            </Typography>
          </div>

          <div className="content-card fade-in-up delay-2">
            <Typography variant="h3" className="card-title">הקסם שבפשטות</Typography>
            <Typography className="card-text">
              אנחנו מאמינים שאוכל טוב לא חייב להיות מסובך. לפעמים הדברים הפשוטים ביותר – חומרי גלם איכותיים, תיבול נכון וקצת יצירתיות – הם אלו שהופכים מנה למיוחדת ובלתי נשכחת.
            </Typography>
          </div>

          <div className="content-card fade-in-up delay-3 col-span-2">
            <Typography variant="h3" className="card-title">המשחק שלנו</Typography>
            <Typography className="card-text">
              אנחנו משחקים עם טעמים: מעט מתוק עם מלוח, חריף עדין שמופיע בדיוק בזמן, וקינוחים שמפתיעים בכל ביס מחדש. כל ביס הוא חוויה שנועדה להעלות חיוך.
            </Typography>
          </div>

        </div>

        {/* באנר טיפים בולט ומגרה */}
        <div className="highlight-banner fade-in-up delay-4">
          <Typography variant="h4" className="highlight-title">הטיפ שלנו אליכם</Typography>
          <Typography className="highlight-text">
            בחרו חומרי גלם טריים, אל תפחדו לנסות שילובים חדשים, והכי חשוב – <strong>תהנו מכל רגע של בישול!</strong>
          </Typography>
        </div>

        {/* פוטר אודות */}
        <footer className="about-footer fade-in-up delay-5">
          <Typography className="footer-text">
            בואו ליהנות מחוויה קולינרית עם הרבה אופי, חיוך גדול, והמון טעמים מפתיעים – יהודית בטעמים מחכה לכם.
            <br />
            <span className="copyright">כל הזכויות שמורות ליהודית יברוב Y0556735623@gmail.com </span>
          </Typography>
        </footer>

      </Container>
    </div>
  );
};

export default About;