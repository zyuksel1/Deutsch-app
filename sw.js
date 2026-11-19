// Çevrimdışı çalışma: uygulama dosyaları ilk açılışta cihaza kaydedilir.
// Önce cihazdaki kopya açılır (internet gerekmez), arka planda yeni sürüm varsa indirilir; bir sonraki açılışta görünür.
const CACHE = "deutschapp-v11";
const FILES = [
  "./", "index.html", "style.css", "manifest.webmanifest",
  "icons/icon-180.png", "icons/icon-192.png", "icons/icon-512.png",
  "app.js",
  "backup.js",
  "content.js",
  "content/lieder.js",
  "content/u1-beruf.js",
  "content/u1-genel.js",
  "content/u2-beruf.js",
  "content/u2-genel.js",
  "lieder.js",
  "notes.js",
  "units-a1.js",
  "units.js",
];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const req = e.request; if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  e.respondWith(caches.open(CACHE).then(async c => {
    const hit = await c.match(req, { ignoreSearch: true });
    const net = fetch(req).then(r => { if (r.ok) c.put(new Request(req.url.split("?")[0]), r.clone()); return r; }).catch(() => null);
    if (hit) { e.waitUntil(net); return hit; }
    const r = await net; return r || (req.mode === "navigate" ? c.match("index.html") : Response.error());
  }));
});
