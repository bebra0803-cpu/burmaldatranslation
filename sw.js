const CACHE_NAME = 'burmaldat-v10';
const urlsToCache = [
  '/burmaldatranslation/',
  '/burmaldatranslation/index.html',
  '/burmaldatranslation/manifest.json',
  '/burmaldatranslation/icon-192.png',
  '/burmaldatranslation/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
});
