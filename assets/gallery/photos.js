/* ═══════════════════════════════════════════════════════════════════════
   WILHELM GLOBAL HOLDINGS — GALLERY CONTENTS
   ═══════════════════════════════════════════════════════════════════════

   THIS IS THE ONLY FILE YOU NEED TO EDIT TO ADD PHOTOS.

   ── How to add a photo ───────────────────────────────────────────────
   1. Drop the image file into the matching folder, e.g.
         assets/gallery/first-class/opera-car.jpg
   2. Add one line to that category's `photos` list below:
         { src: 'first-class/opera-car.jpg', title: 'The Opera Car',
           caption: 'Carriage 14, looking aft.' },
      `src` is relative to assets/gallery/ — `title` and `caption`
      are both optional.
   3. Save. That's it — the tab, the count and the lightbox update
      themselves.

   ── How to add a whole new category ──────────────────────────────────
   Copy any block below, give it a new `id` (lowercase, no spaces),
   a `name` (what the tab reads), and make a folder to match.
   Order in this list = order of the tabs.

   ── Notes ────────────────────────────────────────────────────────────
   • A category with an empty `photos: []` still shows its tab, with
     instructions in place of the grid — so you can see where to add.
   • Keep uploads under ~400 KB each and no wider than ~1600px. The
     grid thumbnails are never displayed larger than ~600px.
   ═══════════════════════════════════════════════════════════════════════ */

const GALLERY = [
  {
    id: 'exterior',
    name: 'Exterior & Locomotive',
    intro: 'The Prussian Star as she is seen from the lineside — livery, running gear, and the drive units that have not been stilled since March 1972.',
    photos: [],
  },
  {
    id: 'first-class',
    name: 'First Class',
    intro: 'Carriages 5 through 30. Investor residences, the Garden, the Opera, and the Sky Lounge.',
    photos: [],
  },
  {
    id: 'second-class',
    name: 'Second Class',
    intro: 'The middle sectors — cabins, promenades and the shared saloons of the Prussian Star.',
    photos: [],
  },
  {
    id: 'third-class',
    name: 'Third Class',
    intro: 'Steerage. Free passage for the length of the circuit, for any passenger who presents themselves at a mainline station.',
    photos: [],
  },
  {
    id: 'dining',
    name: 'Dining & Lounges',
    intro: 'Kitchens, dining cars and lounge spaces across all three classes.',
    photos: [],
  },
  {
    id: 'route',
    name: 'Stations & Route',
    intro: 'Waypoints along the eternal circuit — 81 mainline cities across six continents.',
    photos: [],
  },
  {
    id: 'crew',
    name: 'Crew & Ceremony',
    intro: 'Stewards, engineers, the administration car, and the ceremonies that mark each completed circuit.',
    photos: [],
  },
];
