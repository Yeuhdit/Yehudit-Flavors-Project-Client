// src/features/common/Gallery.jsx
import { useEffect, useState } from "react";
import api from "../../services/api"; // לוודא שה־api.js נכון
import './Gallery.css';

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // שליפת כל המתכונים מהשרת
    api.get("/recipes") // endpoint של המתכונים שלך
      .then(res => {
        // יוצרים מערך של URL של התמונות
        const imgs = res.data
          .filter(recipe => recipe.imagUrl) // רק מתכונים עם תמונה
          .map(recipe => recipe.imagUrl);
        setImages(imgs);
      })
      .catch(err => console.error("Error fetching images:", err));
  }, []);

  return (
    <div className="gallery">
      <h1>גלריה</h1>
      <div className="images-container">
        {images.map((img, idx) => (
          <img key={idx} src={img} alt={`img-${idx}`} />
        ))}
      </div>
    </div>
  );
};

export default Gallery;