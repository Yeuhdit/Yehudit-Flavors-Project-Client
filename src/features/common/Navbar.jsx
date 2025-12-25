//src/features/common/Navbar.jsx
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    <nav>
      <div className="nav">
        <Link className="nav-link" to="/">דף הבית</Link>
        <Link className="nav-link" to="/recipes">כל המתכונים</Link>
      </div>
    </nav>
  )
}

export default Navbar