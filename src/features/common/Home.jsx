import React, { useEffect, useState } from 'react';
import './Home.css';

const foodItems = ['🍗','🥩','🧀','🥦','🥕','🥚','🍞','🥖','🥐','🥟','🍖','🥓','🍕','🌭','🍔'];
const bgEmojis = ['🥘','🍲','🥣','🥗','🥫','🍳','🥚','🧄','🧈','🥛','🥖','🍞','🫓','🥐','🥯','🫔','🥟','🥩','🍖','🥓','🥗','🥦','🥕','🌶','🫑'];

const Home = () => {
  const [emojiGrid, setEmojiGrid] = useState([]);

  useEffect(() => {
    // יוצרים מערך של מאות אימוג'ים למלא את המסך
    const rows = Math.ceil(window.innerHeight / 40);
    const cols = Math.ceil(window.innerWidth / 40);
    const grid = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        const emoji = bgEmojis[Math.floor(Math.random() * bgEmojis.length)];
        row.push({ emoji, left: j * 40, top: i * 40, id: `${i}-${j}-${Date.now()}` });
      }
      grid.push(row);
    }
    setEmojiGrid(grid);
  }, []);

  return (
    <div className="home-scene">
      {/* רקע מלא אימוג'ים */}
      <div className="emoji-background">
        {emojiGrid.map((row, i) =>
          row.map(cell => (
            <div
              key={cell.id}
              className="bg-emoji"
              style={{
                left: `${cell.left}px`,
                top: `${cell.top}px`,
                animationDelay: `${Math.random() * 3}s`
              }}
            >
              {cell.emoji}
            </div>
          ))
        )}
      </div>
<div className="kitchen-right">
  <div className="pot">
    <div className="lid"></div>
  </div>
  <div className="fire"></div>
</div>
      {/* כותרת במרכז */}
      <div className="center-title">המטבח של יהודית</div>

      {/* צד שמאל */}
      <div className="kitchen-left">
        <div className="spoon"></div>
        <div className="steam-lines"></div>
      </div>

      {/* צד ימין */}
      <div className="kitchen-right">
        <div className="pot">
          <div className="lid"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;