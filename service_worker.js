var cacheName = "Subject-v1";
var cacheFiles = [
    'index.html',
    'js/index.js',
    'subject.webmanifest',
    'image/art&craft.jpeg',
    'image/coding.jpg',
    'image/cooking.jpg',
    'image/kid.png',
    'image/music.jpg',
    'image/outdoor.jpg',
    'image/reading.jpg',
    'image/scienceexp.jpg',
    'image/sports2.jpg',
    'image/theater2.jpeg',
    'image/volutering.jpg',
    'image/icon-store-512.png',
]

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Caching app shell');
            return cache.addAll(cacheFiles);
        })
    );
});


self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (r) {
            return r || fetch(e.request).then(function (response) {
                return caches.open(cacheName).then(function (cache) {
                    cache.put(e.request, response.clone());
                    return response;
                });
            })
        })
    );
    
});