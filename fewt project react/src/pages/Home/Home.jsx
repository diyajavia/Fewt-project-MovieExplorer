import React from "react";
import { Link } from "react-router-dom";
import { Play, Star, Calendar, ArrowRight } from "lucide-react";
import { useHomeFeeds } from "../../hooks/useMovies";
import MovieCard from "../../components/MovieCard/MovieCard";
import "./Home.css";

const Home = () => {
  const { feeds, loading, error } = useHomeFeeds();

  if (loading) {
    return (
      <div className="home-loading">
        <div className="spinner"></div>
        <p>Loading cinematic feeds...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-error container">
        <h2>Failed to load feeds</h2>
        <p>{error}</p>
      </div>
    );
  }

  // Use the first trending movie as the Hero banner movie
  const heroMovie = feeds.trending[0] || feeds.popular[0];

  const heroBackdropUrl = heroMovie?.backdrop_path
    ? `https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`
    : "";

  const heroRating = heroMovie?.vote_average ? heroMovie.vote_average.toFixed(1) : "0.0";
  const heroYear = heroMovie?.release_date ? new Date(heroMovie.release_date).getFullYear() : "";

  return (
    <div className="home-page fade-in">
      {/* Hero Banner Section */}
      {heroMovie && (
        <section
          className="hero-banner"
          style={{ backgroundImage: `url(${heroBackdropUrl})` }}
        >
          <div className="hero-overlay">
            <div className="hero-content container">
              <span className="hero-tagline">Featured Movie</span>
              <h1 className="hero-title">{heroMovie.title}</h1>
              
              <div className="hero-meta">
                <div className="hero-rating">
                  <Star size={16} fill="var(--rating-gold)" stroke="var(--rating-gold)" />
                  <span>{heroRating} Rating</span>
                </div>
                <div className="hero-year">
                  <Calendar size={16} />
                  <span>{heroYear}</span>
                </div>
              </div>

              <p className="hero-overview">{heroMovie.overview}</p>
              
              <div className="hero-actions">
                <Link to={`/movie/${heroMovie.id}`} className="btn btn-primary">
                  <Play size={18} fill="currentColor" />
                  View Details
                </Link>
                <Link to="/search" className="btn btn-secondary">
                  Explore More
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Movies Shelves Container */}
      <section className="home-shelves container">
        <MovieShelf title="Trending Movies" movies={feeds.trending} />
        <MovieShelf title="Popular Hits" movies={feeds.popular} />
        <MovieShelf title="Top Rated Classics" movies={feeds.topRated} />
        <MovieShelf title="Upcoming Releases" movies={feeds.upcoming} />
      </section>
    </div>
  );
};

// Reusable horizontal scroll shelf component
const MovieShelf = ({ title, movies }) => {
  if (!movies || movies.length === 0) return null;

  return (
    <div className="movie-shelf">
      <div className="shelf-header">
        <h2>{title}</h2>
        <Link to="/search" className="see-all-link">
          See All <ArrowRight size={16} />
        </Link>
      </div>
      <div className="shelf-track-container">
        <div className="shelf-track">
          {movies.map((movie) => (
            <div className="shelf-item" key={movie.id}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
