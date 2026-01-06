const CACHE_NAME = "lightning-games-v2";

self.addEventListener("install", e => {
  self.skipWaiting();
});

self.addEventListener("fetch", () => {});
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => key !== CACHE_NAME && caches.delete(key))
      )
    )
  );
  self.clients.claim();

self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
