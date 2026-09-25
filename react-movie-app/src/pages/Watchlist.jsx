import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { getMovieDetails, MOCK_MOVIES, LEGACY_ID_MAP } from '../services/tmdbApi';

function Watchlist({ watchlist = [], toggleWatchlist }) {
  const [watchlistMovies, setWatchlistMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load watchlist movie details using useEffect and .then()
  useEffect(() => {
    if (watchlist.length === 0) {
      setWatchlistMovies([]);
      return;
    }

    setLoading(true);

    const moviePromises = watchlist.map((id) => {
      const resolvedId = LEGACY_ID_MAP[id] || id;
      const existing = MOCK_MOVIES.find((m) => m.id === Number(resolvedId) || m.id === Number(id));
      if (existing) return Promise.resolve(existing);

      return getMovieDetails(resolvedId).catch(() => ({
        id: resolvedId,
        title: `Movie #${resolvedId}`,
        poster_path: null,
        vote_average: 7.5,
        release_date: '2024-01-01'
      }));
    });

    Promise.all(moviePromises)
      .then((results) => {
        setWatchlistMovies(results.filter(Boolean));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading watchlist movies:", err);
        setLoading(false);
      });
  }, [watchlist]);

  return (
    <main style={{ paddingTop: '120px' }} className="min-vh-100 container">
      <section id="watchlist-display-section" className="py-2 mb-5">
        <div className="d-flex align-items-center justify-content-between mb-4 border-bottom border-secondary pb-3">
          <h1 className="h2 mb-0" id="watchlist-title-header">
            <i className="bi bi-bookmarks text-purple me-2"></i>My Watchlist
          </h1>
          <span className="badge bg-secondary px-3 py-2" id="watchlist-counter-badge" style={{ fontSize: '0.9rem' }}>
            Saved Movies ({watchlist.length})
          </span>
        </div>
        
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-info" role="status">
              <span className="visually-hidden">Loading watchlist...</span>
            </div>
          </div>
        ) : watchlist.length === 0 ? (
          <div className="col-12 empty-watchlist-container text-center py-5">
            <div className="empty-icon" style={{ fontSize: '4rem' }}>
              <i className="bi bi-bookmark-x"></i>
            </div>
            <h2>Your Watchlist is Empty</h2>
            <p className="text-secondary mt-2">
              Explore the live home feeds or discover page to track your favorite movies here!
            </p>
            <Link to="/" className="btn btn-premium mt-4">
              <i className="bi bi-house-door-fill"></i> Browse Movies
            </Link>
          </div>
        ) : (
          <div className="row g-4" id="watchlist-grid">
            {watchlistMovies.map(movie => (
              <div key={movie.id} className="col-6 col-md-4 col-lg-3 d-flex justify-content-center mb-4">
                <MovieCard 
                  movie={movie} 
                  watchlist={watchlist} 
                  toggleWatchlist={toggleWatchlist} 
                />
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Watchlist;
