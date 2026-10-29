// Service worker : garde une copie de l'application pour qu'elle marche sans réseau.
// Stratégie « réseau d'abord » : quand le serveur répond, on rafraîchit la copie ;
// sinon on sert la copie en cache.
const CACHE = "kit-survie-v1";
const FICHIERS = [
  "./",
  "index.html",
  "css/style.css",
  "js/markdown.js",
  "js/outils.js",
  "js/app.js",
  "data/donnees.js",
  "icone.svg",
  "manifest.webmanifest",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FICHIERS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((cles) => Promise.all(cles.filter((c) => c !== CACHE).map((c) => caches.delete(c))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin || url.pathname.startsWith("/api/")) return;
  e.respondWith(
    fetch(e.request)
      .then((reponse) => {
        if (reponse.ok) {
          const copie = reponse.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copie));
        }
        return reponse;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});
