/* ─────────────────────────────────────────────────────────────
   Wilhelm Global Holdings — shared site behaviour
   Loaded by every page: index, route, layout, gallery.
   Every lookup is null-guarded so a page may omit any component.
   ───────────────────────────────────────────────────────────── */

// ─── WELCOME POPUP (index only) ───
(function () {
  const popup = document.getElementById('welcomePopup');
  if (!popup) return;
  if (!localStorage.getItem('wgh_welcomed')) {
    popup.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
})();

function dismissWelcome() {
  localStorage.setItem('wgh_welcomed', '1');
  const popup = document.getElementById('welcomePopup');
  if (!popup) return;
  popup.style.opacity = '0';
  popup.style.transition = 'opacity 0.4s ease';
  setTimeout(() => {
    popup.style.display = 'none';
    document.body.style.overflow = '';
  }, 400);
}

// ─── NAV HIDE/SHOW ON SCROLL ───
(function () {
  const navEl = document.querySelector('nav');
  if (!navEl) return;
  let lastScrollY = 0;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      const currentY = window.scrollY;
      if (currentY <= 10) {
        navEl.classList.remove('nav-hidden');
      } else if (currentY > lastScrollY + 4) {
        navEl.classList.add('nav-hidden');
      } else if (currentY < lastScrollY - 4) {
        navEl.classList.remove('nav-hidden');
      }
      lastScrollY = currentY;
      ticking = false;
    });
  }, { passive: true });
})();

// ─── SCROLL REVEAL ───
// Exposed so dynamically-built pages (route, layout, gallery) can
// register newly-inserted .reveal nodes without a second observer.
const _revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      _revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

function observeReveals(root) {
  (root || document).querySelectorAll('.reveal:not(.visible)')
    .forEach(el => _revealObserver.observe(el));
}
observeReveals();

// Respect users who ask for reduced motion: show everything immediately.
if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
}

// ─── MOBILE MENU ───
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  if (!menu) return;
  const open = menu.classList.toggle('open');
  document.getElementById('mobileMenuOverlay')?.classList.toggle('open', open);
  document.getElementById('navHamburger')?.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
}

function closeMobileMenu() {
  document.getElementById('mobileMenu')?.classList.remove('open');
  document.getElementById('mobileMenuOverlay')?.classList.remove('open');
  document.getElementById('navHamburger')?.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('#mobileMenu a[href^="#"]').forEach(a => {
  a.addEventListener('click', () => setTimeout(closeMobileMenu, 80));
});

// ─── OVERLAY PAGE SYSTEM ───
// The Route, Train Layout, Our History, Conditions of Carriage and
// Terms & Tariffs are now standalone documents. What remains here are the
// three short contact pages plus Passenger Rights, still shown as overlays
// and deep-linkable as index.html#page=<id>.
let _savedScrollY = 0;

function openPage(id) {
  const host = document.getElementById('overlay-pages');
  const pg = document.getElementById('pg-' + id);
  if (!host || !pg) return;
  _savedScrollY = window.scrollY;
  document.querySelectorAll('.overlay-page').forEach(p => p.classList.remove('active'));
  pg.classList.add('active');
  host.style.display = 'block';
  document.body.style.overflow = 'hidden';
  host.scrollTop = 0;
  if (id === 'rights' && typeof buildRights === 'function') buildRights();
}

function closePage() {
  const host = document.getElementById('overlay-pages');
  if (!host) return;
  host.style.display = 'none';
  document.body.style.overflow = '';
  if (location.hash.startsWith('#page=')) {
    history.replaceState(null, '', location.pathname + location.search);
  }
  window.scrollTo({ top: _savedScrollY, behavior: 'instant' });
}

// Open an overlay named in the URL, e.g. index.html#page=rights
function openPageFromHash() {
  const m = /^#page=([a-z-]+)$/.exec(location.hash);
  if (m) openPage(m[1]);
}

// Wait for DOMContentLoaded so every deferred script has run and defined its
// build* helpers before openPage() tries to call them. Note readyState is
// already 'interactive' while deferred scripts execute — only 'complete'
// means DOMContentLoaded has been and gone.
if (document.readyState === 'complete') {
  openPageFromHash();
} else {
  document.addEventListener('DOMContentLoaded', openPageFromHash);
}

// A #page= link followed from within the same document changes the hash
// without reloading, so react to that too.
window.addEventListener('hashchange', openPageFromHash);

// Close overlays / menus / modals with Escape.
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  const host = document.getElementById('overlay-pages');
  if (host && host.style.display === 'block') { closePage(); return; }
  if (document.getElementById('mobileMenu')?.classList.contains('open')) closeMobileMenu();
});
