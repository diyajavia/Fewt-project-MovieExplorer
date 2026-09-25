import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { 
  searchMovies, 
  discoverMovies, 
  getGenres 
} from '../services/tmdbApi';

function Search({ watchlist = [], toggleWatchlist }) {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // State for query and filters
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');
  const [yearEra, setYearEra] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // Genres from TMDB
  const [genresList, setGenresList] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Fetch genres on mount using useEffect and .then()
  useEffect(() => {
    getGenres()
      .then((data) => {
        if (data?.genres) {
          setGenresList(data.genres);
        }
      })
      .catch((err) => console.error("Error fetching genres:", err));
  }, []);

  // Update query state if URL parameter changes
  useEffect(() => {
    const urlQuery = searchParams.get('q');
    if (urlQuery !== null && urlQuery !== query) {
      setQuery(urlQuery);
      setPage(1);
    }
  }, [searchParams]);

  // 2. Fetch movies using useEffect and .then() whenever query, filters, or page change
  useEffect(() => {
    setLoading(true);
    setError(null);

    const apiCall = query.trim()
      ? searchMovies(query.trim(), page)
      : discoverMovies({
          genreId: genre,
          rating: rating,
          year: yearEra,
          page: page,
          sortBy: 'popularity.desc'
        });

    apiCall
      .then((data) => {
        setMovies(data?.results || []);
        setTotalPages(data?.total_pages || 1);
        setTotalResults(data?.total_results || (data?.results ? data.results.length : 0));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch movies in Search:", err);
        setError("Failed to fetch movie results. Please try again.");
        setLoading(false);
      });
  }, [query, genre, rating, yearEra, page]);

  // Handle Search Input Change
  const handleQueryChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setPage(1);
    if (newQuery.trim()) {
      setSearchParams({ q: newQuery.trim() });
    } else {
      setSearchParams({});
    }
  };

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
    setPage(1);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
    setPage(1);
  };

  const handleYearChange = (e) => {
    setYearEra(e.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }
  };

  return (
    <main style={{ paddingTop: '120px' }} className="min-vh-100 container">
      {/* Search and Filter Controls */}
      <section id="search-controls-container" className="mb-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <h1 className="mb-4 text-center text-md-start" id="search-page-header">
              Discover & Search Movies
            </h1>
            
            {/* Search Input Box */}
            <div className="search-input-group mb-4" id="search-bar-wrapper">
              <i className="bi bi-search ms-3 text-secondary fs-5" id="icon-search-query"></i>
              <input 
                type="text" 
                className="search-input-field" 
                placeholder="Search TMDB by title, keyword, overview..." 
                id="search-input" 
                aria-label="Search Input"
                value={query}
                onChange={handleQueryChange}
              />
              {query && (
                <button 
                  className="btn btn-sm btn-outline-secondary me-2" 
                  onClick={() => { setQuery(''); setSearchParams({}); setPage(1); }}
                  title="Clear search"
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              )}
            </div>

            {/* Filters Options Layout (TMDB Discover Query Params) */}
            <div className="row g-3" id="filters-row">
              {/* Genre Filter */}
              <div className="col-md-4">
                <label htmlFor="filter-genre" className="form-label text-secondary small fw-semibold">
                  Genre
                </label>
                <select 
                  className="form-select filter-select" 
                  id="filter-genre" 
                  aria-label="Filter by Genre"
                  value={genre}
                  onChange={handleGenreChange}
                >
                  <option value="">All Genres</option>
                  {genresList.map(g => (
                    <option key={g.id} value={g.id}>{g.name}</option>
                  ))}
                </select>
              </div>

              {/* Rating Filter */}
              <div className="col-md-4">
                <label htmlFor="filter-rating" className="form-label text-secondary small fw-semibold">
                  Minimum Rating
                </label>
                <select 
                  className="form-select filter-select" 
                  id="filter-rating" 
                  aria-label="Filter by Minimum Rating"
                  value={rating}
                  onChange={handleRatingChange}
                >
                  <option value="">All Ratings</option>
                  <option value="8.5">Top Rated (8.5+)</option>
                  <option value="8.0">Highly Rated (8.0+)</option>
                  <option value="7.0">Great (7.0+)</option>
                  <option value="6.0">Above Average (6.0+)</option>
                </select>
              </div>

              {/* Release Year Filter */}
              <div className="col-md-4">
                <label htmlFor="filter-year" className="form-label text-secondary small fw-semibold">
                  Release Era
                </label>
                <select 
                  className="form-select filter-select" 
                  id="filter-year" 
                  aria-label="Filter by Year Era"
                  value={yearEra}
                  onChange={handleYearChange}
                >
                  <option value="">All Eras</option>
                  <option value="2020">2020s (New Releases)</option>
                  <option value="2010">2010s (Golden Era)</option>
                  <option value="2000">Pre-2010 (Classics)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Results Grid */}
      <section id="results-display-section" className="py-2 mb-5">
        <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
          <h2 className="h4 mb-0" id="results-title-header">
            {query.trim() ? `Search Results for "${query}"` : 'Discover Results'}
          </h2>
          <span className="badge bg-secondary px-3 py-2 small">
            {totalResults} {totalResults === 1 ? 'Movie' : 'Movies'} Found
          </span>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-info" role="status">
              <span className="visually-hidden">Fetching live TMDB results...</span>
            </div>
            <p className="text-secondary mt-3">Fetching movies from TMDB API...</p>
          </div>
        ) : error ? (
          <div className="alert alert-dark border-secondary text-center py-4">
            <p className="text-danger mb-0">{error}</p>
          </div>
        ) : movies.length === 0 ? (
          <div className="col-12 text-center py-5">
            <div className="text-secondary" style={{ fontSize: '3rem' }}>
              <i className="bi bi-emoji-frown"></i>
            </div>
            <h3 className="mt-3">No Movies Found</h3>
            <p className="text-secondary">Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <>
            <div className="row g-4" id="search-results-grid">
              {movies.map(movie => (
                <div key={movie.id} className="col-6 col-md-4 col-lg-3 d-flex justify-content-center mb-4">
                  <MovieCard 
                    movie={movie} 
                    watchlist={watchlist} 
                    toggleWatchlist={toggleWatchlist} 
                  />
                </div>
              ))}
            </div>

            {/* Week 10: Multi-page Pagination Controls */}
            {totalPages > 1 && (
              <div className="d-flex justify-content-center align-items-center gap-2 mt-4 mb-5 flex-wrap">
                <button 
                  className="btn btn-secondary-outline btn-sm"
                  disabled={page <= 1}
                  onClick={() => handlePageChange(page - 1)}
                  aria-label="Previous Page"
                >
                  <i className="bi bi-chevron-left me-1"></i> Previous
                </button>

                <span className="text-secondary small px-3">
                  Page <strong className="text-white">{page}</strong> of <strong className="text-white">{totalPages}</strong>
                </span>

                <button 
                  className="btn btn-secondary-outline btn-sm"
                  disabled={page >= totalPages}
                  onClick={() => handlePageChange(page + 1)}
                  aria-label="Next Page"
                >
                  Next <i className="bi bi-chevron-right ms-1"></i>
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}

export default Search;
