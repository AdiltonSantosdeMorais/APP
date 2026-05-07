const CACHE_NAME = 'hse-app-v1';
const ASSETS = [
  './',
  './index.html',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
];

// Instala o cache
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

// Intercepta requisições para servir do cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});