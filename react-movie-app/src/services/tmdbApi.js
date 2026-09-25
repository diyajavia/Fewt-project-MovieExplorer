// TMDB API Configuration (Base URL and API Key)
const BASE_URL = 'https://api.themoviedb.org/3';
const DEFAULT_API_KEY = '2afba9f9458a7c12ebe9718f62d54bf5';
const ENV_KEY = import.meta.env.VITE_TMDB_API_KEY;

// Use custom .env key if provided, else fallback to verified default key
const API_KEY = (ENV_KEY && ENV_KEY.trim() !== '' && ENV_KEY !== 'YOUR_API_KEY' && ENV_KEY !== 'your_tmdb_api_key_here')
  ? ENV_KEY.trim()
  : DEFAULT_API_KEY;

// TMDB Image Helpers
export const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

// Dynamic Movie Poster Placeholder Generator (SVG Data URI)
export const getMoviePosterPlaceholder = (title = 'Movie', year = '') => {
  const safeTitle = String(title || 'Movie')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
  const safeYear = year ? String(year).slice(0, 4) : '';
  const displayTitle = safeTitle.length > 28 ? safeTitle.slice(0, 26) + '...' : safeTitle;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 750" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#161a29"/>
      <stop offset="50%" stop-color="#0f121d"/>
      <stop offset="100%" stop-color="#080a10"/>
    </linearGradient>
    <linearGradient id="acc" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#7c3aed"/>
      <stop offset="100%" stop-color="#06b6d4"/>
    </linearGradient>
  </defs>
  <rect width="500" height="750" fill="url(#bg)"/>
  <rect x="24" y="24" width="452" height="702" rx="16" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="2"/>
  <circle cx="250" cy="270" r="70" fill="#141826" stroke="url(#acc)" stroke-width="2"/>
  <g transform="translate(210, 230) scale(1.6)" fill="url(#acc)">
    <path d="M4 18h42a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2z" opacity="0.9"/>
    <path d="M4 3h42a2 2 0 0 1 2 2v2H2V5a2 2 0 0 1 2-2z" fill="#ffffff" opacity="0.95"/>
    <path d="M12 3l-4 4h4l4-4h-4zm12 0l-4 4h4l4-4h-4zm12 0l-4 4h4l4-4h-4z" fill="#0f121d"/>
    <line x1="10" y1="13" x2="40" y2="13" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
  </g>
  <text x="250" y="415" font-family="'Outfit', -apple-system, sans-serif" font-weight="700" font-size="24" fill="#ffffff" text-anchor="middle">
    ${displayTitle}
  </text>
  <text x="250" y="450" font-family="'Inter', -apple-system, sans-serif" font-weight="500" font-size="15" fill="#9ca3af" text-anchor="middle">
    ${safeYear ? `${safeYear} • ` : ''}No Official Poster
  </text>
  <g transform="translate(185, 630)">
    <rect width="130" height="28" rx="14" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1"/>
    <circle cx="20" cy="14" r="4" fill="#06b6d4"/>
    <text x="70" y="19" font-family="'Outfit', sans-serif" font-weight="600" font-size="12" fill="#d1d5db" text-anchor="middle" letter-spacing="1">
      CINEVERSE
    </text>
  </g>
</svg>`;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

export const getImageUrl = (path, fallback = null, title = '', year = '') => {
  if (path && typeof path === 'string' && path.trim() !== '') {
    const cleanPath = path.trim();
    if (cleanPath.startsWith('http://') || cleanPath.startsWith('https://') || cleanPath.startsWith('assets/') || cleanPath.startsWith('/assets/')) {
      return cleanPath;
    }
    return `${TMDB_IMAGE_BASE}/w500${cleanPath.startsWith('/') ? '' : '/'}${cleanPath}`;
  }
  if (title) {
    return getMoviePosterPlaceholder(title, year);
  }
  return fallback || '/assets/poster_placeholder.svg';
};

export const getBackdropUrl = (path, fallback = '/assets/backdrop_placeholder.svg') => {
  if (path && typeof path === 'string' && path.trim() !== '') {
    const cleanPath = path.trim();
    if (cleanPath.startsWith('http://') || cleanPath.startsWith('https://') || cleanPath.startsWith('assets/') || cleanPath.startsWith('/assets/')) {
      return cleanPath;
    }
    return `${TMDB_IMAGE_BASE}/original${cleanPath.startsWith('/') ? '' : '/'}${cleanPath}`;
  }
  return fallback || '/assets/backdrop_placeholder.svg';
};

// Genre Map for TMDB ID to display name
export const GENRE_MAP = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western"
};

// Map legacy static IDs to real TMDB IDs
export const LEGACY_ID_MAP = {
  1: 299534, // Avengers: Endgame
  2: 157336, // Interstellar
  3: 155,    // The Dark Knight
  4: 27205,  // Inception
  5: 324857, // Spider-Man: Into the Spider-Verse
  6: 76600   // Avatar: The Way of Water
};

// Simple beginner-friendly helper using fetch().then().then()
function fetchFromTMDB(endpoint, queryParams = {}, fallbackData = null) {
  const params = new URLSearchParams({
    api_key: API_KEY,
    ...queryParams
  });

  const fullUrl = `${BASE_URL}${endpoint}?${params.toString()}`;

  // Direct fetch().then().then() method
  return fetch(fullUrl)
    .then((response) => response.json()) // 1st .then: convert response to JSON
    .then((data) => data)                // 2nd .then: return the movie data
    .catch((error) => {
      console.warn(`Error fetching ${endpoint}:`, error.message);
      if (fallbackData) {
        return typeof fallbackData === 'function' ? fallbackData() : fallbackData;
      }
      return null;
    });
}

// ============================================================================
// MOVIE API FUNCTIONS (EXPORTED FOR USE IN REACT COMPONENTS)
// ============================================================================

// 1. Get Trending Movies (for Homepage)
export const getTrendingMovies = () => {
  return fetchFromTMDB('/trending/movie/day', {}, { results: MOCK_MOVIES });
};

// 2. Get Popular Movies (for Homepage)
export const getPopularMovies = () => {
  return fetchFromTMDB('/movie/popular', {}, () => ({
    results: MOCK_MOVIES.filter((m) => m.category === 'popular' || m.category === 'trending')
  }));
};

// 3. Get Top Rated Movies (for Homepage)
export const getTopRatedMovies = () => {
  return fetchFromTMDB('/movie/top_rated', {}, () => ({
    results: MOCK_MOVIES.filter((m) => m.category === 'top_rated' || m.vote_average >= 8.5)
  }));
};

// 4. Get Upcoming Movies (for Homepage)
export const getUpcomingMovies = () => {
  return fetchFromTMDB('/movie/upcoming', {}, () => ({
    results: MOCK_MOVIES.filter((m) => m.category === 'upcoming')
  }));
};

// 5. Get Movie Details by ID (for MovieDetails Page)
export const getMovieDetails = (movieId) => {
  const resolvedId = LEGACY_ID_MAP[movieId] || movieId;
  return fetchFromTMDB(`/movie/${resolvedId}`, {}, () => {
    const movie = MOCK_MOVIES.find((m) => m.id === Number(resolvedId) || m.id === Number(movieId));
    if (movie) return movie;
    throw new Error(`Movie details unavailable for ID ${movieId}`);
  });
};

// 6. Get Cast & Credits (for MovieDetails Page)
export const getMovieCredits = (movieId) => {
  const resolvedId = LEGACY_ID_MAP[movieId] || movieId;
  return fetchFromTMDB(`/movie/${resolvedId}/credits`, {}, { id: resolvedId, cast: [] });
};

// 7. Get Similar / Recommended Movies (for MovieDetails Page)
export const getSimilarMovies = (movieId) => {
  const resolvedId = LEGACY_ID_MAP[movieId] || movieId;

  // First try recommendations; if empty or fails, fetch similar movies
  return fetchFromTMDB(`/movie/${resolvedId}/recommendations`)
    .then((data) => {
      if (data && Array.isArray(data.results) && data.results.length > 0) {
        return data;
      }
      return fetchFromTMDB(`/movie/${resolvedId}/similar`);
    })
    .catch(() => {
      // Fallback if network fails
      const similar = MOCK_MOVIES.filter((m) => m.id !== Number(resolvedId));
      return { results: similar.slice(0, 4) };
    });
};

// 8. Get Genre List (for Search Page filter dropdown)
export const getGenres = () => {
  const fallbackGenres = Object.entries(GENRE_MAP).map(([id, name]) => ({
    id: Number(id),
    name: name
  }));
  return fetchFromTMDB('/genre/movie/list', {}, { genres: fallbackGenres });
};

// 9. Search Movies by Keyword (for Search Bar)
export const searchMovies = (query, page = 1) => {
  return fetchFromTMDB(
    '/search/movie',
    { query, page },
    { results: [], page: 1, total_pages: 1, total_results: 0 }
  );
};

// 10. Discover Movies with Filters (Genre, Year, Rating, Page)
export const discoverMovies = (filters = {}) => {
  const params = {};
  if (filters.genreId) params.with_genres = filters.genreId;
  if (filters.year) params.primary_release_year = filters.year;
  if (filters.rating) params['vote_average.gte'] = filters.rating;
  if (filters.page) params.page = filters.page;
  if (filters.sortBy) params.sort_by = filters.sortBy;

  return fetchFromTMDB(
    '/discover/movie',
    params,
    { results: MOCK_MOVIES, page: 1, total_pages: 1, total_results: MOCK_MOVIES.length }
  );
};

// Fallback sample movies for emergency offline use only
export const MOCK_MOVIES = [
  {
    id: 299534,
    title: "Avengers: Endgame",
    poster_path: "/or0661bY0BvXgC2ttT3Z6G9pYgA.jpg",
    backdrop_path: "/7RyG74xrbfmP3CMILvXmN61I7DY.jpg",
    overview: "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
    release_date: "2019-04-24",
    vote_average: 8.3,
    runtime: 181,
    genres: [{ id: 28, name: "Action" }, { id: 12, name: "Adventure" }, { id: 878, name: "Sci-Fi" }],
    original_language: "en",
    category: "trending"
  },
  {
    id: 157336,
    title: "Interstellar",
    poster_path: "/gEU2QvJWzIF7efg1vlzkVf24Qh0.jpg",
    backdrop_path: "/rAiw12Z6hVfsstNNgqdQ024BuWM.jpg",
    overview: "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
    release_date: "2014-11-05",
    vote_average: 8.7,
    runtime: 169,
    genres: [{ id: 12, name: "Adventure" }, { id: 18, name: "Drama" }, { id: 878, name: "Sci-Fi" }],
    original_language: "en",
    category: "trending"
  },
  {
    id: 155,
    title: "The Dark Knight",
    poster_path: "/qJ2tW6WMUDux911r6m7K0etW5X8.jpg",
    backdrop_path: "/nMKdUU7JmstwTzsR9tZ7T1LGcEt.jpg",
    overview: "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets.",
    release_date: "2008-07-18",
    vote_average: 9.0,
    runtime: 152,
    genres: [{ id: 28, name: "Action" }, { id: 80, name: "Crime" }, { id: 18, name: "Drama" }],
    original_language: "en",
    category: "top_rated"
  },
  {
    id: 27205,
    title: "Inception",
    poster_path: "/o045pytCYzfun4bsbgz2GI264Z2.jpg",
    backdrop_path: "/8Zcrwwqk6jG75y7Q2ynhCK65UzA.jpg",
    overview: "Cobb, a skilled thief who commits corporate espionage by infiltrating the sub-conscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible.",
    release_date: "2010-07-15",
    vote_average: 8.8,
    runtime: 148,
    genres: [{ id: 28, name: "Action" }, { id: 878, name: "Sci-Fi" }, { id: 53, name: "Thriller" }],
    original_language: "en",
    category: "top_rated"
  }
];

export default fetchFromTMDB;
