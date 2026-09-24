// Static Movie Database
const MOVIE_DATABASE = [
    {
        id: 1,
        title: "Avengers: Endgame",
        year: 2019,
        rating: 8.3,
        genres: ["Action", "Sci-Fi", "Adventure"],
        runtime: "181 min",
        poster: "assets/avengers_image.png",
        backdrop: "assets/avengers_backdrop.png",
        link: "movie-avengers.html",
        language: "en",
        overview: "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe."
    },
    {
        id: 2,
        title: "Interstellar",
        year: 2014,
        rating: 8.7,
        genres: ["Sci-Fi", "Drama", "Adventure"],
        runtime: "169 min",
        poster: "assets/interstellar_image.png",
        backdrop: "assets/interstellar_image.png", // fallback or could be poster
        link: "movie-interstellar.html",
        language: "en",
        overview: "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage."
    },
    {
        id: 3,
        title: "The Dark Knight",
        year: 2008,
        rating: 9.0,
        genres: ["Action", "Crime", "Drama"],
        runtime: "152 min",
        poster: "assets/darkknight_image.png",
        backdrop: "assets/darkknight_image.png",
        link: "movie-darkknight.html",
        language: "en",
        overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice."
    },
    {
        id: 4,
        title: "Inception",
        year: 2010,
        rating: 8.8,
        genres: ["Action", "Sci-Fi", "Adventure"],
        runtime: "148 min",
        poster: "assets/inception_image.png",
        backdrop: "assets/inception_image.png",
        link: "movie-inception.html",
        language: "en",
        overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project."
    },
    {
        id: 5,
        title: "Spider-Man: Into the Spider-Verse",
        year: 2018,
        rating: 8.4,
        genres: ["Animation", "Action", "Adventure"],
        runtime: "117 min",
        poster: "assets/spiderverse_image.png",
        backdrop: "assets/spiderverse_image.png",
        link: "movie-spiderverse.html",
        language: "en",
        overview: "Teen Miles Morales becomes the Spider-Man of his universe and must join with five spider-powered individuals from other dimensions to stop a threat for all realities."
    },
    {
        id: 6,
        title: "Avatar: The Way of Water",
        year: 2022,
        rating: 7.6,
        genres: ["Sci-Fi", "Action", "Adventure"],
        runtime: "192 min",
        poster: "assets/avatar_image.png",
        backdrop: "assets/avatar_image.png",
        link: "movie-avatar.html",
        language: "en",
        overview: "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na'vi race to protect their home."
    }
];

// LocalStorage helpers
function getWatchlist() {
    try {
        const list = localStorage.getItem('movie_watchlist');
        return list ? JSON.parse(list) : [];
    } catch (e) {
        console.error("Failed to parse watchlist", e);
        return [];
    }
}

function saveWatchlist(watchlist) {
    localStorage.setItem('movie_watchlist', JSON.stringify(watchlist));
}

function isInWatchlist(movieId) {
    const list = getWatchlist();
    return list.includes(Number(movieId));
}

function toggleWatchlist(movieId) {
    movieId = Number(movieId);
    let list = getWatchlist();
    if (list.includes(movieId)) {
        list = list.filter(id => id !== movieId);
    } else {
        list.push(movieId);
    }
    saveWatchlist(list);
    updateWatchlistUI();

    // If we are on the watchlist page, re-render it
    if (document.getElementById('watchlist-grid')) {
        renderWatchlistPage();
    }
}

// Global UI Updater for Watchlist buttons
function updateWatchlistUI() {
    const triggers = document.querySelectorAll('.watchlist-btn-trigger');
    triggers.forEach(btn => {
        const movieId = Number(btn.getAttribute('data-movie-id'));
        if (isInWatchlist(movieId)) {
            btn.classList.add('active');
            btn.innerHTML = '<i class="bi bi-bookmark-check-fill"></i>';
            btn.setAttribute('title', 'Remove from Watchlist');
        } else {
            btn.classList.remove('active');
            btn.innerHTML = '<i class="bi bi-bookmark-plus"></i>';
            btn.setAttribute('title', 'Add to Watchlist');
        }
    });

    // Also update any detail page actions if applicable
    const detailBtn = document.querySelector('.btn-detail-watchlist');
    if (detailBtn) {
        const movieId = Number(detailBtn.getAttribute('data-movie-id'));
        if (isInWatchlist(movieId)) {
            detailBtn.classList.remove('btn-premium');
            detailBtn.classList.add('btn-secondary-outline');
            detailBtn.innerHTML = '<i class="bi bi-bookmark-check-fill"></i> In Watchlist';
        } else {
            detailBtn.classList.add('btn-premium');
            detailBtn.classList.remove('btn-secondary-outline');
            detailBtn.innerHTML = '<i class="bi bi-bookmark-plus"></i> Add to Watchlist';
        }
    }
}

// Generate movie card HTML
function generateMovieCardHTML(movie) {
    return `
        <div class="movie-card">
            <div class="movie-card-img-wrapper">
                <div class="watchlist-btn-trigger" data-movie-id="${movie.id}" onclick="event.preventDefault(); toggleWatchlist(${movie.id});">
                    <i class="bi bi-bookmark-plus"></i>
                </div>
                <div class="movie-rating-badge">
                    <i class="bi bi-star-fill"></i> ${movie.rating.toFixed(1)}
                </div>
                <a href="${movie.link}">
                    <img src="${movie.poster}" alt="${movie.title} Poster" class="movie-card-img" loading="lazy">
                </a>
            </div>
            <a href="${movie.link}" style="text-decoration: none; color: inherit;">
                <div class="movie-card-info">
                    <h3 class="movie-card-title">${movie.title}</h3>
                    <div class="movie-card-meta">
                        <span>${movie.year}</span>
                        <span>${movie.runtime}</span>
                    </div>
                </div>
            </a>
        </div>
    `;
}

// Render Watchlist Page
function renderWatchlistPage() {
    const grid = document.getElementById('watchlist-grid');
    if (!grid) return;

    const list = getWatchlist();
    const watchlistMovies = MOVIE_DATABASE.filter(m => list.includes(m.id));

    if (watchlistMovies.length === 0) {
        grid.innerHTML = `
            <div class="col-12 empty-watchlist-container">
                <div class="empty-icon"><i class="bi bi-bookmark-x"></i></div>
                <h2>Your Watchlist is Empty</h2>
                <p class="text-secondary mt-2">Explore the home page or search and add movies to track them here!</p>
                <a href="index.html" class="btn btn-premium mt-4">
                    <i class="bi bi-house-door-fill"></i> Browse Movies
                </a>
            </div>
        `;
    } else {
        grid.innerHTML = watchlistMovies.map(movie => `
            <div class="col-6 col-md-4 col-lg-3 d-flex justify-content-center mb-4">
                ${generateMovieCardHTML(movie)}
            </div>
        `).join('');
    }
    updateWatchlistUI();
}

// Render Search Page Results and Logic
function initSearchPage() {
    const searchGrid = document.getElementById('search-results-grid');
    const searchInput = document.getElementById('search-input');
    const genreFilter = document.getElementById('filter-genre');
    const ratingFilter = document.getElementById('filter-rating');
    const yearFilter = document.getElementById('filter-year');

    if (!searchGrid) return;

    function filterMovies() {
        const query = searchInput.value.toLowerCase().trim();
        const genre = genreFilter.value;
        const rating = Number(ratingFilter.value) || 0;
        const year = Number(yearFilter.value) || 0;

        const results = MOVIE_DATABASE.filter(movie => {
            const matchesQuery = movie.title.toLowerCase().includes(query) || movie.overview.toLowerCase().includes(query);
            const matchesGenre = !genre || movie.genres.includes(genre);
            const matchesRating = movie.rating >= rating;
            const matchesYear = !year || (
                year === 2020 ? movie.year >= 2020 :
                    year === 2010 ? (movie.year >= 2010 && movie.year < 2020) :
                        movie.year < 2010
            );

            return matchesQuery && matchesGenre && matchesRating && matchesYear;
        });

        if (results.length === 0) {
            searchGrid.innerHTML = `
                <div class="col-12 text-center py-5">
                    <div class="text-secondary" style="font-size: 3rem;"><i class="bi bi-emoji-frown"></i></div>
                    <h3 class="mt-3">No Movies Found</h3>
                    <p class="text-secondary">Try adjusting your filters or search terms.</p>
                </div>
            `;
        } else {
            searchGrid.innerHTML = results.map(movie => `
                <div class="col-6 col-md-4 col-lg-3 d-flex justify-content-center mb-4">
                    ${generateMovieCardHTML(movie)}
                </div>
            `).join('');
        }
        updateWatchlistUI();
    }

    // Attach listeners
    if (searchInput) searchInput.addEventListener('input', filterMovies);
    if (genreFilter) genreFilter.addEventListener('change', filterMovies);
    if (ratingFilter) ratingFilter.addEventListener('change', filterMovies);
    if (yearFilter) yearFilter.addEventListener('change', filterMovies);

    // Initial render
    filterMovies();
}

// Page Mounting Initializers
document.addEventListener('DOMContentLoaded', () => {
    updateWatchlistUI();

    if (document.getElementById('watchlist-grid')) {
        renderWatchlistPage();
    }

    if (document.getElementById('search-results-grid')) {
        initSearchPage();
    }
});
