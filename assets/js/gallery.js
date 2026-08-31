/* ═══════════════════════════════════════════════════════════════
   Wilhelm Global Holdings — Gallery (gallery.html)
   Reads the categories declared in assets/gallery/photos.js.
   To add photos, edit that file — nothing here needs changing.
   ═══════════════════════════════════════════════════════════════ */

const GAL_BASE = 'assets/gallery/';

const esc = (s) => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

let activeCat = null;   // category id currently shown
let lbIndex = 0;        // index within the active category's photos

// ─── TABS ───
function buildTabs() {
  const bar = document.getElementById('gallery-tabs');
  if (!bar) return;
  bar.innerHTML = GALLERY.map(cat => `
    <button class="gallery-tab" role="tab" id="tab-${esc(cat.id)}"
            aria-selected="false" aria-controls="gallery-panel"
            data-cat="${esc(cat.id)}">
      ${esc(cat.name)}<span class="gallery-tab-count">${cat.photos.length}</span>
    </button>`).join('');

  bar.querySelectorAll('.gallery-tab').forEach(btn => {
    btn.addEventListener('click', () => selectCategory(btn.dataset.cat, true));
  });

  // Left/Right arrows move between tabs, as a tablist should.
  bar.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const i = GALLERY.findIndex(c => c.id === activeCat);
    const next = (i + (e.key === 'ArrowRight' ? 1 : -1) + GALLERY.length) % GALLERY.length;
    selectCategory(GALLERY[next].id, true);
    document.getElementById('tab-' + GALLERY[next].id)?.focus();
  });
}

// ─── GRID ───
function selectCategory(id, pushHash) {
  const cat = GALLERY.find(c => c.id === id) || GALLERY[0];
  if (!cat) return;
  activeCat = cat.id;

  document.querySelectorAll('.gallery-tab').forEach(btn => {
    btn.setAttribute('aria-selected', String(btn.dataset.cat === cat.id));
  });

  const panel = document.getElementById('gallery-panel');
  if (!panel) return;

  const intro = cat.intro
    ? `<p class="gallery-cat-intro">${esc(cat.intro)}</p>` : '';

  if (!cat.photos.length) {
    panel.innerHTML = intro + `
      <div class="gallery-empty">
        <strong>No photographs filed yet</strong>
        <p>Drop images into <code>assets/gallery/${esc(cat.id)}/</code>, then add
        them to the <em>${esc(cat.name)}</em> list in
        <code>assets/gallery/photos.js</code>.</p>
      </div>`;
  } else {
    panel.innerHTML = intro + `<div class="gallery-grid">` + cat.photos.map((p, i) => `
      <figure class="gallery-item" role="button" tabindex="0"
              data-index="${i}" aria-label="${esc(p.title || 'Photograph ' + (i + 1))}">
        <img src="${esc(GAL_BASE + p.src)}"
             alt="${esc(p.alt || p.title || cat.name + ' photograph')}"
             loading="lazy" decoding="async">
        ${(p.title || p.caption) ? `<figcaption>${esc(p.title || '')}
          ${p.caption ? `<span>${esc(p.caption)}</span>` : ''}</figcaption>` : ''}
      </figure>`).join('') + `</div>`;

    panel.querySelectorAll('.gallery-item').forEach(fig => {
      const open = () => openLightbox(Number(fig.dataset.index));
      fig.addEventListener('click', open);
      fig.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
      });
    });

    // A photo that fails to load shouldn't leave a dead grey box.
    panel.querySelectorAll('.gallery-item img').forEach(img => {
      img.addEventListener('error', () => {
        img.closest('.gallery-item')?.style.setProperty('display', 'none');
      });
    });
  }

  if (pushHash) history.replaceState(null, '', '#' + cat.id);
}

// ─── LIGHTBOX ───
function currentPhotos() {
  return (GALLERY.find(c => c.id === activeCat) || { photos: [] }).photos;
}

function openLightbox(i) {
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  lbIndex = i;
  renderLightbox();
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
  document.querySelector('.lb-close')?.focus();
}

function renderLightbox() {
  const photos = currentPhotos();
  const p = photos[lbIndex];
  if (!p) return;
  const img = document.getElementById('lb-img');
  const cap = document.getElementById('lb-caption');
  const cnt = document.getElementById('lb-count');
  if (img) {
    img.src = GAL_BASE + p.src;
    img.alt = p.alt || p.title || 'Photograph';
  }
  if (cap) {
    cap.innerHTML = (p.title ? esc(p.title) : '') +
      (p.caption ? `<span>${esc(p.caption)}</span>` : '');
  }
  if (cnt) cnt.textContent = `${lbIndex + 1} / ${photos.length}`;
  // Only offer prev/next when there's more than one photo to move between.
  const many = photos.length > 1;
  document.querySelector('.lb-prev')?.style.setProperty('display', many ? 'flex' : 'none');
  document.querySelector('.lb-next')?.style.setProperty('display', many ? 'flex' : 'none');
}

function stepLightbox(d) {
  const n = currentPhotos().length;
  if (!n) return;
  lbIndex = (lbIndex + d + n) % n;
  renderLightbox();
}

function closeLightbox() {
  document.getElementById('lightbox')?.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (!document.getElementById('lightbox')?.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') stepLightbox(1);
  if (e.key === 'ArrowLeft') stepLightbox(-1);
});

// ─── INIT ───
buildTabs();
selectCategory(location.hash.replace('#', '') || (GALLERY[0] && GALLERY[0].id), false);
