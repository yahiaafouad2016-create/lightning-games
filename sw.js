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
  '/lightning-games/lightning-games.html',
  '/lightning-games/game.html'
];

self.addEventListener('install', event => {
  console.log('[SW] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => console.log('[SW] Static files cached'))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', key);
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

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
        if (event.request.mode === 'navigate') {
          return caches.match('/lightning-games/index.html');
        }
      });
    })
  );
});

