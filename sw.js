// sw.js - minimal working service worker

const CACHE_NAME = 'lightning-games-cache-v4';
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
];

// Install event - cache files
self.addEventListener('install', event => {
  console.log('[SW] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => console.log('[SW] All files cached'))
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
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

// Fetch event - serve from cache if possible
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
