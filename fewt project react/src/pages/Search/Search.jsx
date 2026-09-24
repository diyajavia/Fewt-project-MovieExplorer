import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search as SearchIcon, Filter, ChevronLeft, ChevronRight, XCircle } from "lucide-react";
import { searchMovies, discoverMovies, getGenres } from "../../services/tmdbApi";
import SearchBar from "../../components/SearchBar/SearchBar";
import MovieCard from "../../components/MovieCard/MovieCard";
import "./Search.css";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // URL States
  const query = searchParams.get("query") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const genreId = searchParams.get("genre") || "";
  const year = searchParams.get("year") || "";
  const rating = searchParams.get("rating") || "";
  const sortBy = searchParams.get("sortBy") || "rating_desc";

  // Component States
  const [searchInput, setSearchInput] = useState(query);
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Sync SearchBar input with URL parameter
  useEffect(() => {
    setSearchInput(query);
  }, [query]);

  // Load genres once on mount
  useEffect(() => {
    getGenres()
      .then((data) => setGenres(data.genres || []))
      .catch((err) => console.error("Error loading genres", err));
  }, []);

  // Fetch movies when query, page, or filters change
  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        let response;
        if (query.trim() !== "") {
          // Text search takes priority
          response = await searchMovies(query, page);
        } else {
          // Filtered discovery
          response = await discoverMovies({
            genreId,
            year,
            rating,
            sortBy,
            page,
          });
        }
        setMovies(response.results || []);
        setTotalPages(response.total_pages || 1);
      } catch (err) {
        console.error("Fetch movies error:", err);
        setError("Error loading movie listings. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, page, genreId, year, rating, sortBy]);

  // Update query params helper
  const updateParams = (newParams) => {
    const nextParams = new URLSearchParams(searchParams);
    
    // Always reset to page 1 on filter changes unless specifying page changes
    if (!newParams.hasOwnProperty("page")) {
      nextParams.set("page", "1");
    }

    Object.keys(newParams).forEach((key) => {
      const val = newParams[key];
      if (val === "" || val === null || val === undefined) {
        nextParams.delete(key);
      } else {
        nextParams.set(key, val.toString());
      }
    });

    setSearchParams(nextParams);
  };

  const handleSearchSubmit = (value) => {
    // Clear filters when executing a text search to avoid clash
    updateParams({
      query: value,
      page: 1,
      genre: "",
      year: "",
      rating: "",
    });
  };

  const handleClearAll = () => {
    setSearchInput("");
    setSearchParams({});
  };

  // Generate Year options (1980 to current year)
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let y = currentYear; y >= 1980; y--) {
    years.push(y);
  }

  return (
    <div className="search-page container fade-in">
      <header className="search-header">
        <h1>Explore Movie Database</h1>
        <p>Search by title or drill down using filters below.</p>
        
        <div className="search-bar-container">
          <SearchBar
            value={searchInput}
            onChange={(val) => {
              setSearchInput(val);
              // Live debounced search or instant submit on change
              // We'll update search parameters live as user types
              updateParams({ query: val, page: 1 });
            }}
            onClear={() => {
              setSearchInput("");
              updateParams({ query: "", page: 1 });
            }}
          />
        </div>
      </header>

      {/* Filter Options Drawer */}
      <section className="filters-section glass-panel">
        <div className="filters-title">
          <Filter size={18} />
          <span>Filters & Sorting</span>
          {(query || genreId || year || rating) && (
            <button onClick={handleClearAll} className="reset-all-btn">
              Clear All
            </button>
          )}
        </div>

        <div className="filters-grid">
          {/* Genre Filter */}
          <div className="filter-group">
            <label htmlFor="genre-select">Genre</label>
            <select
              id="genre-select"
              value={genreId}
              onChange={(e) => updateParams({ genre: e.target.value })}
              disabled={query.trim() !== ""}
              title={query.trim() !== "" ? "Clear search text to filter by genres" : ""}
            >
              <option value="">All Genres</option>
              {genres.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>

          {/* Release Year Filter */}
          <div className="filter-group">
            <label htmlFor="year-select">Release Year</label>
            <select
              id="year-select"
              value={year}
              onChange={(e) => updateParams({ year: e.target.value })}
              disabled={query.trim() !== ""}
            >
              <option value="">All Years</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          {/* Rating filter threshold */}
          <div className="filter-group">
            <label htmlFor="rating-select">Minimum Rating</label>
            <select
              id="rating-select"
              value={rating}
              onChange={(e) => updateParams({ rating: e.target.value })}
              disabled={query.trim() !== ""}
            >
              <option value="">Any Rating</option>
              <option value="8">8.0+ Stars</option>
              <option value="7">7.0+ Stars</option>
              <option value="6">6.0+ Stars</option>
              <option value="5">5.0+ Stars</option>
            </select>
          </div>

          {/* Sorting */}
          <div className="filter-group">
            <label htmlFor="sort-select">Sort By</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => updateParams({ sortBy: e.target.value })}
              disabled={query.trim() !== ""}
            >
              <option value="rating_desc">Rating (High to Low)</option>
              <option value="release_desc">Release Date (New to Old)</option>
              <option value="title_asc">Title (A-Z)</option>
            </select>
          </div>
        </div>

        {query.trim() !== "" && (
          <div className="filter-hint">
            * Genre, Year, and Sorting filters are locked during text searches. Clear search text to use parameters.
          </div>
        )}
      </section>

      {/* Results Container */}
      <main className="results-container">
        {loading ? (
          <div className="search-loading">
            <div className="spinner"></div>
            <p>Loading matching cinematic titles...</p>
          </div>
        ) : error ? (
          <div className="search-error">
            <p>{error}</p>
          </div>
        ) : movies.length === 0 ? (
          <div className="no-results glass-panel">
            <XCircle size={40} className="no-results-icon" />
            <h3>No movies found</h3>
            <p>We couldn't find any movies matching your specific search query or filter parameters.</p>
            <button className="btn btn-primary" onClick={handleClearAll}>
              Reset Search filters
            </button>
          </div>
        ) : (
          <>
            <div className="results-count">
              Found {movies.length} {movies.length === 1 ? "movie" : "movies"} on this page
            </div>

            <div className="movie-grid">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="pagination-wrapper">
                <button
                  onClick={() => updateParams({ page: page - 1 })}
                  disabled={page <= 1}
                  className="pagination-btn"
                  aria-label="Previous Page"
                >
                  <ChevronLeft size={20} />
                  <span>Previous</span>
                </button>
                
                <span className="pagination-info">
                  Page {page} of {totalPages}
                </span>

                <button
                  onClick={() => updateParams({ page: page + 1 })}
                  disabled={page >= totalPages}
                  className="pagination-btn"
                  aria-label="Next Page"
                >
                  <span>Next</span>
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Search;
