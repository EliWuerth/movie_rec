// Hero floating posters are driven from /images so the UI updates without editing HTML/CSS.

const HERO_FLOATING_POSTERS = [
  'images/oppenheimer.jpeg',
  'images/barbie.jpeg',
  'images/dune-part2.jpeg'
];

function initHeroFloatingPosters() {
  const floats = document.querySelectorAll('.floating-cards .card-float');
  if (!floats.length) return;

  // Assign posters (deterministic order). If more/less cards exist, cycle.
  floats.forEach((el, idx) => {
    const poster = HERO_FLOATING_POSTERS[idx % HERO_FLOATING_POSTERS.length];
    el.style.backgroundImage = `url(${poster})`;
    // Fallback: ensure background works even if other CSS changes.
    el.style.backgroundSize = 'cover';
    el.style.backgroundPosition = 'center';
  });
}

