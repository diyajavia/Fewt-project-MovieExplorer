import React from "react";
import { Film, Code, Globe } from "lucide-react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer glass-panel">
      <div className="footer-container container">
        <div className="footer-brand">
          <div className="footer-logo">
            <Film className="logo-icon" />
            <span>Movie<span className="gradient-text">Explorer</span></span>
          </div>
          <p className="footer-description">
            Explore, discover, and organize your favorite cinema assets in one beautiful dashboard. Built using ReactJS and TMDB.
          </p>
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <h4>Application</h4>
            <a href="/">Home Feed</a>
            <a href="/search">Search Catalogue</a>
            <a href="/watchlist">Watchlist Hub</a>
          </div>
          <div className="footer-column">
            <h4>Data Provider</h4>
            <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">TMDB Portal</a>
            <a href="https://developer.themoviedb.org/docs" target="_blank" rel="noopener noreferrer">Developer API Docs</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom container">
        <p>&copy; {new Date().getFullYear()} MovieExplorer. Built for SEM-3 Frontend Web Technology.</p>
        <div className="footer-socials">
          <a href="#" aria-label="Source Code"><Code size={18} /></a>
          <a href="#" aria-label="Website"><Globe size={18} /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
