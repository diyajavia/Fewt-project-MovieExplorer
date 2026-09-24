import React from 'react';
import { Link } from 'react-router-dom';

function MovieInterstellar({ watchlist, toggleWatchlist }) {
  const movieId = 2;
  const isInWatchlist = watchlist.includes(movieId);

  return (
    <main style={{ paddingTop: '70px' }}>
      {/* Movie Details Banner */}
      <section 
        className="detail-header" 
        style={{ backgroundImage: "url('assets/interstellar_image.png')" }}
        id="detail-header-section"
      >
        <div className="detail-header-overlay"></div>
        <div className="container detail-container">
          <div className="row align-items-end g-4">
            {/* Poster Column */}
            <div className="col-md-4 col-lg-3 text-center text-md-start">
              <img src="assets/interstellar_image.png" alt="Interstellar Poster" className="detail-poster" id="detail-movie-poster" />
            </div>
            {/* Info Column */}
            <div className="col-md-8 col-lg-9">
              <span className="badge bg-danger mb-3 px-3 py-2 text-uppercase tracking-wider fw-bold" id="detail-genre-badge">
                Sci-Fi, Drama, Adventure
              </span>
              <h1 className="display-4 fw-extrabold text-white mb-2" id="detail-title">Interstellar</h1>

              <div className="d-flex align-items-center gap-3 mb-4 flex-wrap text-secondary">
                <span className="movie-badge-info text-white">
                  <i className="bi bi-star-fill text-warning me-1"></i> 8.7/10
                </span>
                <span className="movie-badge-info">2014</span>
                <span className="movie-badge-info">169 min</span>
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
                The adventures of a group of explorers who make use of a newly discovered wormhole to
                surpass the limitations on human space travel and conquer the vast distances involved in an
                interstellar voyage.
              </p>
            </div>

            {/* Cast & Crew */}
            <div id="detail-cast-block">
              <h2 className="h3 border-bottom border-secondary pb-2 mb-4">Cast Credits</h2>
              <div className="cast-scroll-wrapper" id="cast-list">
                {/* Actor 1 */}
                <div className="cast-card">
                  <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80" alt="Matthew McConaughey" className="cast-img" />
                  <div className="cast-name">Matthew McConaughey</div>
                  <div className="cast-character">Cooper</div>
                </div>
                {/* Actor 2 */}
                <div className="cast-card">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80" alt="Anne Hathaway" className="cast-img" />
                  <div className="cast-name">Anne Hathaway</div>
                  <div className="cast-character">Brand</div>
                </div>
                {/* Actor 3 */}
                <div className="cast-card">
                  <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80" alt="Jessica Chastain" className="cast-img" />
                  <div className="cast-name">Jessica Chastain</div>
                  <div className="cast-character">Murph</div>
                </div>
                {/* Actor 4 */}
                <div className="cast-card">
                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80" alt="Michael Caine" className="cast-img" />
                  <div className="cast-name">Michael Caine</div>
                  <div className="cast-character">Professor Brand</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Recommendations Column */}
          <div className="col-lg-4">
            <h2 className="h4 mb-4" id="recommendations-title">Similar Recommendations</h2>
            <div className="row g-3" id="recommendations-list">
              {/* Inception Card */}
              <div className="col-12">
                <div className="card bg-dark border-secondary overflow-hidden movie-card" style={{ width: '100%' }}>
                  <div className="row g-0 align-items-center">
                    <div className="col-4">
                      <Link to="/movie-inception.html">
                        <img src="assets/inception_image.png" alt="Poster" className="img-fluid" style={{ aspectRatio: '2/3', objectFit: 'cover' }} />
                      </Link>
                    </div>
                    <div className="col-8">
                      <div className="card-body py-2">
                        <h5 className="card-title text-truncate mb-1" style={{ fontSize: '0.95rem' }}>Inception</h5>
                        <div className="small text-secondary mb-1">
                          <i className="bi bi-star-fill text-warning me-1"></i> 8.8 | 2010
                        </div>
                        <Link to="/movie-inception.html" className="btn btn-sm btn-outline-info py-0 px-2" style={{ fontSize: '0.75rem' }}>
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Dark Knight Card */}
              <div className="col-12">
                <div className="card bg-dark border-secondary overflow-hidden movie-card" style={{ width: '100%' }}>
                  <div className="row g-0 align-items-center">
                    <div className="col-4">
                      <Link to="/movie-darkknight.html">
                        <img src="assets/darkknight_image.png" alt="Poster" className="img-fluid" style={{ aspectRatio: '2/3', objectFit: 'cover' }} />
                      </Link>
                    </div>
                    <div className="col-8">
                      <div className="card-body py-2">
                        <h5 className="card-title text-truncate mb-1" style={{ fontSize: '0.95rem' }}>The Dark Knight</h5>
                        <div className="small text-secondary mb-1">
                          <i className="bi bi-star-fill text-warning me-1"></i> 9.0 | 2008
                        </div>
                        <Link to="/movie-darkknight.html" className="btn btn-sm btn-outline-info py-0 px-2" style={{ fontSize: '0.75rem' }}>
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

export default MovieInterstellar;
