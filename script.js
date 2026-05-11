/* ─── THEME TOGGLE ─────────────────────── */
const themeBtn = document.getElementById('themeToggle');
const html = document.documentElement;
let isDark = true;

themeBtn.addEventListener('click', () => {
  isDark = !isDark;
  html.setAttribute('data-theme', isDark ? 'dark' : 'light');
  themeBtn.textContent = isDark ? '🌙' : '☀️';
});

/* ─── HAMBURGER MENU ────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

function closeMobile() {
  mobileMenu.classList.remove('open');
}

/* ─── SCROLL PROGRESS BAR ───────────────── */
const speedBar = document.getElementById('speed-bar');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = scrollTop / docHeight;
  speedBar.style.transform = `scaleX(${progress})`;
});

/* ─── REVEAL ON SCROLL ──────────────────── */
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = parseFloat(el.style.transitionDelay || 0) * 1000;
      setTimeout(() => el.classList.add('visible'), delay);
      observer.unobserve(el);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

/* ─── TYPING EFFECT ─────────────────────── */
const roles = [
  'Frontend Engineer',
  'React Developer',
  'Next.js Builder',
  'UI / UX Craftsman',
  'Software Engineer'
];
let roleIndex = 0, charIndex = 0, deleting = false;
const typedEl = document.getElementById('typed-text');

function typeLoop() {
  const current = roles[roleIndex];
  if (!deleting) {
    typedEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 55 : 85);
}
typeLoop();

/* ─── CONTACT: MAILTO ───────────────────── */
function sendMail() {
  const name = document.getElementById('contact-name').value.trim();
  const email = document.getElementById('contact-email').value.trim();
  const subject = document.getElementById('contact-subject').value.trim();
  const message = document.getElementById('contact-message').value.trim();

  if (!name || !message) {
    alert('Please fill in at least your name and message.');
    return;
  }

  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\n${message}`
  );
  const sub = encodeURIComponent(subject || 'Portfolio Contact');
  window.location.href = `mailto:omarashraf2153@gmail.com?subject=${sub}&body=${body}`;
}

/* ─── MAGNETIC BUTTONS ──────────────────── */
document.querySelectorAll('.btn-primary, .btn-outline').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.18;
    const dy = (e.clientY - cy) * 0.18;
    btn.style.transform = `translate(${dx}px, ${dy}px) translateY(-2px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});
