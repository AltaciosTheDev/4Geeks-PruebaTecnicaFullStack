import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import '../../styles/navbar.css';

export const Navbar = () => {
  const handleLogout = () => {
    // Perform logout logic (e.g., clear authentication tokens, etc.)
    localStorage.removeItem('user');
    window.location.href = '/login'; // Redirect to login page
  };

  const location = useLocation();
  const params = useParams();
  const { id } = params;
  const excludePaths = [
    "/dashboard", "/learn", "/history", "/profile", `/favorites`,
    "/login", "/signup", "/", `/single/${id}`
  ]; // Add other paths where navbar should not be shown

  const shouldExcludeNavbar = excludePaths.includes(location.pathname) ||
    (location.pathname.startsWith("/single/") && !isNaN(id));

  if (shouldExcludeNavbar) {
    return null; // Don't render the navbar if the current path is included in excludePaths
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">MyApp</Link>
        <div className="navbar-right">
          <p className="greeting">Hello, User!</p>
          <button className="logout-button" onClick={handleLogout}>Sign Out</button>
        </div>
      </div>
    </nav>
  );
};
