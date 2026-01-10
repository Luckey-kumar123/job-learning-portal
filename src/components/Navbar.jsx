import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import "../styles/navbar.css";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* Left */}
      <div className="nav-left">
        <Link to="/" className="logo">
          JobLearn
        </Link>
      </div>

      {/* Hamburger (Mobile) */}
      <div
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </div>

      {/* Right */}
      <div className={`nav-right ${menuOpen ? "open" : ""}`}>
        <NavLink to="/" onClick={() => setMenuOpen(false)}>
          Home
        </NavLink>

        <NavLink to="/courses" onClick={() => setMenuOpen(false)}>
          Courses
        </NavLink>

        <NavLink to="/jobs" onClick={() => setMenuOpen(false)}>
          Jobs
        </NavLink>

        {user ? (
          <div className="user-box">
            <span className="avatar">
              {user.name?.charAt(0).toUpperCase()}
            </span>

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <NavLink
            className="login-btn"
            to="/login"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
