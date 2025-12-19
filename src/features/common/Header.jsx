import { TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Header = () => {
  return (
    <div className="homeText">
      <TextField
        fullWidth
        placeholder="מה תרצו להכין היום?"
        InputProps={{ endAdornment: <IconButton><SearchIcon /></IconButton> }}
      />
    </div>
  );
}

export default Header;