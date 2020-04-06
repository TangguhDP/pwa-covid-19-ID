var cacheName = 'web-app-v1';
var staticAssets = [
    '/',
    '/index.html',
    '/assets/style/hello-world.css',
    '/index.js',
    '/xhr.js',
    '/images/COVID19_Wallpaper-ID.jpg',
    '/images/kasus_corona.jpg',
    '/images/scrolldown.gif',
    'chart/highcharts.js',
    'chart/modules/exporting.js',
    'chart/modules/export-data.js',
    'chart/modules/accessibility.js'
];

self.addEventListener('install', function (e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(staticAssets);
        })
    );
});
self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request, { ignoreSearch: true }).then(response => {
            return response || fetch(event.request);
        })
    );
});

