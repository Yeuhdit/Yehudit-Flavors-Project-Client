//src/features/common/Header.jsx
import { TextField, IconButton, Chip } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useSelector } from 'react-redux'
import './Home.css'

const difficulties = ['קל', 'בינוני', 'קשה']

const Header = () => {
  const categories = useSelector(state => state.categories.allCategories)

  return (
    <div className="homeText">
      <TextField
        fullWidth
        placeholder="מה תרצו להכין היום?"
        InputProps={{
          endAdornment: (
            <IconButton>
              <SearchIcon />
            </IconButton>
          )
        }}
      />

      <div className="flex-center">
        {categories.map(cat => (
          <Chip key={cat._id} label={cat.description} />
        ))}
      </div>

      <div className="flex-center">
        {difficulties.map(d => (
          <Chip key={d} label={d} />
        ))}
      </div>
    </div>
  )
}

export default Header
