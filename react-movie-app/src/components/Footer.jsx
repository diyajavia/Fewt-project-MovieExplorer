import React from 'react';

function Footer() {
  return (
    <footer className="py-5 text-center text-secondary mt-auto" id="main-footer">
      <div className="container">
        <p className="mb-2">
          <span className="text-white fw-bold">
            <i className="bi bi-film me-2"></i>CineVerse
          </span> - Premium Static Movie Portal
        </p>
        <p className="small text-secondary-50">
          &copy; 2026 CineVerse. Built with Bootstrap and React Router.
        </p>
        <div className="d-flex justify-content-center gap-3 mt-3">
          <a href="#" className="text-secondary hover-text-white" aria-label="Privacy Policy">
            <i className="bi bi-shield-lock-fill"></i>
          </a>
          <a href="#" className="text-secondary hover-text-white" aria-label="Github">
            <i className="bi bi-github"></i>
          </a>
          <a href="#" className="text-secondary hover-text-white" aria-label="Terms of Service">
            <i className="bi bi-file-earmark-text-fill"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
