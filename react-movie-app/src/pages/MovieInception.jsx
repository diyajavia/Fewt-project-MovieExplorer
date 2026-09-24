import React from 'react';
import { Link } from 'react-router-dom';

function MovieInception({ watchlist, toggleWatchlist }) {
  const movieId = 4;
  const isInWatchlist = watchlist.includes(movieId);

  return (
    <main style={{ paddingTop: '70px' }}>
      {/* Movie Details Banner */}
      <section 
        className="detail-header" 
        style={{ backgroundImage: "url('assets/inception_image.png')" }}
        id="detail-header-section"
      >
        <div className="detail-header-overlay"></div>
        <div className="container detail-container">
          <div className="row align-items-end g-4">
            {/* Poster Column */}
            <div className="col-md-4 col-lg-3 text-center text-md-start">
              <img src="assets/inception_image.png" alt="Inception Poster" className="detail-poster" id="detail-movie-poster" />
            </div>
            {/* Info Column */}
            <div className="col-md-8 col-lg-9">
              <span className="badge bg-danger mb-3 px-3 py-2 text-uppercase tracking-wider fw-bold" id="detail-genre-badge">
                Action, Sci-Fi, Adventure
              </span>
              <h1 className="display-4 fw-extrabold text-white mb-2" id="detail-title">Inception</h1>

              <div className="d-flex align-items-center gap-3 mb-4 flex-wrap text-secondary">
                <span className="movie-badge-info text-white">
                  <i className="bi bi-star-fill text-warning me-1"></i> 8.8/10
                </span>
                <span className="movie-badge-info">2010</span>
                <span className="movie-badge-info">148 min</span>
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
                A thief who steals corporate secrets through the use of dream-sharing technology is given
                the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom
                the project.
              </p>
            </div>

            {/* Cast & Crew */}
            <div id="detail-cast-block">
              <h2 className="h3 border-bottom border-secondary pb-2 mb-4">Cast Credits</h2>
              <div className="cast-scroll-wrapper" id="cast-list">
                {/* Actor 1 */}
                <div className="cast-card">
                  <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80" alt="Leonardo DiCaprio" className="cast-img" />
                  <div className="cast-name">Leonardo DiCaprio</div>
                  <div className="cast-character">Cobb</div>
                </div>
                {/* Actor 2 */}
                <div className="cast-card">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80" alt="Joseph Gordon-Levitt" className="cast-img" />
                  <div className="cast-name">Joseph Gordon-Levitt</div>
                  <div className="cast-character">Arthur</div>
                </div>
                {/* Actor 3 */}
                <div className="cast-card">
                  <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80" alt="Elliot Page" className="cast-img" />
                  <div className="cast-name">Elliot Page</div>
                  <div className="cast-character">Ariadne</div>
                </div>
                {/* Actor 4 */}
                <div className="cast-card">
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80" alt="Tom Hardy" className="cast-img" />
                  <div className="cast-name">Tom Hardy</div>
                  <div className="cast-character">Eames</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Recommendations Column */}
          <div className="col-lg-4">
            <h2 className="h4 mb-4" id="recommendations-title">Similar Recommendations</h2>
            <div className="row g-3" id="recommendations-list">
              {/* Interstellar Card */}
              <div className="col-12">
                <div className="card bg-dark border-secondary overflow-hidden movie-card" style={{ width: '100%' }}>
                  <div className="row g-0 align-items-center">
                    <div className="col-4">
                      <Link to="/movie-interstellar.html">
                        <img src="assets/interstellar_image.png" alt="Poster" className="img-fluid" style={{ aspectRatio: '2/3', objectFit: 'cover' }} />
                      </Link>
                    </div>
                    <div className="col-8">
                      <div className="card-body py-2">
                        <h5 className="card-title text-truncate mb-1" style={{ fontSize: '0.95rem' }}>Interstellar</h5>
                        <div className="small text-secondary mb-1">
                          <i className="bi bi-star-fill text-warning me-1"></i> 8.7 | 2014
                        </div>
                        <Link to="/movie-interstellar.html" className="btn btn-sm btn-outline-info py-0 px-2" style={{ fontSize: '0.75rem' }}>
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

export default MovieInception;
