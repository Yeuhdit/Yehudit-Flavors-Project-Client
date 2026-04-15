import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import "./About.css";

const SIGNATURE = "יהודית יברוב";

const About = () => {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let timeout;
    let interval;
    const animate = () => {
      setDisplayed("");
      let i = 0;
      timeout = setInterval(() => {
        setDisplayed(SIGNATURE.slice(0, i + 1));
        i++;
        if (i === SIGNATURE.length) {
          clearInterval(timeout);
        }
      }, 120);
    };
    animate();
    interval = setInterval(animate, 3000); // כל 3 שניות
    return () => {
      clearInterval(timeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="about-wrapper" dir="rtl">
      {/* רקע מודרני עם גרדיאנטים רכים וצורות מרח */}
      <div className="modern-gradient-bg">
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
        <div className="glow-orb orb-3"></div>
      </div>

      <Container maxWidth="lg" className="about-container">
        {/* אזור הכותרת הראשית */}
        <header className="about-header text-center fade-in-up">
          <Typography variant="h1" className="massive-title">
            הסיפור <span className="text-accent">שלי.</span>
          </Typography>
          <Typography className="subtitle">
            נעים מאוד! הסיפור שלי מתחיל כמו כל שף קונדיטור אמיתי – עם ניצוץ בעיניים, לב פועם מהתרגשות, והרבה קמח על הידיים.
          </Typography>
        </header>

        {/* גריד תוכן חכם ונקי */}
        <div className="about-content-grid">
          <div className="content-card fade-in-up delay-1">
            <Typography variant="h3" className="card-title">התחלה מתוקה</Typography>
            <Typography className="card-text">
              כבר בילדותי, המטבח היה ממלכה קסומה: אמא מערבבת, התנור לוחש, ואני – עומדת על כיסא, בולעת כל רגע, מתמלאת השראה ורעב ליצירה. כל ערב היה הרפתקה חדשה, כל עוגה – מסע של טעמים, ריחות וחיוכים.
            </Typography>
          </div>

          <div className="content-card fade-in-up delay-2">
            <Typography variant="h3" className="card-title">הדרך לאמנות</Typography>
            <Typography className="card-text">
              עם השנים, האהבה שלי לאפייה ולבישול רק הלכה והתעצמה. כל הצלחה קטנה הפכה אותי לאמיצה יותר, כל כישלון – לסקרנית ויצירתית פי כמה. למדתי, ניסיתי, טעמתי, העזתי – והלב שלי התמלא בגאווה ובשמחה.
            </Typography>
          </div>

          <div className="content-card fade-in-up delay-3 col-span-2">
            <Typography variant="h3" className="card-title">היום והחזון</Typography>
            <Typography className="card-text">
              היום, אחרי אינספור שעות של לימוד, השתלמויות אצל הקונדיטורים הטובים בעולם, ומאות מתכונים שנולדו אצלי במטבח – אני כאן כדי לחלוק איתכם את כל הטוב הזה. אני מאמינה שכל קינוח הוא יצירת אמנות, כל עוגה היא חיבוק, וכל מתכון – סיפור אהבה קטן.
              <br />
              בכל אירוע, בכל חגיגה, אני נכנסת למטבח עם ברק בעיניים, מסתערת על חומרי הגלם, ויוצרת משהו חדש, יפה, מפתיע וטעים במיוחד. אני לא מפסיקה ללמוד, להתחדש, ולהתאהב מחדש בכל טרנד, טכניקה וטעם.
            </Typography>
          </div>
        </div>

        {/* באנר טיפים */}
        <div className="highlight-banner fade-in-up delay-4">
          <Typography variant="h4" className="highlight-title">הטיפ שלי אליכם</Typography>
          <Typography className="highlight-text">
            בחרו חומרי גלם טריים, אל תפחדו לנסות שילובים חדשים, והכי חשוב – <strong>תהנו מכל רגע של בישול!</strong>
          </Typography>
        </div>

        {/* פוטר אודות */}
        <footer className="about-footer fade-in-up delay-5">
          <Typography className="footer-text">
            השלמות הוויזואלית היא לא רק מטרה – היא דרך חיים. כל פטיפור, עוגה, קינוח ולקוח – מקבלים אצלי יחס אישי, תשומת לב, והמון אהבה.<br />
            אז אם אתם רוצים להפוך את האירוע שלכם לבלתי נשכח, או פשוט לפנק את עצמכם במשהו מיוחד – אני כאן בשבילכם, עם חיוך גדול, לב פתוח, וטעמים שיישארו איתכם הרבה אחרי הביס האחרון.
          </Typography>
          <div className="signature-container">
            <span className="animated-signature">{displayed}</span>
          </div>
        </footer>
      </Container>
    </div>
  );
};

export default About;