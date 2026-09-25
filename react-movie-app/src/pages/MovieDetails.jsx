import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  getMovieDetails, 
  getMovieCredits, 
  getSimilarMovies, 
  getImageUrl, 
  getBackdropUrl,
  getMoviePosterPlaceholder
} from '../services/tmdbApi';

function MovieDetails({ watchlist = [], toggleWatchlist }) {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load movie details, credits, and similar movies using useEffect and .then()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLoading(true);
    setError(null);

    Promise.all([
      getMovieDetails(movieId),
      getMovieCredits(movieId),
      getSimilarMovies(movieId)
    ])
      .then(([movieData, creditsData, similarData]) => {
        setMovie(movieData);
        setCast(creditsData?.cast || []);

        const recResults = similarData?.results || [];
        const withPosters = recResults.filter((m) => m.poster_path);
        setSimilarMovies(withPosters.length >= 4 ? withPosters : recResults);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching movie details:', err);
        setError('Failed to load movie details. Please check your connection.');
        setLoading(false);
      });
  }, [movieId]);

  const currentId = movie ? movie.id : Number(movieId);
  const isInWatchlist = watchlist.includes(Number(currentId)) || watchlist.includes(currentId);

  if (loading) {
    return (
      <main style={{ paddingTop: '150px' }} className="min-vh-100 container text-center py-5">
        <div className="spinner-border text-info" style={{ width: '3.5rem', height: '3.5rem' }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-secondary mt-3 fs-5">Fetching movie details from TMDB API...</p>
      </main>
    );
  }

  if (error || !movie) {
    return (
      <main style={{ paddingTop: '150px' }} className="min-vh-100 container py-5 text-center">
        <div className="alert alert-dark border-secondary d-inline-block text-center p-4">
          <i className="bi bi-exclamation-triangle text-danger fs-1 mb-2 d-block"></i>
          <h2 className="h4 text-white">Movie Information Unavailable</h2>
          <p className="text-secondary mb-4">{error || 'Could not find the requested movie.'}</p>
          <Link to="/" className="btn btn-premium">
            <i className="bi bi-arrow-left"></i> Return to Homepage
          </Link>
        </div>
      </main>
    );
  }

  const year = movie.release_date ? movie.release_date.slice(0, 4) : (movie.year || 'N/A');
  const backdropUrl = movie.backdrop_path || movie.backdrop
    ? getBackdropUrl(movie.backdrop_path || movie.backdrop)
    : (movie.poster_path ? getBackdropUrl(movie.poster_path) : '/assets/backdrop_placeholder.svg');
  const posterUrl = getImageUrl(movie.poster_path || movie.poster, null, movie.title, year);
  const rating = (movie.vote_average || movie.rating || 0).toFixed(1);
  const runtime = movie.runtime ? (typeof movie.runtime === 'number' ? `${movie.runtime} min` : movie.runtime) : 'N/A';
  const language = (movie.original_language || movie.language || 'en').toUpperCase();

  const genreNames = Array.isArray(movie.genres)
    ? movie.genres.map(g => typeof g === 'string' ? g : g.name).join(', ')
    : 'Feature Film';

  return (
    <main style={{ paddingTop: '70px' }}>
      {/* Movie Details Banner */}
      <section 
        className="detail-header" 
        style={{ backgroundImage: `url(${backdropUrl})` }}
        id="detail-header-section"
      >
        <div className="detail-header-overlay"></div>
        <div className="container detail-container">
          <div className="row align-items-end g-4">
            {/* Poster Column */}
            <div className="col-md-4 col-lg-3 text-center text-md-start">
              <img 
                src={posterUrl} 
                alt={`${movie.title} Poster`} 
                className="detail-poster" 
                id="detail-movie-poster"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = getMoviePosterPlaceholder(movie.title, year);
                }}
              />
            </div>

            {/* Info Column */}
            <div className="col-md-8 col-lg-9">
              <span className="badge bg-danger mb-3 px-3 py-2 text-uppercase tracking-wider fw-bold" id="detail-genre-badge">
                {genreNames}
              </span>
              <h1 className="display-4 fw-extrabold text-white mb-2" id="detail-title">{movie.title}</h1>

              <div className="d-flex align-items-center gap-3 mb-4 flex-wrap text-secondary">
                <span className="movie-badge-info text-white">
                  <i className="bi bi-star-fill text-warning me-1"></i> {rating}/10
                </span>
                <span className="movie-badge-info">{year}</span>
                <span className="movie-badge-info">{runtime}</span>
                <span className="movie-badge-info">Language: {language}</span>
              </div>

              <div className="d-flex gap-3 flex-wrap">
                <button 
                  className={`btn ${isInWatchlist ? 'btn-secondary-outline' : 'btn-premium'} btn-detail-watchlist`}
                  onClick={() => toggleWatchlist && toggleWatchlist(currentId)} 
                  id="btn-detail-watchlist-trigger"
                >
                  <i className={isInWatchlist ? "bi bi-bookmark-check-fill" : "bi bi-bookmark-plus"}></i> {isInWatchlist ? "In Watchlist" : "Add to Watchlist"}
                </button>
                <Link to="/" className="btn btn-secondary-outline" id="btn-back-home">
                  <i className="bi bi-arrow-left"></i> Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Movie Details Body */}
      <section className="container py-5" id="detail-body-section">
        <div className="row g-5">
          {/* Left Main Content Column */}
          <div className="col-lg-8">
            {/* Overview */}
            <div className="mb-5" id="detail-overview-block">
              <h2 className="h3 border-bottom border-secondary pb-2 mb-3">Synopsis</h2>
              <p className="text-secondary lead-sm" id="detail-overview-text">
                {movie.overview || "No overview available for this movie."}
              </p>
            </div>

            {/* Cast & Crew */}
            <div id="detail-cast-block">
              <h2 className="h3 border-bottom border-secondary pb-2 mb-4">Cast Credits</h2>
              {cast.length === 0 ? (
                <p className="text-secondary">Cast information is currently unavailable.</p>
              ) : (
                <div className="cast-scroll-wrapper" id="cast-list">
                  {cast.slice(0, 10).map((actor, idx) => {
                    const actorPhoto = actor.profile_path
                      ? (actor.profile_path.startsWith('http') ? actor.profile_path : getImageUrl(actor.profile_path))
                      : 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80';

                    return (
                      <div key={actor.id || idx} className="cast-card">
                        <img 
                          src={actorPhoto} 
                          alt={actor.name} 
                          className="cast-img" 
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80';
                          }}
                        />
                        <div className="cast-name" title={actor.name}>{actor.name}</div>
                        <div className="cast-character" title={actor.character}>{actor.character || 'Cast Member'}</div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right Side Recommendations Column */}
          <div className="col-lg-4">
            <h2 className="h4 mb-4" id="recommendations-title">Similar Recommendations</h2>
            <div className="row g-3" id="recommendations-list">
              {similarMovies.length === 0 ? (
                <p className="text-secondary small">No similar movie recommendations available.</p>
              ) : (
                similarMovies.slice(0, 4).map((rec) => {
                  const recYear = rec.release_date ? rec.release_date.slice(0, 4) : (rec.year || '');
                  const recPoster = getImageUrl(rec.poster_path || rec.poster, null, rec.title, recYear);
                  const recRating = (rec.vote_average || rec.rating || 0).toFixed(1);

                  return (
                    <div key={rec.id} className="col-12">
                      <div className="card bg-dark border-secondary overflow-hidden movie-card" style={{ width: '100%' }}>
                        <div className="row g-0 align-items-center">
                          <div className="col-4">
                            <Link to={`/movie/${rec.id}`}>
                              <img 
                                src={recPoster} 
                                alt={`${rec.title} Poster`} 
                                className="img-fluid" 
                                style={{ aspectRatio: '2/3', objectFit: 'cover' }}
                                onError={(e) => {
                                  e.currentTarget.onerror = null;
                                  e.currentTarget.src = getMoviePosterPlaceholder(rec.title, recYear);
                                }} 
                              />
                            </Link>
                          </div>
                          <div className="col-8">
                            <div className="card-body py-2">
                              <h5 className="card-title text-truncate mb-1" style={{ fontSize: '0.95rem' }} title={rec.title}>
                                {rec.title}
                              </h5>
                              <div className="small text-secondary mb-1">
                                <i className="bi bi-star-fill text-warning me-1"></i> {recRating} {recYear && `| ${recYear}`}
                              </div>
                              <Link to={`/movie/${rec.id}`} className="btn btn-sm btn-outline-info py-0 px-2" style={{ fontSize: '0.75rem' }}>
                                View
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default MovieDetails;
