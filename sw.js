// sw.js - full working service worker with dynamic caching

const CACHE_NAME = 'lightning-games-cache-v6';
const urlsToCache = [
  '/',
  '/index.html',
  '/favicon.png',
  '/icon-192.png',
  '/icon-512.png',
  '/snake.html',
  '/tetris.html',
  '/maze.html',
  '/lightning-games.html',
  '/game.html'
  // add more static files if you have them, e.g., '/style.css', '/app.js'
];

// Install event - cache static files
self.addEventListener('install', event => {
  console.log('[SW] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => console.log('[SW] Static files cached'))
  );
  self.skipWaiting();
});

// Activate event - remove old caches
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

// Fetch event - serve from cache or fetch and cache dynamically
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse; // return cached version if available
      }

      return fetch(event.request).then(networkResponse => {
        // Cache the new response dynamically
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      }).catch(() => {
        // fallback if offline and resource not cached
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      });
    })
  );
});

