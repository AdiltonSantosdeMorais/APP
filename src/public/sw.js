const CACHE_NAME = 'safetylog-v1';
const ASSETS_MAP = [
  './',
  './index.html',
  './manifest.json',
  './icon-512.png',
  './logo-elecnor.png',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
];

// Instalação: Salva todos os arquivos necessários no cache do navegador
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('SafetyLog: Arquivos em cache para uso offline');
      return cache.addAll(ASSETS_MAP);
    })
  );
});

// Ativação: Limpa caches antigos se houver atualização de versão
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
      );
    })
  );
});

// Interceptação: Serve os arquivos do cache quando estiver offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});