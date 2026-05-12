// External movies data (same as movies.js)
const allMovies = [
    // Copy the complete movies array from movies.js
    // ... (all 30+ movies)
];

document.addEventListener('DOMContentLoaded', function() {
    initFavoritesPage();
});

function initFavoritesPage() {
    loadFavorites();
    
    // Event listeners
    document.getElementById('clearAllBtn').addEventListener('click', clearAllFavorites);
    document.getElementById('sortBtn').addEventListener('click', sortFavorites);
}

function loadFavorites() {
    const favoritesGrid = document.getElementById('favoritesGrid');
    const emptyState = document.getElementById('emptyState');
    const favoritesCount = document.getElementById('favoritesCount');
    const clearBtn = document.getElementById('clearAllBtn');
    
    const favoriteIds = JSON.parse(localStorage.getItem('movieFavorites') || '[]');
    const favorites = allMovies.filter(movie => favoriteIds.includes(movie.id.toString()));
    
    favoritesCount.textContent = favorites.length;
    clearBtn.style.display = favorites.length > 0 ? 'inline-flex' : 'none';
    
    if (favorites.length === 0) {
        favoritesGrid.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    favoritesGrid.style.display = 'grid';
    
    // Sort by rating by default
    favorites.sort((a, b) => b.rating - a.rating);
    
    displayFavorites(favorites);
}

function displayFavorites(favorites) {
    const container = document.getElementById('favoritesGrid');
    container.innerHTML = favorites.map(movie => createFavoriteCard(movie)).join('');
}

function createFavoriteCard(movie) {
    return `
        <div class="favorite-card">
            <div class="favorite-poster" style="background-image: url(${movie.poster})">
                <div class="favorite-overlay">
                    <div class="favorite-rating">
                        <i class="fas fa-star"></i> ${movie.rating}
                    </div>
                </div>
            </div>
            <div class="favorite-info">
                <h3>${movie.title}</h3>
                <div class="favorite-meta">
                    <span class="genre">${movie.genre.toUpperCase()}</span>
                    <span class="year">${movie.year}</span>
                </div>
                <p>${movie.description.substring(0, 100)}...</p>
                <div class="favorite-actions">
                    <button class="btn-remove-favorite" data-id="${movie.id}">
                        <i class="fas fa-times"></i> Remove
                    </button>
                    <button class="btn-details" data-id="${movie.id}">
                        <i class="fas fa-info-circle"></i> Details
                    </button>
                </div>
            </div>
        </div>
    `;
}

function clearAllFavorites() {
    if (confirm('Are you sure you want to remove all favorites?')) {
        localStorage.removeItem('movieFavorites');
        loadFavorites();
    }
}

function sortFavorites() {
    const favoriteIds = JSON.parse(localStorage.getItem('movieFavorites') || '[]');
    const favorites = allMovies.filter(movie => favoriteIds.includes(movie.id.toString()));
    
    // Toggle between rating and date added
    const sortByDate = document.getElementById('sortBtn').dataset.sort === 'rating';
    const sorted = sortByDate 
        ? favorites.sort((a, b) => new Date(b.year) - new Date(a.year))
        : favorites.sort((a, b) => b.rating - a.rating);
    
    document.getElementById('sortBtn').dataset.sort = sortByDate ? 'date' : 'rating';
    document.getElementById('sortBtn').innerHTML = sortByDate 
        ? '<i class="fas fa-star"></i> Sort by Rating' 
        : '<i class="fas fa-calendar"></i> Sort by Date';
    
    displayFavorites(sorted);
}

// Event delegation
document.addEventListener('click', (e) => {
    if (e.target.closest('.btn-remove-favorite')) {
        const movieId = e.target.closest('.btn-remove-favorite').dataset.id;
        removeFavorite(movieId);
    }
    
    if (e.target.closest('.btn-details')) {
        const movieId = e.target.closest('.btn-details').dataset.id;
        const movie = allMovies.find(m => m.id == movieId);
        showMovieModal(movie);
    }
});

function removeFavorite(movieId) {
    let favorites = JSON.parse(localStorage.getItem('movieFavorites') || '[]');
    favorites = favorites.filter(id => id != movieId);
    localStorage.setItem('movieFavorites', JSON.stringify(favorites));
    loadFavorites();
}

function showMovieModal(movie) {
    // Same modal function as movies.js
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <div class="modal-poster" style="background-image: url(${movie.poster})"></div>
        <div class="modal-content">
            <h2>${movie.title} <span>(${movie.year})</span></h2>
            <div class="modal-rating">${movie.rating} / 5 <i class="fas fa-star"></i></div>
            <div class="modal-meta">
                <span class="genre">${movie.genre.toUpperCase()}</span>
                <span class="runtime">${movie.runtime}</span>
            </div>
            <p>${movie.description}</p>
            <div class="modal-actions">
                <a href="${movie.trailer}" target="_blank" class="btn btn-primary">
                    <i class="fab fa-youtube"></i> Watch Trailer
                </a>
                <button class="btn-remove-favorite" data-id="${movie.id}">
                    <i class="fas fa-times"></i> Remove from Favorites
                </button>
            </div>
        </div>
    `;
    document.getElementById('movieModal').style.display = 'flex';
}