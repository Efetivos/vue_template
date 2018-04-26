// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { TweenMax } from 'gsap'
import $ from 'jquery'
import createjs from 'preload-js'

function importAll(r) {
  return r.keys().map(r);
}
const images = importAll(require.context('./components/images', false, /\.(png|jpe?g|svg)$/));

console.log(images);

//PreloadJs
function loadAllimg() {
  var queue = new createjs.LoadQueue(),
    $state = $('#state'),
    $progress = $('#progress'),
    $progressbar = $('#progressbar .bar');


  queue.on('complete', onComplete);
  queue.on('error', onError);
  queue.on('fileload', onFileLoad);
  queue.on('fileprogress', onFileProgress);
  queue.on('progress', onProgress);


  queue.loadManifest([
    {
      id: '1',
      src: images[0]
    }, {
      id: '2',
      src: images[1]
    }, {
      id: '3',
      src: images[2]
    }, {
      id: '4',
      src: 'http://unsplash.it/1093'
    }
  ]);


  function onComplete(event) {

    console.log('Complete', event);
    TweenMax.to('p', 3, { rotation: 360, onComplete: goRouter })
    function goRouter() {
      //  $('.sobre-btn').trigger('click')
    }
  }

  function onError(event) {

  }

  function onFileLoad(event) {
  }

  function onFileProgress(event) {
  }

  var count = 0;
  function onProgress(event) {
    var progress = Math.round(event.loaded * 100);

    TweenMax.set('#progressbar .bar', { width: progress + '%' })

    $('h1 span').text(progress)
    console.log(progress);
  }
}
loadAllimg();


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
