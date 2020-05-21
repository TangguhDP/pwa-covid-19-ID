/*
Developed by :
Dhimas Panjie Herlambang
https://github.com/DhimasPH

Ichwanul Fadhli
https://github.com/ichwanulfadhli/

Tangguh Destio Pramono
https://github.com/TangguhDP

API by :
Mathroid
https://github.com/mathdroid/indonesia-covid-19-api

Copyright (c) 2020 Dhimas P. Herlambang, Ichwanul Fadhli, Tangguh D. Pramono
*/

var cacheName = 'web-app-v1';
var staticAssets = [
    './',
    './index.html',
    './assets/style/hello-world.css',
    './index.js',
    './xhr.js',
    './images/COVID19_Wallpaper-ID.jpg',
    './images/kasus_corona.jpg',
    './images/scrolldown.gif',
    './images/self_isolate.png',
    './images/social_distancing.png',
    './images/use_tissue.png',
    './images/wash_hands.png',
    './images/wear_mask.png',
    './chart/highcharts.js',
    './chart/exporting.js',
    './chart/export-data.js',
    './chart/accessibility.js',
    './fonts/icomoon/style.css',
    './css/bootstrap.min.css',
    './css/aos.css',
    './css/style.css',
    './js/jquery-3.3.1.min.js',
    './js/jquery-migrate-3.0.1.min.js',
    './js/jquery.animateNumber.min.js',
    './js/aos.js',
    './js/main.js',
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

