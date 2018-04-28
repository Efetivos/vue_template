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
const images = importAll(require.context('./components/images/', false, /\.(png|jpe?g|svg)$/));

console.log(images);

//PreloadJs
function loadAllimg() {
  var queue = new createjs.LoadQueue(true, "../_assets/art/"),
    $state = $('#state'),
    $progress = $('#progress'),
    $progressbar = $('#progressbar .bar');


  queue.on('complete', onComplete);
  queue.on('error', onError);
  queue.on('fileload', onFileLoad);
  queue.on('fileprogress', onFileProgress);
  queue.on('progress', onProgress);



 
/*   queue.loadManifest([

    { id: '1', src: images[0] },
    { id: '2', src: images[1] },
    { id: '3', src: images[2] },
    { id: '4', src: images[3] },
  ]);
 */



  function onComplete(event) {

    TweenMax.to('.wrap-logo-reveal', 3, { height: '102vh', marginTop: '-31vh', ease: Power4.easeInOut })
    // console.log('Complete', event);
    //TweenMax.to('p', 3, { rotation: 360, onComplete: goRouter })
    function goRouter() {
      //  $('.sobre-btn').trigger('click')
    }
  }

  function onError(event) {

  }

  function onFileLoad(event) {

      /*     i++; console.log(queue.getResult("1"));
          console.log(images.length) */
  }

  var i = 0; //counter 
  function onFileProgress(event) {
    if (i < images.length) { //counter menor que a quantidade de items no array
      var item = images[i]; //var item recebe cada item da array
      queue.loadFile(item); //fila carrega cada item da array
      console.log(item)
      i++ //counter ++
    }

  }
  var count = 0;
  function onProgress(event) {
    var progress = Math.round(event.loaded * 100);

    TweenMax.set('.wrap-logo-reveal', { width: progress + '%' })

    $('span.counter').text(progress + '%')
    // console.log(progress);
  }
  onFileProgress(); //inicializa carregador
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
