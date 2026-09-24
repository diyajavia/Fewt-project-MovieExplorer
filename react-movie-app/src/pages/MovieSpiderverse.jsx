import React from 'react';
import { Link } from 'react-router-dom';

function MovieSpiderverse({ watchlist, toggleWatchlist }) {
  const movieId = 5;
  const isInWatchlist = watchlist.includes(movieId);

  return (
    <main style={{ paddingTop: '70px' }}>
      {/* Movie Details Banner */}
      <section 
        className="detail-header" 
        style={{ backgroundImage: "url('assets/spiderverse_image.png')" }}
        id="detail-header-section"
      >
        <div className="detail-header-overlay"></div>
        <div className="container detail-container">
          <div className="row align-items-end g-4">
            {/* Poster Column */}
            <div className="col-md-4 col-lg-3 text-center text-md-start">
              <img src="assets/spiderverse_image.png" alt="Spider-Man Poster" className="detail-poster" id="detail-movie-poster" />
            </div>
            {/* Info Column */}
            <div className="col-md-8 col-lg-9">
              <span className="badge bg-danger mb-3 px-3 py-2 text-uppercase tracking-wider fw-bold" id="detail-genre-badge">
                Animation, Action, Adventure
              </span>
              <h1 className="display-4 fw-extrabold text-white mb-2" id="detail-title">Spider-Man: Into the Spider-Verse</h1>

              <div className="d-flex align-items-center gap-3 mb-4 flex-wrap text-secondary">
                <span className="movie-badge-info text-white">
                  <i className="bi bi-star-fill text-warning me-1"></i> 8.4/10
                </span>
                <span className="movie-badge-info">2018</span>
                <span className="movie-badge-info">117 min</span>
                <span className="movie-badge-info">Language: EN</span>
              </div>

              <div className="d-flex gap-3 flex-wrap">
                <button 
                  className={`btn ${isInWatchlist ? 'btn-secondary-outline' : 'btn-premium'} btn-detail-watchlist`}
                  onClick={() => toggleWatchlist(movieId)} 
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
                Teen Miles Morales becomes the Spider-Man of his universe and must join with five
                spider-powered individuals from other dimensions to stop a threat for all realities.
              </p>
            </div>

            {/* Cast & Crew */}
            <div id="detail-cast-block">
              <h2 className="h3 border-bottom border-secondary pb-2 mb-4">Cast Credits</h2>
              <div className="cast-scroll-wrapper" id="cast-list">
                {/* Actor 1 */}
                <div className="cast-card">
                  <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80" alt="Shameik Moore" className="cast-img" />
                  <div className="cast-name">Shameik Moore</div>
                  <div className="cast-character">Miles Morales</div>
                </div>
                {/* Actor 2 */}
                <div className="cast-card">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80" alt="Jake Johnson" className="cast-img" />
                  <div className="cast-name">Jake Johnson</div>
                  <div className="cast-character">Peter B. Parker</div>
                </div>
                {/* Actor 3 */}
                <div className="cast-card">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80" alt="Hailee Steinfeld" className="cast-img" />
                  <div className="cast-name">Hailee Steinfeld</div>
                  <div className="cast-character">Gwen Stacy</div>
                </div>
                {/* Actor 4 */}
                <div className="cast-card">
                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80" alt="Mahershala Ali" className="cast-img" />
                  <div className="cast-name">Mahershala Ali</div>
                  <div className="cast-character">Uncle Aaron</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Recommendations Column */}
          <div className="col-lg-4">
            <h2 className="h4 mb-4" id="recommendations-title">Similar Recommendations</h2>
            <div className="row g-3" id="recommendations-list">
              {/* Avengers Card */}
              <div className="col-12">
                <div className="card bg-dark border-secondary overflow-hidden movie-card" style={{ width: '100%' }}>
                  <div className="row g-0 align-items-center">
                    <div className="col-4">
                      <Link to="/movie-avengers.html">
                        <img src="assets/avengers_image.png" alt="Poster" className="img-fluid" style={{ aspectRatio: '2/3', objectFit: 'cover' }} />
                      </Link>
                    </div>
                    <div className="col-8">
                      <div className="card-body py-2">
                        <h5 className="card-title text-truncate mb-1" style={{ fontSize: '0.95rem' }}>Avengers: Endgame</h5>
                        <div className="small text-secondary mb-1">
                          <i className="bi bi-star-fill text-warning me-1"></i> 8.3 | 2019
                        </div>
                        <Link to="/movie-avengers.html" className="btn btn-sm btn-outline-info py-0 px-2" style={{ fontSize: '0.75rem' }}>
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Avatar Card */}
              <div className="col-12">
                <div className="card bg-dark border-secondary overflow-hidden movie-card" style={{ width: '100%' }}>
                  <div className="row g-0 align-items-center">
                    <div className="col-4">
                      <Link to="/movie-avatar.html">
                        <img src="assets/avatar_image.png" alt="Poster" className="img-fluid" style={{ aspectRatio: '2/3', objectFit: 'cover' }} />
                      </Link>
                    </div>
                    <div className="col-8">
                      <div className="card-body py-2">
                        <h5 className="card-title text-truncate mb-1" style={{ fontSize: '0.95rem' }}>Avatar: The Way of Water</h5>
                        <div className="small text-secondary mb-1">
                          <i className="bi bi-star-fill text-warning me-1"></i> 7.6 | 2022
                        </div>
                        <Link to="/movie-avatar.html" className="btn btn-sm btn-outline-info py-0 px-2" style={{ fontSize: '0.75rem' }}>
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default MovieSpiderverse;
