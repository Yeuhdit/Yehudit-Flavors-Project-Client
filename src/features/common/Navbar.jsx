//src/features/common/Navbar.jsx
import { Link } from 'react-router-dom'
import './Navbar.css'
<Link className="nav-link" to="/gallery">גלריה</Link>

export default function Navbar() {
  return (
    <nav>
      <div className="nav">
        <Link className="nav-link" to="/">דף הבית</Link>
        <Link className="nav-link" to="/recipes">מתכונים</Link>
      </div>
    </nav>
  )
}