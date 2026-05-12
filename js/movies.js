// Complete movies database
const allMovies = [
    // ... (same movies array from original + 20 more movies)
    {
        id: 1,
        title: "Inception",
        year: 2010,
        genre: "sci-fi",
        rating: 4.8,
        runtime: "148 min",
        description: "A thief who steals corporate secrets through dream-sharing technology...",
        poster: "https://via.placeholder.com/300x450/4A90E2/FFFFFF?text=Inception",
        trailer: "https://www.youtube.com/embed/YoHD9XEInc0",
        director: "Christopher Nolan",
        actors: "Leonardo DiCaprio, Joseph Gordon-Levitt"
    },
    // Add 30+ more movies...
];

// Wait for DOM
document.addEventListener('DOMContentLoaded', function() {
    initMoviesPage();
});

function initMoviesPage() {
    const moviesGrid = document.getElementById('moviesGrid');
    const genreFilter = document.getElementById('genreFilter');
    const searchInput = document.getElementById('searchInput');
    const randomBtn = document.getElementById('randomBtn');
    
    let filteredMovies = [...allMovies];
    
    // Event listeners
    genreFilter.addEventListener('change', filterMovies);
    searchInput.addEventListener('input', debounce(filterMovies, 300));
    randomBtn.addEventListener('click', getRandomMovies);
    
    // Initial load
    displayMovies(filteredMovies);
    
    // Modal functionality
    const modal = document.getElementById('movieModal');
    const closeBtn = document.querySelector('.close');
    
    closeBtn.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });
}

function filterMovies() {
    const genre = document.getElementById('genreFilter').value;
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    let filtered = allMovies.filter(movie => {
        const genreMatch = genre === 'all' || movie.genre === genre;
        const searchMatch = movie.title.toLowerCase().includes(searchTerm) ||
                           movie.description.toLowerCase().includes(searchTerm);
        return genreMatch && searchMatch;
    });
    
    displayMovies(filtered);
}

function displayMovies(movies) {
    const container = document.getElementById('moviesGrid');
    const loading = document.getElementById('loadingSpinner');
    const noResults = document.getElementById('noResults');
    
    if (movies.length === 0) {
        container.style.display = 'none';
        loading.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }
    
    container.style.display = 'grid';
    noResults.style.display = 'none';
    
    container.innerHTML = movies.map(movie => createMovieCard(movie)).join('');
    setPostersForCards();
}

function createMovieCard(movie) {
    const poster = (movie.poster || '').trim();

    return `
        <div class="movie-card" data-movie-id="${movie.id}">
            <div class="movie-poster" data-poster-url="${poster}">
                <div class="movie-overlay">
                    <div class="movie-rating">${movie.rating} <i class="fas fa-star"></i></div>
                    <h3 class="movie-title">${movie.title}</h3>
                </div>
            </div>
            <div class="movie-info">
                <h4>${movie.title} (${movie.year})</h4>
                <div class="movie-meta">
                    <span>${movie.genre.toUpperCase()}</span>
                    <span>${movie.runtime}</span>
                </div>
                <p>${movie.description.substring(0, 120)}...</p>
                <div class="movie-actions">
                    <button class="btn-favorite" data-id="${movie.id}">
                        <i class="far fa-heart"></i> Favorite
                    </button>
                    <button class="btn-details" data-id="${movie.id}">
                        <i class="fas fa-info-circle"></i> Details
                    </button>
                </div>
            </div>
        </div>
    `;
}

function applyPosterBackground(el, url) {
    if (!url) return;

    // Set a temporary loading background (optional: remove if you don't want it)
    // el.style.backgroundImage = 'none';

    // Try to validate load without relying on host-specific CORS.
    const img = new Image();
    img.referrerPolicy = 'no-referrer';

    img.onload = () => {
        el.style.backgroundImage = `url(${url})`;
    };

    img.onerror = () => {
        // If the host blocks hotlinking, show a neutral gradient instead of blank.
        el.style.backgroundImage =
            'linear-gradient(135deg, rgba(14,165,233,0.35), rgba(3,105,161,0.15))';
    };

    img.src = url;
}

function setPostersForCards() {
    document.querySelectorAll('.movie-poster[data-poster-url]').forEach((el) => {
        const url = el.getAttribute('data-poster-url');
        applyPosterBackground(el, url);
    });
}

function showMovieModal(movie) {
    const modalBody = document.getElementById('modalBody');
    const poster = (movie.poster || '').trim();

    modalBody.innerHTML = `
        <div class="modal-poster" data-poster-url="${poster}"></div>
        <div class="modal-content">
            <h2>${movie.title} <span>(${movie.year})</span></h2>
            <div class="modal-rating">${movie.rating} / 5 <i class="fas fa-star"></i></div>
            <div class="modal-meta">
                <span class="genre">${movie.genre.toUpperCase()}</span>
                <span class="runtime">${movie.runtime}</span>
                <span class="director">Director: ${movie.director}</span>
            </div>
            <p>${movie.description}</p>
            <div class="modal-actions">
                <a href="${movie.trailer}" target="_blank" class="btn btn-primary">
                    <i class="fab fa-youtube"></i> Watch Trailer
                </a>
                <button class="btn-favorite" data-id="${movie.id}">
                    <i class="fas fa-heart"></i> Add to Favorites
                </button>
            </div>
        </div>
    `;

    const modalPosterEl = document.querySelector('#movieModal .modal-poster[data-poster-url]');
    if (modalPosterEl) {
        const url = modalPosterEl.getAttribute('data-poster-url');
        applyPosterBackground(modalPosterEl, url);
    }
    
    document.getElementById('movieModal').style.display = 'flex';
}

function getRandomMovies() {
    const randomMovies = allMovies.sort(() => 0.5 - Math.random()).slice(0, 12);
    displayMovies(randomMovies);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Event delegation for movie cards
document.addEventListener('click', (e) => {
    if (e.target.closest('.btn-details')) {
        const movieId = e.target.closest('.btn-details').dataset.id;
        const movie = allMovies.find(m => m.id == movieId);
        showMovieModal(movie);
    }
    
    if (e.target.closest('.btn-favorite')) {
        const movieId = e.target.closest('.btn-favorite').dataset.id;
        toggleFavorite(movieId);
    }
});

function toggleFavorite(movieId) {
    let favorites = JSON.parse(localStorage.getItem('movieFavorites') || '[]');
    const movieIndex = favorites.findIndex(id => id == movieId);
    
    if (movieIndex > -1) {
        favorites.splice(movieIndex, 1);
        e.target.closest('.btn-favorite').innerHTML = '<i class="far fa-heart"></i> Favorite';
    } else {
        favorites.push(movieId);
        e.target.closest('.btn-favorite').innerHTML = '<i class="fas fa-heart"></i> Favorited!';
    }
    
    localStorage.setItem('movieFavorites', JSON.stringify(favorites));
}