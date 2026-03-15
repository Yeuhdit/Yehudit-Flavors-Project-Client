// react-client/src/components/CookingAnimation.jsx
import './CookingAnimation.css';

const CookingAnimation = ({ active }) => {
  if (!active) return null;

  return (
    <div className="kitchen">
      {/* Steam */}
      <div className="steam s1"></div>
      <div className="steam s2"></div>
      <div className="steam s3"></div>

      {/* Pot */}
      <div className="pot">
        <div className="lid"></div>
      </div>

      {/* Pasta + Candies */}
      <div className="pasta">
        <span>🍝</span>
        <span>🍬</span>
        <span>🍝</span>
        <span>🍬</span>
      </div>

      {/* Veggies */}
      <div className="veggies">
        <span>🥕</span>
        <span>🥦</span>
        <span>🍅</span>
        <span>🌽</span>
      </div>
    </div>
  );
};

export default CookingAnimation;