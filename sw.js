
const cacheName = 'lightning-cache-v7';
const filesToCache = [
  '/lightning-games/',
  '/lightning-games/index.html',
  '/lightning-games/snake.html',
  '/lightning-games/tetris.html'
];

// Install and cache files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(filesToCache);
    })
  );
  self.skipWaiting();
});

// Serve cached files
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
