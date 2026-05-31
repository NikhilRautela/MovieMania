import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../css/Navbar.css'

function NavBar() {
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

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

      <div className="navbar-user">
        {currentUser ? (
          <>
            <div className="user-info">
              {currentUser.photoURL ? (
                <img src={currentUser.photoURL} alt="avatar" className="user-avatar" />
              ) : (
                <div className="user-initials">
                  {currentUser.email[0].toUpperCase()}
                </div>
              )}
              <span className="user-email">{currentUser.displayName || currentUser.email}</span>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="login-link">Sign In</Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;