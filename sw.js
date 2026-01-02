const CACHE_NAME = "lightning-games-v11";
const filesToCache = [
  './',
  './index.html',
  './snake.html',
  './tetris.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
caches.open(CACHE_NAME).then(cache => cache.addAll(filesToCache))
  );
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    )
  );
});
