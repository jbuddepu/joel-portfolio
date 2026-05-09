// ============================================
// JOEL BUDDEPU PORTFOLIO — MAIN.JS
// ============================================

// ---- CUSTOM CURSOR ----
const cursor = document.createElement('div');
const cursorRing = document.createElement('div');
cursor.className = 'cursor';
cursorRing.className = 'cursor-ring';
document.body.append(cursor, cursorRing);

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function updateCursor() {
  cursorX += (mouseX - cursorX) * 0.3;
  cursorY += (mouseY - cursorY) * 0.3;
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;
  
  cursor.style.left = cursorX + 'px';
  cursor.style.top = cursorY + 'px';
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top = ringY + 'px';
  
  requestAnimationFrame(updateCursor);
}
updateCursor();

// Hide cursor on leave
document.addEventListener('mouseleave', () => {
  cursor.style.opacity = '0';
  cursorRing.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
  cursor.style.opacity = '1';
  cursorRing.style.opacity = '1';
});

// ---- HAMBURGER MENU ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = mobileMenu.querySelectorAll('a');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  updateHamburgerIcon();
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    updateHamburgerIcon();
  });
});

function updateHamburgerIcon() {
  const spans = hamburger.querySelectorAll('span');
  if (mobileMenu.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translateY(11px)';
    spans[1].style.opacity = '0';
  } else {
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
  }
}

// ---- INTERSECTION OBSERVER FOR REVEAL ANIMATIONS ----
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}, observerOptions);

document.querySelectorAll('.reveal, .reveal-slow, .reveal-up').forEach(el => {
  observer.observe(el);
});

// ---- ACTIVE NAV LINK ----
function updateActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

updateActiveNavLink();

// ---- CONTACT FORM HANDLING ----
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Basic validation
    if (!name || !email || !message) {
      alert('Please fill in all required fields');
      return;
    }
    
    // For demo: create a mailto link
    const mailtoLink = `mailto:jbuddepu@gitam.in?subject=${encodeURIComponent('Portfolio Contact: ' + (subject || 'Message'))}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
    // Show success message
    alert('Thank you for your message! Opening your email client...');
    
    // Open mailto
    window.location.href = mailtoLink;
    
    // Reset form
    contactForm.reset();
  });
}

// ---- SMOOTH SCROLL FOR ANCHOR LINKS ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// ---- MARQUEE PAUSE ON HOVER ----
const marqueeTracks = document.querySelectorAll('.marquee-track');

marqueeTracks.forEach(track => {
  const parent = track.parentElement;
  parent.addEventListener('mouseenter', () => {
    track.style.animationPlayState = 'paused';
  });
  parent.addEventListener('mouseleave', () => {
    track.style.animationPlayState = 'running';
  });
});

// ---- PAGE LOAD SCROLL POSITION ----
window.addEventListener('load', () => {
  // Trigger reveal animations on page load
  document.querySelectorAll('.reveal, .reveal-slow, .reveal-up').forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight) {
      el.classList.add('revealed');
    }
  });
});

// ---- KEYBOARD ACCESSIBILITY ----
document.addEventListener('keydown', (e) => {
  // Close mobile menu on Escape
  if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
    mobileMenu.classList.remove('open');
    updateHamburgerIcon();
  }
});

// ---- PERFORMANCE: Reduce motion ----
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  document.body.style.setProperty('--d', '0s !important');
  document.querySelectorAll('[style*="--d"]').forEach(el => {
    el.style.setProperty('--d', '0s', 'important');
  });
}

// ---- LAZY LOAD IMAGES (if needed) ----
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      }
    });
  });
  
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ---- CONSOLE EASTER EGG ----
console.log('%c🚀 Joel Buddepu Portfolio', 'font-size: 24px; color: #e8ff47; font-weight: bold; text-shadow: 0 0 10px rgba(232,255,71,0.5);');
console.log('%cBuilt with: HTML • CSS • JavaScript • ❤️', 'font-size: 14px; color: #e8ff47;');
console.log('%cOpen to remote internships • May 2026', 'font-size: 12px; color: #888; font-style: italic;');
