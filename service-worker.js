const CACHE_NAME = 'majalengka-v1';
var urlsToCache = [
  '/',
  '/nav.html',
  '/index.html',
  '/pages/demografi.html',
  '/pages/geografis.html',
  '/pages/sejarah.html',
  '/pages/wisata.html',
  '/css/materialize.min.css',
  '/css/materialize.css',
  '/js/materialize.min.js',
  '/js/materialize.js',
  '/js/nav.js',
  '/image/logo-512.png',
  '/image/logo-192.png',
  '/image/pendopo.jpg',
  '/image/geografis-majalengka.jpg',
  '/image/demografi.jpg',
  '/image/curug-muara-jaya.jpg',
  '/image/panyaweuyan.jpg',
  '/image/taman-dinosaurus.jpg',
  '/manifest.json'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function(response) {
        if (response) {
          console.log('ServiceWorker: Gunakan aset dari cache: ', response.url);
          return response;
        }

        console.log(
          'ServiceWorker: Memuat aset dari server: ',
          event.request.url
        );
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log('ServiceWorker: cache ' + cacheName + ' dihapus');
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
