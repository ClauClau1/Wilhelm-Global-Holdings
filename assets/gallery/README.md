# Gallery photos

Add photos in two steps:

1. **Drop the image** into the folder for its category, e.g.
   `assets/gallery/first-class/opera-car.jpg`
2. **Add one line** to that category in [`photos.js`](photos.js):

   ```js
   { src: 'first-class/opera-car.jpg', title: 'The Opera Car', caption: 'Carriage 14, looking aft.' },
   ```

The tab label, the photo count and the lightbox all update on their own.

To add a **new category**, copy any block in `photos.js`, give it a fresh
`id` and `name`, and create a folder with the same name as the `id`.

## Sizing

Keep each file under ~400 KB and no wider than ~1600px. Grid thumbnails are
never shown larger than ~600px, so anything bigger is bandwidth you pay for
and nobody sees. Images are lazy-loaded, so photos further down the page cost
nothing until the visitor scrolls to them.
