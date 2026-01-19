import { Link, useLocation } from "react-router-dom";
import "../styles/bottom-navigation.css";
import { IoBookmarkOutline } from "react-icons/io5";
import { GoHome } from "react-icons/go";
const BottomNavigation = () => {
  const location = useLocation();

  // Only show on Home and Saved pages
  const allowedPaths = ["/", "/saved"];
  if (!allowedPaths.includes(location.pathname)) {
    return null;
  }

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bottom-navigation">
      <Link
        to="/"
        className={`nav-item ${isActive("/") ? "active" : ""}`}
        title="Home"
      >
        <span className="nav-icon">
          <GoHome />
        </span>
        <span className="nav-text">Home</span>
      </Link>
      <Link
        to="/saved"
        className={`nav-item ${isActive("/saved") ? "active" : ""}`}
        title="Saved Videos"
      >
        <span className="nav-icon">
          <IoBookmarkOutline />
        </span>
        <span className="nav-text">Saved</span>
      </Link>
    </nav>
  );
};

export default BottomNavigation;
