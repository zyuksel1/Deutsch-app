// Çevrimdışı çalışma: uygulama dosyaları ilk açılışta cihaza kaydedilir.
// Önce cihazdaki kopya açılır (internet gerekmez), arka planda yeni sürüm varsa indirilir; bir sonraki açılışta görünür.
const CACHE = "deutschapp-v15";
const FILES = [
  "./", "index.html", "style.css", "manifest.webmanifest",
  "icons/icon-180.png", "icons/icon-192.png", "icons/icon-512.png",
  "app.js",
  "audio/index.js",
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
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
  e.waitUntil(cacheAudio()); // ses dosyaları arka planda cihaza iner (internetsiz kullanım için)
});
// audio/index.js içindeki tüm ses dosyalarını, cihazda olmayanları, küçük gruplar halinde indir
async function cacheAudio() {
  try {
    const c = await caches.open(CACHE), txt = await (await fetch("audio/index.js", { cache: "no-cache" })).text();
    const names = [...new Set(txt.match(/[abest][0-9a-f]{10}\.mp3/g) || [])];
    for (let i = 0; i < names.length; i += 20) {
      await Promise.all(names.slice(i, i + 20).map(async n => { const u = new URL("audio/" + n, self.registration.scope).href; if (!(await c.match(u))) { try { const r = await fetch(u); if (r.ok) await c.put(u, r); } catch (e) {} } }));
    }
  } catch (e) {}
}
self.addEventListener("fetch", e => {
  const req = e.request; if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  e.respondWith(caches.open(CACHE).then(async c => {
    const hit = await c.match(req, { ignoreSearch: true });
    const net = fetch(req).then(r => { if (r.ok) c.put(new Request(req.url.split("?")[0]), r.clone()); return r; }).catch(() => null);
    if (hit) { e.waitUntil(net); return hit; }
    const r = await net; return r || (req.mode === "navigate" ? c.match("index.html") : Response.error());
  }));
});
