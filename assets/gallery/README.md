# Gallery photos

## The normal way — the admin panel

Open **[`admin.html`](../../admin.html)** in a browser:

1. Enter the passphrase (set at the top of `assets/js/admin.js`).
2. Press **Token** once and paste a GitHub fine-grained personal access token
   — scoped to this repository only, with a single permission,
   **Contents: Read and write**. It is stored in your browser, never in the repo.
3. Pick a category, drag photographs onto the drop zone, give them titles
   and captions, then press **Publish**.

The panel resizes every image in the browser before uploading — a 1600px
version for the lightbox and a 600px thumbnail for the grid — commits both to
`assets/gallery/<category>/`, and rewrites `photos.js`. GitHub Pages
redeploys within about a minute.

You can also add, rename, reorder and delete categories from the same page.

## The manual way

`photos.js` is plain data, so hand-editing still works. Drop a file into the
category folder and add an entry:

```js
{ "src": "first-class/opera-car.jpg",
  "thumb": "first-class/opera-car-t.jpg",   // optional; falls back to src
  "w": 1600, "h": 1067,                      // optional; prevents reflow
  "title": "The Opera Car",
  "caption": "Carriage 14, looking aft." }
```

Paths are relative to `assets/gallery/`. Order in the list is display order.

## A note on the token

`admin.html` is a public page — the passphrase only hides the interface, it
does not protect anything. The token is what actually authorises writes, so:

- scope it to this one repository, Contents-only;
- give it a short expiry;
- press **Clear** in the token dialog when working on a shared machine.

Never commit a token to this repository. Nothing in the repo needs one.
