import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { 
  getTrendingMovies, 
  getPopularMovies, 
  getTopRatedMovies, 
  getUpcomingMovies, 
  getBackdropUrl,
  GENRE_MAP
} from '../services/tmdbApi';

function Home({ watchlist = [], toggleWatchlist }) {
  const navigate = useNavigate();
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Live search state
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch movies on page load using useEffect and .then()
  useEffect(() => {
    setLoading(true);
    setError(null);

    Promise.all([
      getTrendingMovies(),
      getPopularMovies(),
      getTopRatedMovies(),
      getUpcomingMovies()
    ])
      .then(([trendingData, popularData, topRatedData, upcomingData]) => {
        setTrendingMovies(trendingData?.results || []);
        setPopularMovies(popularData?.results || []);
        setTopRatedMovies(topRatedData?.results || []);
        setUpcomingMovies(upcomingData?.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching movie feeds:', err);
        setError('Failed to fetch live movie data.');
        setLoading(false);
      });
  }, []);

  const handleLiveSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Select hero movie: #1 trending movie from TMDB live feed
  const heroMovie = trendingMovies[0] || popularMovies[0] || null;
  const heroBackdrop = heroMovie?.backdrop_path 
    ? getBackdropUrl(heroMovie.backdrop_path)
    : (heroMovie?.poster_path 
        ? getBackdropUrl(heroMovie.poster_path) 
        : '/assets/backdrop_placeholder.svg');

  const heroRating = heroMovie ? (heroMovie.vote_average || heroMovie.rating || 0).toFixed(1) : '8.3';
  const heroYear = heroMovie?.release_date ? heroMovie.release_date.slice(0, 4) : '2026';
  
  // Format hero genres from TMDB genre_ids
  let heroGenres = 'Action, Adventure, Sci-Fi';
  if (heroMovie?.genres && heroMovie.genres.length > 0) {
    heroGenres = heroMovie.genres.map(g => typeof g === 'string' ? g : g.name).join(', ');
  } else if (heroMovie?.genre_ids && heroMovie.genre_ids.length > 0) {
    heroGenres = heroMovie.genre_ids.map(id => GENRE_MAP[id]).filter(Boolean).slice(0, 3).join(', ');
  }

  const isHeroInWatchlist = heroMovie 
    ? (watchlist.includes(Number(heroMovie.id)) || watchlist.includes(heroMovie.id)) 
    : false;

  return (
    <main style={{ paddingTop: '70px' }}>
      {/* Hero Banner: Dynamically Rendered from Live #1 TMDB Trending Movie */}
      <section 
        className="hero-banner" 
        style={{ backgroundImage: `url(${heroBackdrop})` }}
        id="hero-banner-section"
      >
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <span 
            className="badge bg-danger mb-3 px-3 py-2 text-uppercase tracking-wider fw-bold" 
            id="trending-tag"
            style={{ letterSpacing: '0.1em' }}
          >
            <i className="bi bi-fire me-1"></i> #1 Trending Live Feed
          </span>
          <h1 className="hero-title" id="hero-title-endgame">
            {heroMovie ? heroMovie.title : 'Loading Featured Movie...'}
          </h1>
          <div className="d-flex align-items-center gap-3 mb-3 flex-wrap text-secondary">
            <span className="movie-badge-info text-white">
              <i className="bi bi-star-fill text-warning me-1"></i> {heroRating}
            </span>
            <span>{heroYear}</span>
            <span>{heroGenres}</span>
            <span className="badge bg-secondary text-uppercase">{heroMovie?.original_language || 'EN'}</span>
          </div>
          <p 
            className="lead text-light mb-4" 
            id="hero-desc-endgame"
            style={{ maxWidth: '650px', fontSize: '1.05rem', opacity: 0.9 }}
          >
            {heroMovie ? heroMovie.overview : "Fetching real-time movie overview from TMDB database..."}
          </p>
          <div className="d-flex gap-3 flex-wrap">
            {heroMovie && (
              <Link to={`/movie/${heroMovie.id}`} className="btn btn-premium" id="btn-hero-info">
                <i className="bi bi-info-circle-fill"></i> View Details
              </Link>
            )}
            {heroMovie && (
              <button 
                className={`btn ${isHeroInWatchlist ? 'btn-secondary-outline' : 'btn-premium'} btn-detail-watchlist`}
                onClick={() => toggleWatchlist && toggleWatchlist(heroMovie.id)} 
                id="btn-hero-watchlist" 
                title={isHeroInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
              >
                <i className={isHeroInWatchlist ? "bi bi-bookmark-check-fill" : "bi bi-bookmark-plus"}></i> {isHeroInWatchlist ? "In Watchlist" : "Add to Watchlist"}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Live Search Interactive Strip (Week 8) */}
      <section className="container mt-4 mb-2">
        <form onSubmit={handleLiveSearchSubmit} className="search-input-group">
          <i className="bi bi-search ms-3 text-secondary fs-5"></i>
          <input 
            type="text" 
            className="search-input-field" 
            placeholder="Live search real movies across TMDB database..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="btn btn-premium my-1 me-1">
            Search
          </button>
        </form>
      </section>

      {/* Loading Indicator */}
      {loading && (
        <div className="container text-center py-5">
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading live feeds...</span>
          </div>
          <p className="text-secondary mt-3">Connecting to live TMDB API endpoints...</p>
        </div>
      )}

      {/* Error Notice */}
      {error && !loading && (
        <div className="container py-3">
          <div className="alert alert-dark border-secondary text-secondary">
            <i className="bi bi-info-circle me-2 text-info"></i>
            {error} Showing cached database.
          </div>
        </div>
      )}

      {!loading && (
        <>
          {/* Trending Now Section */}
          <section className="container py-4" id="trending-scroller-section">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h2 className="mb-0">
                <i className="bi bi-fire text-danger me-2"></i>Trending Now
              </h2>
              <Link to="/search" className="text-decoration-none text-info" id="view-all-trending">
                View All <i className="bi bi-chevron-right"></i>
              </Link>
            </div>

            <div className="movie-scroll-wrapper" id="trending-scroller">
              {trendingMovies.map(movie => (
                <MovieCard 
                  key={`trending-${movie.id}`} 
                  movie={movie} 
                  watchlist={watchlist} 
                  toggleWatchlist={toggleWatchlist} 
                />
              ))}
            </div>
          </section>

          {/* Popular Movies Section */}
          <section className="container py-4" id="popular-scroller-section">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h2 className="mb-0">
                <i className="bi bi-graph-up-arrow text-primary me-2"></i>Popular Hits
              </h2>
              <Link to="/search" className="text-decoration-none text-info">
                View All <i className="bi bi-chevron-right"></i>
              </Link>
            </div>

            <div className="movie-scroll-wrapper" id="popular-scroller">
              {popularMovies.map(movie => (
                <MovieCard 
                  key={`popular-${movie.id}`} 
                  movie={movie} 
                  watchlist={watchlist} 
                  toggleWatchlist={toggleWatchlist} 
                />
              ))}
            </div>
          </section>

          {/* Top Rated Masterpieces Section */}
          <section className="container py-4" id="top-rated-scroller-section">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h2 className="mb-0">
                <i className="bi bi-trophy-fill text-warning me-2"></i>Top Rated Masterpieces
              </h2>
              <Link to="/search" className="text-decoration-none text-info">
                View All <i className="bi bi-chevron-right"></i>
              </Link>
            </div>

            <div className="movie-scroll-wrapper" id="top-rated-scroller">
              {topRatedMovies.map(movie => (
                <MovieCard 
                  key={`top-${movie.id}`} 
                  movie={movie} 
                  watchlist={watchlist} 
                  toggleWatchlist={toggleWatchlist} 
                />
              ))}
            </div>
          </section>

          {/* Upcoming Releases Section */}
          <section className="container py-4 mb-5" id="upcoming-scroller-section">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h2 className="mb-0">
                <i className="bi bi-calendar-event-fill text-success me-2"></i>Upcoming Releases
              </h2>
              <Link to="/search" className="text-decoration-none text-info">
                View All <i className="bi bi-chevron-right"></i>
              </Link>
            </div>

            <div className="movie-scroll-wrapper" id="upcoming-scroller">
              {upcomingMovies.map(movie => (
                <MovieCard 
                  key={`upcoming-${movie.id}`} 
                  movie={movie} 
                  watchlist={watchlist} 
                  toggleWatchlist={toggleWatchlist} 
                />
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  );
}

export default Home;
