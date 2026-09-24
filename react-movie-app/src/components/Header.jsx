import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header({ isLoggedIn, username, onLogout }) {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top py-3" id="main-nav">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/" id="brand-logo">
            <i className="bi bi-film me-2"></i>CineComplex
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent"
            aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation"
            id="nav-toggle-btn">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/') || isActive('/index.html') ? 'active' : ''}`} to="/" id="link-home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/search') || isActive('/search.html') ? 'active' : ''}`} to="/search" id="link-search">Search</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/watchlist') || isActive('/watchlist.html') ? 'active' : ''}`} to="/watchlist" id="link-watchlist">Watchlist</Link>
              </li>
              {isLoggedIn ? (
                <li className="nav-item d-flex align-items-center ms-lg-2 mt-2 mt-lg-0">
                  <span className="text-info me-3 small" id="user-greeting">Hi, {username}!</span>
                  <button className="btn btn-sm btn-outline-danger" onClick={onLogout} id="btn-logout" style={{ fontSize: '0.8rem', padding: '0.25rem 0.5rem' }}>
                    Logout
                  </button>
                </li>
              ) : (
                <li className="nav-item">
                  <Link className={`nav-link ${isActive('/login') ? 'active' : ''}`} to="/login" id="link-login">
                    <i className="bi bi-person-fill me-1"></i>Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
