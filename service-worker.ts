const CACHE_NAME = "agenda-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/src/styles.css",
  "/src/main.tsx",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
];

self.addEventListener("install", (event: any) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("activate", (event: any) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      )
    )
  );
});

self.addEventListener("fetch", (event: any) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
