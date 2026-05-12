// Sample trending movies for slider
const trendingMovies = [
    {
        title: "Oppenheimer",
        year: 2023,
        rating: 8.2,
        poster: "/images/oppenheimer.jpeg"
    },
    {
        title: "Barbie",
        year: 2023,
        rating: 6.8,
        poster: "/images/barbie.jpeg"
    },
    {
        title: "Dune: Part Two",
        year: 2024,
        rating: 8.4,
        poster: "/images/dune-part2.jpeg"
    },
    {
        title: "Deadpool & Wolverine",
        year: 2024,
        rating: 7.5,
        poster: "/images/deadpool&wolverine.jpeg"
    },
    {
        title: "Inside Out 2",
        year: 2024,
        rating: 7.5,
        poster: "/images/Inside_Out_2.jpg"
    },
    {
        title: "Spider-Man: Across the Spider-Verse",
        year: 2023,
        rating: 8.5,
        poster: "/images/spiderman.jpeg",
    }
];
// DOM elements
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const trendingSlider = document.getElementById('trendingSlider');
const statNumbers = document.querySelectorAll('.stat-number');

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
        navbar.style.background = 'rgba(31, 31, 75, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.85)';
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
    initTrendingSlider();

    // Ensure hero floating cards show real posters from /images
    if (typeof initHeroFloatingPosters === 'function') {
        initHeroFloatingPosters();
    }

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