import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, Clock, Calendar, Globe, Heart, Play, X, User } from "lucide-react";
import * as api from "../../services/tmdbApi";
import { useWatchlist } from "../../context/WatchlistContext";
import MovieCard from "../../components/MovieCard/MovieCard";
import "./MovieDetails.css";

const MovieDetails = () => {
  const { movie_id } = useParams();
  const { isInWatchlist, toggleWatchlist } = useWatchlist();

  // Page States
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trailerOpen, setTrailerOpen] = useState(false);

  useEffect(() => {
    const fetchMovieData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [movieRes, creditsRes, similarRes, videosRes] = await Promise.all([
          api.getMovieDetails(movie_id),
          api.getMovieCredits(movie_id),
          api.getSimilarMovies(movie_id),
          api.getMovieVideos(movie_id),
        ]);

        setMovie(movieRes);
        setCast(creditsRes.cast || []);
        setSimilar(similarRes.results || []);
        setVideos(videosRes.results || []);
      } catch (err) {
        console.error("Error loading movie detail parameters:", err);
        setError("Unable to retrieve movie details. It may not exist in the database.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
    // Scroll back to top on page navigation
    window.scrollTo(0, 0);
  }, [movie_id]);

  if (loading) {
    return (
      <div className="details-loading">
        <div className="spinner"></div>
        <p>Retrieving deep cinematic assets...</p>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="details-error container">
        <h2>Cinematic Asset Error</h2>
        <p>{error || "Movie details not found."}</p>
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </div>
    );
  }

  const inWatchlist = isInWatchlist(movie.id);

  // Parse image assets
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Poster+Available";

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "";

  const releaseDateFormatted = movie.release_date
    ? new Date(movie.release_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "0.0";
  
  // Find official trailer video key
  const trailer = videos.find(
    (vid) => vid.site === "YouTube" && (vid.type === "Trailer" || vid.type === "Teaser")
  ) || videos[0];

  return (
    <div className="movie-details-page fade-in">
      {/* Blurred Backdrop Hero */}
      <div
        className="details-hero"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      >
        <div className="hero-blur-overlay"></div>
      </div>

      <div className="details-content-container container">
        {/* Poster & Overview Card Grid */}
        <section className="details-main-board glass-panel">
          <div className="details-poster-col">
            <img src={posterUrl} alt={movie.title} />
          </div>

          <div className="details-info-col">
            <h1 className="details-title">{movie.title}</h1>
            {movie.tagline && <p className="details-tagline">"{movie.tagline}"</p>}

            {/* Quick Metadata Badges */}
            <div className="details-meta-badges">
              <div className="meta-badge" title="Rating">
                <Star size={16} fill="var(--rating-gold)" stroke="var(--rating-gold)" />
                <span>{rating}</span>
              </div>
              <div className="meta-badge" title="Runtime">
                <Clock size={16} />
                <span>{movie.runtime ? `${movie.runtime} min` : "N/A"}</span>
              </div>
              <div className="meta-badge" title="Release Date">
                <Calendar size={16} />
                <span>{releaseDateFormatted}</span>
              </div>
              <div className="meta-badge" title="Original Language">
                <Globe size={16} />
                <span className="lang-code">{movie.original_language}</span>
              </div>
            </div>

            {/* Genres Row */}
            {movie.genres && movie.genres.length > 0 && (
              <div className="details-genres">
                {movie.genres.map((genre) => (
                  <span className="genre-tag" key={genre.id}>
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            {/* Synopsis */}
            <div className="details-overview">
              <h3>Overview</h3>
              <p>{movie.overview || "No overview available for this movie."}</p>
            </div>

            {/* Actions Grid */}
            <div className="details-actions">
              {trailer && (
                <button className="btn btn-primary" onClick={() => setTrailerOpen(true)}>
                  <Play size={18} fill="currentColor" />
                  Watch Trailer
                </button>
              )}
              <button
                className={`btn btn-secondary ${inWatchlist ? "watchlist-active" : ""}`}
                onClick={() => toggleWatchlist(movie)}
              >
                <Heart size={18} fill={inWatchlist ? "var(--accent-primary)" : "transparent"} />
                {inWatchlist ? "Watchlisted" : "Add to Watchlist"}
              </button>
            </div>
          </div>
        </section>

        {/* Cast & Credits Section */}
        <section className="details-cast-section">
          <h2>Cast & Crew Credits</h2>
          {cast.length === 0 ? (
            <p className="no-credits">Cast information currently unavailable.</p>
          ) : (
            <div className="cast-grid">
              {cast.slice(0, 8).map((actor) => {
                const actorProfileUrl = actor.profile_path
                  ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                  : "";
                
                return (
                  <Link to={`/person/${actor.id}`} className="cast-card glass-panel" key={actor.id}>
                    <div className="actor-img">
                      {actorProfileUrl ? (
                        <img src={actorProfileUrl} alt={actor.name} />
                      ) : (
                        <div className="actor-placeholder">
                          <User size={24} />
                        </div>
                      )}
                    </div>
                    <div className="actor-info">
                      <h4>{actor.name}</h4>
                      <p>{actor.character}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        {/* Similar Recommendations Section */}
        <section className="details-similar-section">
          <h2>Similar Recommendations</h2>
          {similar.length === 0 ? (
            <p className="no-similar">No similar recommendations found for this title.</p>
          ) : (
            <div className="similar-track-container">
              <div className="similar-track">
                {similar.map((simMovie) => (
                  <div className="similar-item" key={simMovie.id}>
                    <MovieCard movie={simMovie} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Level 2 YouTube Trailer Modal System */}
      {trailerOpen && trailer && (
        <div className="trailer-modal-backdrop" onClick={() => setTrailerOpen(false)}>
          <div className="trailer-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setTrailerOpen(false)}>
              <X size={24} />
            </button>
            <div className="iframe-container">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                title={`${movie.title} Trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
