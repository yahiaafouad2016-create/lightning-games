// sw.js - full working service worker for GitHub Pages

const CACHE_NAME = 'lightning-games-cache-v8';
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
  // Add any CSS/JS files here if needed, e.g., '/lightning-games/style.css'
];

// Install - cache static files
self.addEventListener('install', event => {
  console.log('[SW] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => console.log('[SW] Static files cached'))
  );
  self.skipWaiting();
});

// Activate - remove old caches
self.addEventListener('activate', event => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:',

