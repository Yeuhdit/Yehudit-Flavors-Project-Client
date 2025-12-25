// src/features/common/Header.jsx
import { TextField, IconButton, Chip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const difficulties = ['קל', 'בינוני', 'קשה'];

const Header = () => {
  return (
    <div className="homeText">
      {/* שדה חיפוש */}
      <TextField
        fullWidth
        placeholder="מה תרצו להכין היום?"
        InputProps={{ endAdornment: <IconButton><SearchIcon /></IconButton> }}
      />
      
      {/* קטגוריות */}
      <div className="categories flex-center">
        <Chip label="כללי" clickable />
      </div>
      
      {/* רמות קושי */}
      <div className="difficulty flex-center">
        {difficulties.map(dif => (
          <Chip key={dif} label={dif} clickable />
        ))}
      </div>
    </div>
  );
}

export default Header;