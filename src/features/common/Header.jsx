//src/features/common/Header.jsx
import { TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux';
import './Home.css';

const difficulties = ['קל', 'בינוני', 'קשה'];

const Header = () => {
  const categories = useSelector((state) => state.categories.allCategories);

  return (
    <div className="header-container">
      <TextField
        fullWidth
        placeholder="מה תרצו להכין היום?"
        variant="outlined"
        InputProps={{
          endAdornment: (
            <IconButton>
              <SearchIcon />
            </IconButton>
          ),
          sx: {
            borderRadius: '50px',
            backgroundColor: 'white',
            '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
          },
        }}
      />
      <div className="chips-container">
        {categories.map((cat) => (
          <button key={cat._id} className="chip-btn">
            {cat.description}
          </button>
        ))}
      </div>
      <div className="chips-container">
        {difficulties.map((d) => (
          <button key={d} className="chip-btn">
            {d}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Header;