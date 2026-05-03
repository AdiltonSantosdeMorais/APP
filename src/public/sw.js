// Sempre que fizer uma mudança importante, mude esse número (ex: v1.1, v1.2)
const CACHE_NAME = 'elecnor-hse-v1.2'; 

const ASSETS = [
  '/',
  '/index.html',
  '/logo-elecnor.png',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
];

// Instalação e Cache
self.addEventListener('install', (e) => {
  self.skipWaiting(); // Força o SW novo a assumir o controle imediatamente
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Limpeza de Caches Antigos (Resolve o seu problema de abrir o formulário velho)
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key); // Apaga as versões antigas
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});