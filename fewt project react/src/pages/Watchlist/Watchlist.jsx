import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, Film, Star, Sparkles } from "lucide-react";
import { useWatchlist } from "../../context/WatchlistContext";
import MovieCard from "../../components/MovieCard/MovieCard";
import { discoverMovies } from "../../services/tmdbApi";
import "./Watchlist.css";

const Watchlist = () => {
  const { watchlist } = useWatchlist();
  const [recommended, setRecommended] = useState([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);

  // Client-side Recommendation Engine (Level 4 Bonus)
  useEffect(() => {
    const generateRecommendations = async () => {
      if (watchlist.length === 0) {
        setRecommended([]);
        return;
      }

      setLoadingRecommendations(true);
      try {
        // Fetch all available movies (first page discovery list)
        const response = await discoverMovies({ page: 1 });
        const allMovies = response.results || [];

        // 1. Gather all genres in current watchlist and count frequency
        const watchlistGenreCounts = {};
        const watchlistedIds = new Set(watchlist.map((m) => m.id));

        watchlist.forEach((movie) => {
          if (movie.genres) {
            movie.genres.forEach((g) => {
              watchlistGenreCounts[g.id] = (watchlistGenreCounts[g.id] || 0) + 1;
            });
          }
        });

        // 2. Score other movies based on matching genres (weighted by frequency) and rating scores
        const scoredMovies = allMovies
          .filter((m) => !watchlistedIds.has(m.id)) // Recommend movies not already in watchlist
          .map((m) => {
            let genreScore = 0;
            if (m.genres) {
              m.genres.forEach((g) => {
                genreScore += watchlistGenreCounts[g.id] || 0;
              });
            }

            // Combined scoring: weight genre matches highly + add movie rating bonus
            const ratingBonus = m.vote_average ? m.vote_average * 0.1 : 0;
            const finalScore = genreScore + ratingBonus;

            return { movie: m, score: finalScore };
          });

        // 3. Sort by score high-to-low and select top 4
        scoredMovies.sort((a, b) => b.score - a.score);
        const topRecommended = scoredMovies.slice(0, 4).map((item) => item.movie);

        setRecommended(topRecommended);
      } catch (err) {
        console.error("Error generating recommendations:", err);
      } finally {
        setLoadingRecommendations(false);
      }
    };

    generateRecommendations();
  }, [watchlist]);

  return (
    <div className="watchlist-page container fade-in">
      <header className="watchlist-header">
        <h1>My Personal Watchlist</h1>
        <p>Your saved cinematic assets. Stored locally in your browser cache.</p>
      </header>

      {watchlist.length === 0 ? (
        <section className="empty-watchlist glass-panel">
          <Heart size={48} className="empty-icon" />
          <h3>Your watchlist is empty</h3>
          <p>Explore our library and tap the heart icon on any card to save movies here.</p>
          <Link to="/search" className="btn btn-primary">
            Search Movies
          </Link>
        </section>
      ) : (
        <>
          {/* Watchlist Grid */}
          <main className="movie-grid">
            {watchlist.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </main>

          {/* Custom Recommendation Engine Section */}
          <section className="recommendations-section glass-panel">
            <div className="recommendations-header">
              <Sparkles size={20} className="sparkle-icon" />
              <div>
                <h2>Engine Recommendations</h2>
                <p>Curated automatically based on your watchlist's genre profile and rating patterns.</p>
              </div>
            </div>

            {loadingRecommendations ? (
              <div className="rec-loading">
                <div className="spinner"></div>
                <p>Recalculating score matrices...</p>
              </div>
            ) : recommended.length === 0 ? (
              <p className="no-recs">Add more diverse genres to get tailored recommendations.</p>
            ) : (
              <div className="rec-grid">
                {recommended.map((movie) => (
                  <div key={movie.id} className="rec-item">
                    <div className="rec-card">
                      <img
                        src={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/w185${movie.poster_path}`
                            : "https://via.placeholder.com/150x225?text=No+Poster"
                        }
                        alt={movie.title}
                      />
                      <div className="rec-details">
                        <h4>{movie.title}</h4>
                        <div className="rec-rating">
                          <Star size={12} fill="var(--rating-gold)" stroke="var(--rating-gold)" />
                          <span>{movie.vote_average?.toFixed(1)}</span>
                        </div>
                        <Link to={`/movie/${movie.id}`} className="rec-btn">
                          View details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default Watchlist;
