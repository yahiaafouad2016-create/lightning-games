const CACHE_NAME = 'lightning-games-cache-v9';
const urlsToCache = [
  '/lightning-games/',
  '/lightning-games/index.html',
  '/lightning-games/favicon.png',
  '/lightning-games/icon-192.png',
  '/lightning-games/icon-512.png',
  '/lightning-games/snake.html',
  '/lightning-games/tetris.html',
  '/lightning-games/maze.html',
  '/lightning-games/game.html',
  '/lightning-games/lightning-games.html',
  '/lightning-games/main.js'
];

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) return cachedResponse;

      // Try network if not in cache
      return fetch(event.request).then(networkResponse => {
        return caches.open('lightning-games-cache-v1').then(cache => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      }).catch(() => {
        // If navigation fails (offline), serve index.html
        if (event.request.mode === 'navigate') {
          return caches.match('/lightning-games/index.html');
        }
      });
    })
  );
});

