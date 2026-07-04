const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

function updateActiveLink() {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveLink);

// Counter Animation
const counters = document.querySelectorAll('.stat-num');

function animateCounter(counter) {
  const target = parseInt(counter.getAttribute('data-target'));
  const current = parseInt(counter.innerText) || 0;
  const increment = Math.ceil(target / 60);
  if (current < target) {
    counter.innerText = Math.min(current + increment, target);
    requestAnimationFrame(() => animateCounter(counter));
  } else {
    counter.innerText = target + '+';
  }
}

const heroStats = document.querySelector('.hero-stats');
let counted = false;

window.addEventListener('scroll', () => {
  if (!counted && heroStats.getBoundingClientRect().top < window.innerHeight) {
    counted = true;
    counters.forEach(c => animateCounter(c));
  }
});

// Scroll Reveal
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// Back to Top
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Toast
function showToast(message, subMessage) {
  const toast = document.getElementById('toast');
  const strong = toast.querySelector('strong');
  const span = toast.querySelector('span');
  if (message) strong.textContent = message;
  if (subMessage) span.textContent = subMessage;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

// Contact Form
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  showToast('Pesan Terkirim!', 'Terima kasih, kami akan menghubungi Anda segera.');
  this.reset();
});

// Image Modal
const imgModal = document.getElementById('imgModal');
const imgModalContent = document.getElementById('imgModalContent');
const imgModalClose = document.getElementById('imgModalClose');

document.querySelectorAll('.team-avatar img').forEach(img => {
  img.style.cursor = 'pointer';
  img.addEventListener('click', (e) => {
    e.stopPropagation();
    imgModalContent.src = img.src;
    imgModal.classList.add('show');
    document.body.style.overflow = 'hidden';
  });
});

function closeModal() {
  imgModal.classList.remove('show');
  document.body.style.overflow = '';
}

imgModalClose.addEventListener('click', closeModal);
imgModal.addEventListener('click', (e) => {
  if (e.target === imgModal) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// Navbar shadow
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  navbar.style.boxShadow = window.scrollY > 50
    ? '0 2px 24px rgba(0,0,0,0.3)'
    : 'none';
});
