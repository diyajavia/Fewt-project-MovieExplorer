import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import Shared Components & Error Boundary
import Header from './components/Header';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';

// Import Pages
import Home from './pages/Home';
import Search from './pages/Search';
import Watchlist from './pages/Watchlist';
import Login from './pages/Login';
import MovieDetails from './pages/MovieDetails';

function App() {
  // Watchlist State (Loads from localStorage)
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const stored = localStorage.getItem('movie_watchlist');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("Failed to parse watchlist", e);
      return [];
    }
  });

  // Authentication State (Loads from localStorage for persistence)
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('user_logged_in') === 'true';
  });
  const [username, setUsername] = useState(() => {
    return localStorage.getItem('user_name') || '';
  });

  // Save watchlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('movie_watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  // Toggle watchlist item (add/remove)
  const toggleWatchlist = (movieId) => {
    const id = Number(movieId);
    setWatchlist(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Login Handlers
  const handleLoginSuccess = (name) => {
    setIsLoggedIn(true);
    setUsername(name);
    localStorage.setItem('user_logged_in', 'true');
    localStorage.setItem('user_name', name);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    localStorage.removeItem('user_logged_in');
    localStorage.removeItem('user_name');
  };

  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100 bg-dark text-white">
        <Header 
          isLoggedIn={isLoggedIn} 
          username={username} 
          onLogout={handleLogout} 
        />
        
        <ErrorBoundary>
          <Routes>
            {/* Main and Legacy Navigation Routes */}
            <Route path="/" element={<Home watchlist={watchlist} toggleWatchlist={toggleWatchlist} />} />
            <Route path="/index.html" element={<Home watchlist={watchlist} toggleWatchlist={toggleWatchlist} />} />
            
            <Route path="/search" element={<Search watchlist={watchlist} toggleWatchlist={toggleWatchlist} />} />
            <Route path="/search.html" element={<Search watchlist={watchlist} toggleWatchlist={toggleWatchlist} />} />
            
            <Route path="/watchlist" element={<Watchlist watchlist={watchlist} toggleWatchlist={toggleWatchlist} />} />
            <Route path="/watchlist.html" element={<Watchlist watchlist={watchlist} toggleWatchlist={toggleWatchlist} />} />
            
            <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />

            {/* Dynamic Movie Details Route (Week 9) */}
            <Route path="/movie/:movieId" element={<MovieDetails watchlist={watchlist} toggleWatchlist={toggleWatchlist} />} />

            {/* Backward-Compatible Redirects for Legacy Static URLs */}
            <Route path="/movie-avatar.html" element={<Navigate to="/movie/76600" replace />} />
            <Route path="/movie-avengers.html" element={<Navigate to="/movie/299534" replace />} />
            <Route path="/movie-darkknight.html" element={<Navigate to="/movie/155" replace />} />
            <Route path="/movie-inception.html" element={<Navigate to="/movie/27205" replace />} />
            <Route path="/movie-interstellar.html" element={<Navigate to="/movie/157336" replace />} />
            <Route path="/movie-spiderverse.html" element={<Navigate to="/movie/324857" replace />} />

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ErrorBoundary>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
