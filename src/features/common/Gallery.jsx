// // react-client/src/features/common/Gallery.jsx
// import { useEffect, useState } from "react";
// import api from "../../services/api"; // לוודא שה־api.js נכון
// import './Gallery.css';

// const Gallery = () => {
//   const [images, setImages] = useState([]);

//   useEffect(() => {
//     // שליפת כל המתכונים מהשרת
//     api.get("/recipes") // endpoint של המתכונים שלך
//       .then(res => {
//         // יוצרים מערך של URL של התמונות
//         const imgs = res.data
//           .filter(recipe => recipe.imagUrl) // רק מתכונים עם תמונה
//           .map(recipe => recipe.imagUrl);
//         setImages(imgs);
//       })
//       .catch(err => console.error("Error fetching images:", err));
//   }, []);

//   return (
//     <div className="gallery">
//       <h1>גלריה</h1>
//       <div className="images-container">
//         {images.map((img, idx) => (
//           <img key={idx} src={img} alt={`img-${idx}`} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Gallery;
// react-client/src/features/common/Gallery.jsx
import { useEffect, useState } from "react";
import api from "../../services/api";
import './Gallery.css';

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // התיקון: נתיב מדויק לפי השרת שלך
    api.get("/recipes/getallrecipes") 
      .then(res => {
        // התיקון: שואבים את imageUrl (או image) לפי איך שזה שמור במונגו
        const imgs = res.data
          .filter(recipe => recipe.imageUrl || recipe.image) 
          .map(recipe => {
            const rawName = recipe.imageUrl || recipe.image;
            const cleanName = rawName.split("/").pop().split("\\").pop();
            const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
            const BASE_URL = isLocalhost ? "http://localhost:5005" : "https://yhudit-backend-project.onrender.com";
            return `${BASE_URL}/images/${cleanName}`;
          });
        setImages(imgs);
      })
      .catch(err => console.error("Error fetching images:", err));
  }, []);

  return (
    <div className="gallery" dir="rtl">
      <h1>הגלריה המגרה שלנו</h1>
      <div className="images-container">
        {images.map((img, idx) => (
          <img key={idx} src={img} alt={`recipe-img-${idx}`} />
        ))}
      </div>
    </div>
  );
};

export default Gallery;