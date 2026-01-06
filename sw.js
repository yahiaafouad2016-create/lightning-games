const CACHE_NAME = 'lightning-games-cache-v7';
const urlsToCache = [
  '/lightning-games/',
  '/lightning-games/index.html',
  '/lightning-games/favicon.png',
  '/lightning-games/icon-192.png',
  '/lightning-games/icon-512.png',
  '/lightning-games/snake.html',
  '/lightning-games/tetris.html',
  '/lightning-games/maze.html',
  '/lightning-games/lightning-games.html',
  '/lightning-games/game.html'
];

const CACHE_NAME = 'lightning-games-cache-v7';
const urlsToCache = [
  '/lightning-games/',
  '/lightning-games/index.html',
  '/lightning-games/favicon.png',
  '/lightning-games/icon-192.png',
  '/lightning-games/icon-512.png',
  '/lightning-games/snake.html',
  '/lightning-games/tetris.html',
  '/lightning-games/maze.html',
  '/lightning-games/lightning-games.html',
  '/lightning-games/game.html'
];

// --- Paste this fetch handler directly below ---
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) return cachedResponse;

      return fetch(event.request).then(networkResponse => {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      }).catch(() => {
        // fallback if offline and navigating
        if (event.request.mode === 'navigate') {
          return caches.match('/lightning-games/index.html');
        }
      });
    })
  );
});
