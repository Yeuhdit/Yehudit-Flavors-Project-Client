//src/features/common/Gallery.jsx
import './Gallery.css'

// ייבוא כל התמונות מהתיקייה
const importAll = (r) => r.keys().map(r);
const images = importAll(require.context('../../images', false, /\.(png|jpe?g|svg)$/));

const Gallery = () => {
  return (
    <div className="gallery">
      <h1>גלריה</h1>
      <div className="images-container">
        {images.map((img, idx) => (
          <img key={idx} src={img} alt={`img-${idx}`} />
        ))}
      </div>
    </div>
  )
}

export default Gallery