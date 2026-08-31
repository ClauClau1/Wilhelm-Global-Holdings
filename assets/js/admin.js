/* ══════════════════════════════════════════════════════════════════════
   WILHELM GLOBAL HOLDINGS — Gallery admin

   Drag photographs in, arrange them, press Publish. The panel resizes
   each image in the browser, uploads it to the repository through the
   GitHub Contents API, and rewrites assets/gallery/photos.js.

   Static-site friendly — there is no backend. The only credential is a
   fine-grained GitHub token that you paste in yourself; it is kept in
   this browser's localStorage and never leaves it except as an
   Authorization header to api.github.com.
   ══════════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  // ── Config ────────────────────────────────────────────────────────────
  const PASS = "prussianstar";          // change to your own passphrase
  const REPO = { owner: "ClauClau1", repo: "Wilhelm-Global-Holdings", branch: "main" };
  const API = `https://api.github.com/repos/${REPO.owner}/${REPO.repo}/contents/`;
  const GAL_DIR = "assets/gallery/";
  const DATA_PATH = "assets/gallery/photos.js";

  const FULL_MAX = 1600;   // longest edge of the lightbox image
  const THUMB_MAX = 600;   // longest edge of the grid thumbnail
  const QUALITY = 0.82;

  const $ = (id) => document.getElementById(id);

  // Storage that never throws, even when the browser blocks it.
  const store = (backing) => ({
    get(k) { try { return backing.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { backing.setItem(k, v); } catch (e) {} },
    del(k) { try { backing.removeItem(k); } catch (e) {} },
  });
  const ss = store(window.sessionStorage);
  const ls = store(window.localStorage);

  const utf8b64 = (str) => btoa(unescape(encodeURIComponent(str)));
  const esc = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  const slugify = (s) => (s || "").toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 50);

  let token = "";
  let data = [];          // working copy of GALLERY
  let activeCat = null;
  let pending = [];       // [{catId, name, fullBlob, thumbBlob, w, h}]
  let dirty = false;

  // ── Toast ─────────────────────────────────────────────────────────────
  let toastTimer;
  function toast(msg, kind) {
    const t = $("toast");
    t.textContent = msg;
    t.className = "toast show" + (kind ? " toast--" + kind : "");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => (t.className = "toast"), kind === "err" ? 7000 : 3500);
  }

  // ── Ask dialog ────────────────────────────────────────────────────────
  // window.prompt/confirm are blocked in some browsers and embedded
  // webviews, so every question goes through a <dialog> instead.
  function ask({ title, body = "", value = null, ok = "OK" }) {
    return new Promise((resolve) => {
      const dlg = $("askDialog"), input = $("askInput");
      $("askTitle").textContent = title;
      $("askBody").textContent = body;
      $("askBody").style.display = body ? "" : "none";
      input.hidden = value === null;
      input.value = value || "";
      $("askOk").textContent = ok;

      const done = (result) => {
        $("askOk").removeEventListener("click", onOk);
        $("askCancel").removeEventListener("click", onCancel);
        dlg.close();
        resolve(result);
      };
      const onOk = () => done(value === null ? true : input.value.trim());
      const onCancel = () => done(null);
      $("askOk").addEventListener("click", onOk);
      $("askCancel").addEventListener("click", onCancel);
      dlg.addEventListener("cancel", (e) => { e.preventDefault(); onCancel(); }, { once: true });

      if (!dlg.open) dlg.showModal();   // showModal() throws if already open
      if (value !== null) input.focus();
    });
  }

  // ── Passphrase gate ───────────────────────────────────────────────────
  // Cosmetic only: this page is public, and anyone can read its source.
  // The GitHub token is the thing that actually authorises writes.
  function unlock() {
    $("gate").classList.add("hidden");
    $("app").classList.remove("hidden");
    boot();
  }
  $("gateForm").addEventListener("submit", (e) => {
    e.preventDefault();
    if ($("gatePass").value === PASS) { ss.set("wgh-admin-ok", "1"); unlock(); }
    else $("gateErr").textContent = "Wrong passphrase.";
  });
  $("lockBtn").addEventListener("click", () => { ss.del("wgh-admin-ok"); location.reload(); });

  // ── Token ─────────────────────────────────────────────────────────────
  function refreshTokenPill() {
    const p = $("tokenPill");
    p.textContent = token ? "Token connected" : "No GitHub token";
    p.className = "pill " + (token ? "pill--ok" : "pill--no");
  }
  $("tokenBtn").addEventListener("click", () => {
    $("tokenInput").value = token;
    $("tokenDialog").showModal();
  });
  $("tokenSave").addEventListener("click", () => {
    token = $("tokenInput").value.trim();
    ls.set("wgh-gh-token", token);
    refreshTokenPill();
    $("tokenDialog").close();
    toast(token ? "Token saved in this browser." : "Token cleared.");
  });
  $("tokenClear").addEventListener("click", () => {
    token = ""; ls.del("wgh-gh-token");
    $("tokenInput").value = ""; refreshTokenPill(); $("tokenDialog").close();
  });

  // ── GitHub Contents API ───────────────────────────────────────────────
  async function ghGetSha(path) {
    const r = await fetch(API + encodeURI(path) + "?ref=" + REPO.branch, {
      headers: { Authorization: "Bearer " + token, Accept: "application/vnd.github+json" },
    });
    if (r.status === 404) return null;
    if (!r.ok) throw new Error("GitHub read failed (" + r.status + ")");
    return (await r.json()).sha;
  }

  async function ghPut(path, contentB64, message) {
    const sha = await ghGetSha(path);
    const r = await fetch(API + encodeURI(path), {
      method: "PUT",
      headers: { Authorization: "Bearer " + token, Accept: "application/vnd.github+json" },
      body: JSON.stringify({ message, content: contentB64, branch: REPO.branch, sha: sha || undefined }),
    });
    if (!r.ok) {
      let m = r.status;
      try { m = (await r.json()).message || m; } catch (e) {}
      throw new Error("Publish failed: " + m);
    }
    return r.json();
  }

  async function ghDelete(path, message) {
    const sha = await ghGetSha(path);
    if (!sha) return;                       // already gone
    await fetch(API + encodeURI(path), {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token, Accept: "application/vnd.github+json" },
      body: JSON.stringify({ message, branch: REPO.branch, sha }),
    });
  }

  const blobToB64 = (blob) => new Promise((res, rej) => {
    const fr = new FileReader();
    fr.onload = () => res(String(fr.result).split(",")[1]);
    fr.onerror = rej;
    fr.readAsDataURL(blob);
  });

  // ── Image processing ──────────────────────────────────────────────────
  function loadImage(file) {
    return new Promise((res, rej) => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => { URL.revokeObjectURL(url); res(img); };
      img.onerror = () => { URL.revokeObjectURL(url); rej(new Error("Not a readable image")); };
      img.src = url;
    });
  }

  function resize(img, maxEdge) {
    const scale = Math.min(1, maxEdge / Math.max(img.width, img.height));
    const w = Math.max(1, Math.round(img.width * scale));
    const h = Math.max(1, Math.round(img.height * scale));
    const c = document.createElement("canvas");
    c.width = w; c.height = h;
    const ctx = c.getContext("2d");
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, 0, 0, w, h);
    return new Promise((res) => c.toBlob((b) => res({ blob: b, w, h }), "image/jpeg", QUALITY));
  }

  async function ingest(files, catId) {
    const list = [...files].filter((f) => /^image\//.test(f.type));
    if (!list.length) { toast("No images in that drop.", "err"); return; }
    for (const f of list) {
      try {
        const img = await loadImage(f);
        const full = await resize(img, FULL_MAX);
        const thumb = await resize(img, THUMB_MAX);
        pending.push({
          catId,
          name: f.name,
          fullBlob: full.blob, thumbBlob: thumb.blob,
          w: full.w, h: full.h,
          title: f.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").trim(),
          caption: "",
          previewUrl: URL.createObjectURL(thumb.blob),
        });
      } catch (e) {
        toast(`${f.name}: ${e.message}`, "err");
      }
    }
    dirty = true;
    render();
    toast(`${list.length} image${list.length > 1 ? "s" : ""} ready. Press Publish to upload.`);
  }

  // ── Data ──────────────────────────────────────────────────────────────
  function boot() {
    token = ls.get("wgh-gh-token") || "";
    refreshTokenPill();
    data = JSON.parse(JSON.stringify(typeof GALLERY !== "undefined" ? GALLERY : []));
    activeCat = data[0] ? data[0].id : null;
    render();
  }

  const cat = () => data.find((c) => c.id === activeCat);
  const pendingFor = (id) => pending.filter((p) => p.catId === id);

  function serialise() {
    const header =
`/* ═══════════════════════════════════════════════════════════════════════
   WILHELM GLOBAL HOLDINGS — GALLERY CONTENTS

   Generated by admin.html. Open that page to add or remove photographs;
   hand-editing works too, the shape is just JSON.
   ═══════════════════════════════════════════════════════════════════════ */

const GALLERY = `;
    return header + JSON.stringify(data, null, 2) + ";\n";
  }

  // ── Render ────────────────────────────────────────────────────────────
  function render() {
    renderTabs();
    renderPhotos();
    const n = pending.length;
    $("publishBtn").disabled = !dirty && !n;
    $("pendingCount").textContent = n ? `${n} image${n > 1 ? "s" : ""} queued` : "";
  }

  function renderTabs() {
    $("catTabs").innerHTML = data.map((c) => {
      const total = c.photos.length + pendingFor(c.id).length;
      return `<button class="cat-tab" data-cat="${esc(c.id)}"
        aria-selected="${c.id === activeCat}">${esc(c.name)}
        <span class="cat-count">${total}</span></button>`;
    }).join("");
    $("catTabs").querySelectorAll(".cat-tab").forEach((b) => {
      b.addEventListener("click", () => { activeCat = b.dataset.cat; render(); });
    });
  }

  function renderPhotos() {
    const c = cat();
    if (!c) { $("photoList").innerHTML = ""; return; }
    $("catName").value = c.name;
    $("catIntro").value = c.intro || "";

    const rows = [];

    c.photos.forEach((p, i) => rows.push(`
      <div class="photo-row" data-kind="saved" data-i="${i}">
        <img class="photo-thumb" src="${esc(GAL_DIR + (p.thumb || p.src))}" alt="">
        <div class="photo-fields">
          <input class="f-title" value="${esc(p.title || "")}" placeholder="Title">
          <input class="f-caption" value="${esc(p.caption || "")}" placeholder="Caption">
          <span class="photo-meta">${esc(p.src)} &middot; ${p.w || "?"}&times;${p.h || "?"}</span>
        </div>
        <div class="photo-actions">
          <button class="mini" data-act="up" title="Move up">&uarr;</button>
          <button class="mini" data-act="down" title="Move down">&darr;</button>
          <button class="mini mini--danger" data-act="del" title="Remove">&#10005;</button>
        </div>
      </div>`));

    pendingFor(c.id).forEach((p) => {
      const gi = pending.indexOf(p);
      rows.push(`
      <div class="photo-row photo-row--new" data-kind="pending" data-i="${gi}">
        <img class="photo-thumb" src="${p.previewUrl}" alt="">
        <div class="photo-fields">
          <input class="f-title" value="${esc(p.title)}" placeholder="Title">
          <input class="f-caption" value="${esc(p.caption)}" placeholder="Caption">
          <span class="photo-meta">new &middot; ${esc(p.name)} &middot; ${p.w}&times;${p.h}</span>
        </div>
        <div class="photo-actions">
          <button class="mini mini--danger" data-act="unqueue" title="Remove from queue">&#10005;</button>
        </div>
      </div>`);
    });

    $("photoList").innerHTML = rows.join("") ||
      `<p class="empty-note">No photographs in this category yet. Drag images onto the panel above.</p>`;

    $("photoList").querySelectorAll(".photo-row").forEach((row) => {
      const kind = row.dataset.kind;
      const i = Number(row.dataset.i);
      const target = kind === "saved" ? c.photos[i] : pending[i];

      row.querySelector(".f-title").addEventListener("input", (e) => {
        target.title = e.target.value; dirty = true; $("publishBtn").disabled = false;
      });
      row.querySelector(".f-caption").addEventListener("input", (e) => {
        target.caption = e.target.value; dirty = true; $("publishBtn").disabled = false;
      });

      row.querySelectorAll("[data-act]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const act = btn.dataset.act;
          if (act === "unqueue") {
            URL.revokeObjectURL(pending[i].previewUrl);
            pending.splice(i, 1);
          } else if (act === "del") {
            ask({ title: "Remove photograph?", ok: "Remove",
              body: "The image files are deleted from the repository when you next publish."
            }).then((yes) => {
              if (!yes) return;
              const [gone] = c.photos.splice(i, 1);
              (c._deleted = c._deleted || []).push(gone);
              dirty = true;
              render();
            });
            return;
          } else if (act === "up" && i > 0) {
            [c.photos[i - 1], c.photos[i]] = [c.photos[i], c.photos[i - 1]];
          } else if (act === "down" && i < c.photos.length - 1) {
            [c.photos[i + 1], c.photos[i]] = [c.photos[i], c.photos[i + 1]];
          }
          dirty = true;
          render();
        });
      });
    });
  }

  // ── Category editing ──────────────────────────────────────────────────
  $("catName").addEventListener("input", (e) => {
    const c = cat(); if (!c) return;
    c.name = e.target.value; dirty = true; renderTabs(); $("publishBtn").disabled = false;
  });
  $("catIntro").addEventListener("input", (e) => {
    const c = cat(); if (!c) return;
    c.intro = e.target.value; dirty = true; $("publishBtn").disabled = false;
  });

  $("addCatBtn").addEventListener("click", async () => {
    const name = await ask({ title: "New category", value: "",
      body: "What should the tab read?", ok: "Create" });
    if (!name) return;
    let id = slugify(name) || "category";
    if (data.some((c) => c.id === id)) id += "-" + (data.length + 1);
    data.push({ id, name: name.trim(), intro: "", photos: [] });
    activeCat = id; dirty = true; render();
  });

  $("delCatBtn").addEventListener("click", async () => {
    const c = cat(); if (!c) return;
    if (c.photos.length) { toast("Remove the photographs in this category first.", "err"); return; }
    const yes = await ask({ title: `Delete "${c.name}"?`, ok: "Delete",
      body: "The category is removed from the gallery when you next publish." });
    if (!yes) return;
    data = data.filter((x) => x.id !== c.id);
    activeCat = data[0] ? data[0].id : null;
    dirty = true; render();
  });

  // ── Drop zone ─────────────────────────────────────────────────────────
  const dz = $("dropzone");
  ["dragenter", "dragover"].forEach((ev) =>
    dz.addEventListener(ev, (e) => { e.preventDefault(); dz.classList.add("over"); }));
  ["dragleave", "drop"].forEach((ev) =>
    dz.addEventListener(ev, (e) => { e.preventDefault(); dz.classList.remove("over"); }));
  dz.addEventListener("drop", (e) => {
    if (!activeCat) { toast("Create a category first.", "err"); return; }
    ingest(e.dataTransfer.files, activeCat);
  });
  dz.addEventListener("click", () => $("fileInput").click());
  $("fileInput").addEventListener("change", (e) => {
    if (activeCat) ingest(e.target.files, activeCat);
    e.target.value = "";
  });

  // ── Publish ───────────────────────────────────────────────────────────
  $("publishBtn").addEventListener("click", publish);

  async function publish() {
    if (!token) { toast("Add a GitHub token first.", "err"); $("tokenDialog").showModal(); return; }
    const btn = $("publishBtn");
    btn.disabled = true;

    const steps = pending.length * 2 + 1;
    let done = 0;
    const progress = (label) => {
      done++;
      $("progress").textContent = `${label} (${done}/${steps})`;
    };

    try {
      // 1. Upload each queued image, full size and thumbnail.
      for (const p of pending) {
        const c = data.find((x) => x.id === p.catId);
        if (!c) continue;
        const base = uniqueName(c, slugify(p.title || p.name) || "photo");
        const src = `${p.catId}/${base}.jpg`;
        const thumb = `${p.catId}/${base}-t.jpg`;

        await ghPut(GAL_DIR + src, await blobToB64(p.fullBlob), `Gallery: add ${src}`);
        progress("Uploading " + base);
        await ghPut(GAL_DIR + thumb, await blobToB64(p.thumbBlob), `Gallery: add ${thumb}`);
        progress("Uploading " + base + " thumbnail");

        c.photos.push({ src, thumb, w: p.w, h: p.h, title: p.title, caption: p.caption });
      }

      // 2. Delete files for photographs removed in this session.
      for (const c of data) {
        for (const gone of (c._deleted || [])) {
          await ghDelete(GAL_DIR + gone.src, `Gallery: remove ${gone.src}`);
          if (gone.thumb) await ghDelete(GAL_DIR + gone.thumb, `Gallery: remove ${gone.thumb}`);
        }
        delete c._deleted;
      }

      // 3. Rewrite photos.js last, so it never points at a file that
      //    has not finished uploading.
      await ghPut(DATA_PATH, utf8b64(serialise()), "Gallery: update photos.js");
      progress("Updating photos.js");

      pending.forEach((p) => URL.revokeObjectURL(p.previewUrl));
      pending = [];
      dirty = false;
      $("progress").textContent = "";
      render();
      toast("Published. GitHub Pages usually redeploys within a minute.");
    } catch (e) {
      $("progress").textContent = "";
      btn.disabled = false;
      toast(e.message, "err");
    }
  }

  function uniqueName(c, base) {
    const taken = new Set(c.photos.map((p) => p.src.split("/").pop().replace(/\.jpg$/, "")));
    if (!taken.has(base)) return base;
    let n = 2;
    while (taken.has(`${base}-${n}`)) n++;
    return `${base}-${n}`;
  }

  // ── Guard against losing queued work ──────────────────────────────────
  window.addEventListener("beforeunload", (e) => {
    if (pending.length || dirty) { e.preventDefault(); e.returnValue = ""; }
  });

  // ── Resume an unlocked session ────────────────────────────────────────
  // Must be the last statement: unlock() runs boot(), which reaches the
  // const arrow functions declared above. Calling it any earlier hits
  // their temporal dead zone and the panel comes up empty.
  if (ss.get("wgh-admin-ok") === "1") unlock();
})();
