// Complete movies database
const allMovies = [
    // Local poster images from /images
    {
        id: 1,
        title: "Barbie",
        year: 2023,
        genre: "comedy",
        rating: 6.8,
        runtime: "114 min",
        description: "Barbie and Ken get swept into a journey through the real world.",
        poster: "images/barbie.jpeg",
        trailer: "https://www.youtube.com/embed/LVv1Z3oY4XQ",
        director: "Greta Gerwig",
        actors: "Margot Robbie, Ryan Gosling"
    },
    {
        id: 2,
        title: "Deadpool & Wolverine",
        year: 2024,
        genre: "action",
        rating: 7.5,
        runtime: "127 min",
        description: "Two larger-than-life heroes collide in an action-packed adventure.",
        poster: "images/deadpool&wolverine.jpeg",
        trailer: "https://www.youtube.com/embed/INVALID",
        director: "Shawn Levy",
        actors: "Ryan Reynolds, Hugh Jackman"
    },
    {
        id: 3,
        title: "Dune: Part Two",
        year: 2024,
        genre: "sci-fi",
        rating: 8.4,
        runtime: "166 min",
        description: "Paul Atreides joins forces as the universe turns against him.",
        poster: "images/dune-part2.jpeg",
        trailer: "https://www.youtube.com/embed/INVALID",
        director: "Denis Villeneuve",
        actors: "Timothée Chalamet, Zendaya"
    },
    {
        id: 4,
        title: "Inside Out 2",
        year: 2024,
        genre: "comedy",
        rating: 7.5,
        runtime: "100 min",
        description: "New emotions arrive as Riley grows and life changes.",
        poster: "images/Inside_Out_2.jpg",
        trailer: "https://www.youtube.com/embed/INVALID",
        director: "Kelsey Mann",
        actors: "Amy Poehler, Phyllis Smith"
    },
    {
        id: 5,
        title: "Oppenheimer",
        year: 2023,
        genre: "drama",
        rating: 8.2,
        runtime: "180 min",
        description: "The story of J. Robert Oppenheimer and the creation of the atomic bomb.",
        poster: "images/oppenheimer.jpeg",
        trailer: "https://www.youtube.com/embed/bK3q7kQdX5I",
        director: "Christopher Nolan",
        actors: "Cillian Murphy, Emily Blunt"
    },
    { // legacy placeholder start (rest of original array)
        id: 1,
        id: 1,
        title: "Inception",
        year: 2010,
        genre: "sci-fi",
        rating: 4.8,
        runtime: "148 min",
        description: "A thief who steals corporate secrets through dream-sharing technology...",
        poster: "images/oppenheimer.jpeg",
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
}

function createMovieCard(movie) {
    return `
        <div class="movie-card" data-movie-id="${movie.id}">
            <div class="movie-poster" style="background-image: url(${movie.poster})">
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

function showMovieModal(movie) {
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <div class="modal-poster" style="background-image: url(${movie.poster})"></div>
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