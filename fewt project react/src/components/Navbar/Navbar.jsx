import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Film, Search, Heart, Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useWatchlist } from "../../context/WatchlistContext";
import "./Navbar.css";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { watchlist } = useWatchlist();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar glass-panel">
      <div className="navbar-container container">
        <Link to="/" className="navbar-logo" onClick={() => setMobileMenuOpen(false)}>
          <Film className="logo-icon" />
          <span>Movie<span className="gradient-text">Explorer</span></span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="navbar-links">
          <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>
            Home
          </Link>
          <Link to="/search" className={`nav-link ${isActive("/search") ? "active" : ""}`}>
            <Search size={16} />
            Search & Filter
          </Link>
          <Link to="/watchlist" className={`nav-link ${isActive("/watchlist") ? "active" : ""}`}>
            <Heart size={16} />
            Watchlist
            {watchlist.length > 0 && (
              <span className="badge">{watchlist.length}</span>
            )}
          </Link>
        </div>

        {/* Control Switches */}
        <div className="navbar-controls">
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer glass-panel fade-in">
          <Link
            to="/"
            className={`mobile-link ${isActive("/") ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/search"
            className={`mobile-link ${isActive("/search") ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Search & Filter
          </Link>
          <Link
            to="/watchlist"
            className={`mobile-link ${isActive("/watchlist") ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Watchlist ({watchlist.length})
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
