import React from "react";
import { Link } from "react-router-dom";
import { Star, Heart, BookmarkCheck } from "lucide-react";
import { useWatchlist } from "../../context/WatchlistContext";
import "./MovieCard.css";

const MovieCard = ({ movie }) => {
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  
  const inWatchlist = isInWatchlist(movie.id);

  // Parse image path correctly
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Poster+Available";

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";

  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "0.0";

  return (
    <div className="movie-card fade-in">
      <div className="movie-card-media">
        <img src={posterUrl} alt={movie.title} loading="lazy" />
        
        {/* Watchlist Toggle Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWatchlist(movie);
          }}
          className={`watchlist-toggle ${inWatchlist ? "active" : ""}`}
          aria-label={inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
        >
          <Heart size={16} fill={inWatchlist ? "var(--accent-primary)" : "transparent"} />
        </button>

        {/* Floating Rating Badge */}
        <div className="rating-badge">
          <Star size={12} fill="var(--rating-gold)" stroke="var(--rating-gold)" />
          <span>{rating}</span>
        </div>

        {/* Hover info overlay */}
        <Link to={`/movie/${movie.id}`} className="card-overlay">
          <div className="overlay-info">
            <span className="release-year">{releaseYear}</span>
            <p className="overview-snippet">
              {movie.overview
                ? movie.overview.slice(0, 100) + "..."
                : "No synopsis available."}
            </p>
            <span className="view-details-link">View Details</span>
          </div>
        </Link>
      </div>

      <div className="movie-card-info">
        <Link to={`/movie/${movie.id}`} className="movie-title-link">
          <h3 className="movie-card-title" title={movie.title}>{movie.title}</h3>
        </Link>
        <span className="movie-card-meta">{releaseYear}</span>
      </div>
    </div>
  );
};

export default MovieCard;
