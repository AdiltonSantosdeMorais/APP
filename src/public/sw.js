const CACHE_NAME = 'hse-v10'; // Aumente este número sempre que mudar o código
const ASSETS = [
  './',
  './index.html',
  './logo-elecnor.png',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
];

self.addEventListener('install', (e) => {
  self.skipWaiting(); // Força a nova versão a ativar imediatamente
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => (key !== CACHE_NAME ? caches.delete(key) : null))
    ))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});