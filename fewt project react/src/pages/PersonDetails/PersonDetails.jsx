import React, { useState, useEffect } from "react";
import { useParams as useRouteParams, Link as RouterLink } from "react-router-dom";
import { Calendar, MapPin, Film, Star, ChevronLeft } from "lucide-react";
import * as api from "../../services/tmdbApi";
import "./PersonDetails.css";

const PersonDetails = () => {
  const { person_id } = useRouteParams();

  const [person, setPerson] = useState(null);
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPersonData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [detailsRes, creditsRes] = await Promise.all([
          api.getPersonDetails(person_id),
          api.getPersonCredits(person_id),
        ]);
        setPerson(detailsRes);
        setCredits(creditsRes.cast || []);
      } catch (err) {
        console.error("Error loading actor details:", err);
        setError("Unable to retrieve biographical information.");
      } finally {
        setLoading(false);
      }
    };

    fetchPersonData();
    window.scrollTo(0, 0);
  }, [person_id]);

  if (loading) {
    return (
      <div className="person-loading">
        <div className="spinner"></div>
        <p>Retrieving actor biography profile...</p>
      </div>
    );
  }

  if (error || !person) {
    return (
      <div className="person-error container">
        <h2>Biographical Profile Error</h2>
        <p>{error || "Actor profile not found."}</p>
        <RouterLink to="/" className="btn btn-primary">Back to Home</RouterLink>
      </div>
    );
  }

  const profileUrl = person.profile_path
    ? `https://image.tmdb.org/t/p/h632${person.profile_path}`
    : "https://via.placeholder.com/300x450?text=No+Image+Available";

  return (
    <div className="person-details-page container fade-in">
      <div className="back-nav">
        <RouterLink to={-1} className="back-link">
          <ChevronLeft size={18} />
          <span>Back</span>
        </RouterLink>
      </div>

      <div className="person-board glass-panel">
        <div className="person-profile-col">
          <img src={profileUrl} alt={person.name} />
        </div>

        <div className="person-info-col">
          <h1 className="person-name">{person.name}</h1>

          <div className="person-meta-details">
            {person.birthday && (
              <div className="meta-item">
                <Calendar size={18} />
                <span>Born: {new Date(person.birthday).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            )}
            {person.place_of_birth && (
              <div className="meta-item">
                <MapPin size={18} />
                <span>From: {person.place_of_birth}</span>
              </div>
            )}
          </div>

          <div className="person-biography">
            <h3>Biography</h3>
            <p>{person.biography || "Biography details are currently not available for this performer."}</p>
          </div>
        </div>
      </div>

      {/* Filmography Section */}
      <section className="person-filmography">
        <h2>Filmography</h2>
        {credits.length === 0 ? (
          <p className="no-credits">No filmography listings found.</p>
        ) : (
          <div className="filmography-grid">
            {credits.map((movie) => {
              const moviePoster = movie.poster_path
                ? `https://image.tmdb.org/t/p/w185${movie.poster_path}`
                : "https://via.placeholder.com/185x278?text=No+Poster";
              
              const mRating = movie.vote_average ? movie.vote_average.toFixed(1) : "0.0";

              return (
                <RouterLink to={`/movie/${movie.id}`} className="filmography-card glass-panel" key={movie.id}>
                  <div className="filmography-poster">
                    <img src={moviePoster} alt={movie.title} loading="lazy" />
                  </div>
                  <div className="filmography-details">
                    <h4 title={movie.title}>{movie.title}</h4>
                    <p className="role-text">{movie.character}</p>
                    <div className="filmography-rating">
                      <Star size={12} fill="var(--rating-gold)" stroke="var(--rating-gold)" />
                      <span>{mRating}</span>
                    </div>
                  </div>
                </RouterLink>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default PersonDetails;
