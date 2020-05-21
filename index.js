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

window.addEventListener('load', () => {
  registerSW();
});

async function registerSW() {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('./sw.js');
      console.log(`SW registration successfully`);
    } catch (e) {
      console.log(`SW registration failed`);
    }
  }
}

$('.downs').click(function () {
  $('html, body').animate({
    scrollTop: $("#site1").offset().top
  }, 2000);
});