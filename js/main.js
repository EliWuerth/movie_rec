// Sample trending movies for slider
const trendingMovies = [
    {
        title: "Oppenheimer",
        year: 2023,
        rating: 8.2,
        poster: "https://www.imdb.com/title/tt15398776/mediaviewer/rm2670601217/?ref_=tt_ov_i"
    },
    {
        title: "Barbie",
        year: 2023,
        rating: 6.8,
        poster: "https://www.imdb.com/title/tt1517268/mediaviewer/rm431105281/?ref_=tt_ov_i"
    },
    {
        title: "Dune: Part Two",
        year: 2024,
        rating: 8.4,
        poster: "https://www.imdb.com/title/tt15239678/mediaviewer/rm1391346433/?ref_=tt_ov_i"
    },
    {
        title: "Deadpool & Wolverine",
        year: 2024,
        rating: 7.5,
        poster: "https://www.imdb.com/title/tt6263850/mediaviewer/rm79129601/?ref_=tt_ov_i"
    },
    {
        title: "Inside Out 2",
        year: 2024,
        rating: 7.5,
        poster: "https://www.imdb.com/title/tt22022452/mediaviewer/rm1568556801/?ref_=tt_ov_i"
    },
    {
        title: "Spider-Man: Across the Spider-Verse",
        year: 2023,
        rating: 8.5,
        poster: "https://www.imdb.com/title/tt9362722/mediaviewer/rm1009725185/?ref_=tt_ov_i",
    }
];

// DOM elements
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const trendingSlider = document.getElementById('trendingSlider');
const statNumbers = document.querySelectorAll('.stat-number');

// Floating movie posters
const floatingPosters = [
    'https://www.imdb.com/title/tt15398776/mediaviewer/rm2670601217/?ref_=tt_ov_i', // oppenhiemer
    'https://www.imdb.com/title/tt1517268/mediaviewer/rm431105281/?ref_=tt_ov_i', // barbie
    'https://www.imdb.com/title/tt15239678/mediaviewer/rm1391346433/?ref_=tt_ov_i', // dune 2
    'https://www.imdb.com/title/tt6263850/mediaviewer/rm79129601/?ref_=tt_ov_i',
    'https://www.imdb.com/title/tt22022452/mediaviewer/rm1568556801/?ref_=tt_ov_i',
    'https://www.imdb.com/title/tt9362722/mediaviewer/rm1009725185/?ref_=tt_ov_i',
    
];

const morePosters = [
    'https://m.media-amazon.com/images/M/MV5BMTM4NzcwNDEwM15BMl5BanBnXkFtZTgwMDU3ODIxMzA@._V1_.jpg',      // The Dark Knight
    'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg', // Inception
    'https://m.media-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg5YzItYTk0MWI1ZWRkYjriL2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg', // Interstellar
    'https://m.media-amazon.com/images/M/MV5BNjViNDU4OWMtOTg3YS00YWNhLWJhYzEtOWI5MDE0YTA4ZTRlXkEyXkFqcGdeQXVyMTkxNjcxNQ@@._V1_.jpg', // Spider-Man No Way Home
];


// Initialize trending slider
function initTrendingSlider() {
    trendingSlider.innerHTML = trendingMovies.map(movie => `
        <div class="movie-slide">
            <div class="movie-poster" style="background-image: url(${movie.poster})">
                <div class="movie-overlay">
                    <div class="movie-title">${movie.title}</div>
                    <div class="movie-meta">
                        <span>${movie.year}</span>
                        <span>⭐ ${movie.rating}</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Navigation functionality
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(15, 15, 35, 0.98)';
    } else {
        navbar.style.background = 'rgba(15, 15, 35, 0.95)';
    }
});

// Animate stats on scroll
function animateStats() {
    const triggerBottom = window.innerHeight * 0.8;
    statNumbers.forEach(stat => {
        const rect = stat.getBoundingClientRect();
        if (rect.top < triggerBottom) {
            const target = stat.getAttribute('data-target');
            const duration = 2000;
            const start = 0;
            const increment = target / (duration / 16);
            
            let current = start;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 16);
        }
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Set floating IMDb posters
    const floatingCards = document.querySelectorAll('.card-float');
    floatingCards.forEach((card, index) => {
        if (floatingPosters[index]) {
            card.style.backgroundImage = `url(${floatingPosters[index]})`;
            card.style.backgroundSize = 'cover';
            card.style.backgroundPosition = 'center';
        }
    });

    initTrendingSlider();

    // Apply poster fallbacks for any dynamically injected IMDb backgrounds
    document.querySelectorAll('[style*="background-image: url("]').forEach((el) => {
        const style = el.getAttribute('style') || '';
        const match = style.match(/background-image:\s*url\(([^)]+)\)/);
        if (match && match[1]) {
            const url = match[1].replace(/^['"]|['"]$/g, '');
            const img = new Image();
            img.referrerPolicy = 'no-referrer';
            img.onload = () => {
                el.style.backgroundImage = `url(${url})`;
            };
            img.onerror = () => {
                el.style.backgroundImage = 'linear-gradient(135deg, rgba(14,165,233,0.35), rgba(3,105,161,0.15))';
            };
            img.src = url;
        }
    });

    // Animate hero elements
    document.querySelectorAll('.hero-content > *').forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Observe feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
    
    // Stats animation
    window.addEventListener('scroll', animateStats);
    animateStats();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});