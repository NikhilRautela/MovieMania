import { Link, useLocation } from 'react-router-dom';
import '../css/Navbar.css'

function NavBar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">🎬 Movie Mania</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/favorites" className={`nav-link ${location.pathname === "/favorites" ? "active" : ""}`}>
            ❤ Favorites
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;