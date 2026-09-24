import React from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl, getMoviePosterPlaceholder, GENRE_MAP } from '../services/tmdbApi';

function MovieCard({ movie, watchlist = [], toggleWatchlist }) {
  if (!movie) return null;

  const id = movie.id;
  const isInWatchlist = watchlist.includes(Number(id)) || watchlist.includes(id);

  const year = movie.release_date ? movie.release_date.slice(0, 4) : (movie.year || 'N/A');
  const posterUrl = getImageUrl(movie.poster_path || movie.poster, null, movie.title, year);
  const rating = Number(movie.vote_average || movie.rating || 0).toFixed(1);

  // Display runtime if available, otherwise mapped primary genre
  let metaInfo = 'Movie';
  if (movie.runtime) {
    metaInfo = typeof movie.runtime === 'number' ? `${movie.runtime} min` : movie.runtime;
  } else if (Array.isArray(movie.genres) && movie.genres.length > 0) {
    metaInfo = typeof movie.genres[0] === 'string' ? movie.genres[0] : (movie.genres[0].name || 'Movie');
  } else if (Array.isArray(movie.genre_ids) && movie.genre_ids.length > 0) {
    metaInfo = GENRE_MAP[movie.genre_ids[0]] || 'Movie';
  }

  const detailUrl = `/movie/${id}`;

  return (
    <div className="movie-card">
      <div className="movie-card-img-wrapper">
        <button
          type="button"
          className={`watchlist-btn-trigger ${isInWatchlist ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (toggleWatchlist) toggleWatchlist(id);
          }}
          aria-label="Toggle Watchlist"
          title={isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
        >
          <i className={isInWatchlist ? "bi bi-bookmark-check-fill" : "bi bi-bookmark-plus"}></i>
        </button>

        <div className="movie-rating-badge">
          <i className="bi bi-star-fill"></i> {rating}
        </div>

        <Link to={detailUrl}>
          <img
            src={posterUrl}
            alt={`${movie.title} Poster`}
            className="movie-card-img"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = getMoviePosterPlaceholder(movie.title, year);
            }}
          />
        </Link>
      </div>

      <Link to={detailUrl} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="movie-card-info">
          <h3 className="movie-card-title" title={movie.title}>{movie.title}</h3>
          <div className="movie-card-meta">
            <span>{year}</span>
            <span>{metaInfo}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default MovieCard;
