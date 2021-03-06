# vue_project

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

> IMPORTAR LIBS EXTERNAS WEBPACK / VUE

#Libs:
``` bash
 GSAP: npm install --save-dev gsap
 Jquery: npm install --save-dev jquery
 ScrollMagic: npm install --save-dev scrollmagic
 Jquery.Nicescroll: npm i  --save-dev  jquery.nicescroll
 PreloadJs: npm install preload-js --save-dev
 PixiJs: npm install pixi.js --save-dev
 ThreeJs: npm i three --save-dev
 OrbitControls Three: npm i three-orbit-controls --save-dev
 Glslify: npm install  glslify-loader raw-loader --save-dev
 Glslify Babel: npm i -S glslify babel-plugin-glslify
 PreRenderSPA: npm i prerender-spa-plugin --save-dev
 VueAnalytics: npm install vue-analytics --save-dev
 Pug:  npm install pug-loader --save-dev
       npm install -D pug

 (Verificar se todos constam no  Package.json)
 ```

  
### Importar/inserir Bibliotecas  dentro do <script>
 ``` bash
import { TweenMax, TimelineMax } from 'gsap'
import SplitText from 'gsap/SplitText'
import DrawSVGPluginfrom from 'gsap/DrawSVGPlugin'
import $ from 'jquery'
import ScrollMagic from 'scrollmagic'
import 'ScrollMagicGSAP'
import  nicescroll from 'jquery.nicescroll'
import imagesLoaded from 'imagesloaded'
import  Draggable  from 'gsap/Draggable'
import  ThrowPropsPlugin from 'gsap/ThrowPropsPlugin'	
import createjs from 'preload-js'
import 'pixi.js'
import * as THREE from 'three';
var OrbitControls = require('three-orbit-controls')(THREE);
var glsl = require('glslify')
 ```
 

 ### gsap.animation(ScrollMagic)
 >Install imports-loader:
 > npm install --save-dev imports-loader (Verificar Package.json)
 > Incluir no arquivo "webpack.base.conf.js
 ``` bash
 resolve: { 
  ....
  alias: { //Seção Alias
  > "ScrollMagicGSAP": "scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap"
  }
},

... //Seção Rules
module: {
  rules: [
    ....
    {
    > test: /\.js$/,
    > loader: "imports-loader?define=>false"
    },
  ],
},
....
 ```
### Linkar arquivo  CSS & Script dentro do component
 ``` bash
<script scoped type="script" src="./js/mainhome.js"></script>
<style scoped src="./css/styleHome.css"></style>
 ```

### Utilizar SCSS & SASS dentro do SFC 
 ``` bash
 Instalar:
npm install sass-loader node-sass --save-dev

Utilizar Lang:
<style lang="scss" scoped src="./css/style-contato.scss">
 ```

### Utilizar PUG
> // webpack.base.conf.js -> module.rules
 ``` bash
 // > // webpack.base.conf.js -> module.rules
{
  test: /\.pug$/,
  loader: 'pug-plain-loader'
}

 Instalar:
 npm install pug-loader --save-dev
 npm install -D pug

<template lang="pug">
div
  h1 Hello world!
</template>
 ```

### Utilizar PUG
> // main.js
 ``` bash 
import VueAnalytics from 'vue-analytics'

 //Por ultimo no código
Vue.use(VueAnalytics, {
  id: 'UA-77246407-1',
  router,
  autoTracking: {
    page: true
  }
})
 ```


## Importar Plugins GSAP 
> Criar na pasta gsap (node_modules) pasta com o nome do Plugin e colocar Plugin (uncompressed)
> fazer import dentro do javascript
 ``` bash
import DrawSVGPlugin from "gsap/DrawSVGPlugin"
import SplitText from "gsap/SplitText"
```

## Images PRELOADER
> Inserir dentro do mounted
 ``` bash
 export default {
    mounted(){
      imagesLoaded.makeJQueryPlugin( $ );
     }}
```



### Fazer animações dentro da função:
> export default { mounted(){ ......  }}
 ``` bash
export default { 
    mounted () { 

        //TwenMax or TimelineMax | Vai aqui

    } //Close Mounted
} //Close Export Defautl

 ```



# TRANSIÇÕES COM ROTA
> usar o router-link no lugar da tag a
 ``` bash
<router-link to="/path"> Home </router-link> 
```

> Tirar o hashtag (#) do path (navegador):
> Inserir mode: 'history' dentro do  export default { .... } do index.js (Router Import)
 ``` bash
mode: 'history',
```

> #dentro da tag export default { .... } //Não de esquecer colocar onComplete:next depois da Timeline ou TweenMax
 ``` bash
beforeRouteLeave(to, from, next) {
    var tlTrans = new TimelineMax({onComplete:next})
    .fromTo(this.$refs.cross, 2 ,{width: 0}, {width:"100%", ease: Power3.easeIn})
  }
  ```

## Transição diferente para cada Botão Clicado 
> Colocar nome da Rota no main.js (Router Import) e fazer condição (if) dentro do beforeRouteLeave
 ``` bash
 ,
   beforeRouteLeave(to, from, next) {
          if (to.name === 'NomeDaRota') {
            var tl = new TimelineMax({onComplete: next})
            .to(window, 1, {scrollTo:"#nmdSection"})
              
          } else {  }
    
    } //Close beforeRouterLink
  ```


## Scroll to top mudança da rota / Titulo da Pagina 
> dentro do  export default {...}
 ``` bash
created() {
        //Scrolls to top when view is displayed
        window.scrollTo(0, 0); //
        window.document.title = "Titulo da Página"
    }
```

## Criar .htaccess  | Apache Vue
> Incluir no .htaccess para ler a extensão com html5 history mode
 ``` bash
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

##### LOCAWEB - NAO REMOVER #####
AddHandler php56-script .php
suPHP_ConfigPath /home/marcelocalcados/
##### LOCAWEB - NAO REMOVER #####

```

## Remover "#" hashtag dos link | html5 mode history
> incluir no index.js (javascript do router) 
 ``` bash
export default new Router({
  >> mode: 'history',
  ...
  routes: [
    {
      path: '/test',
      name: 'GsapTest',
      component: GsapTest
    },
```


## PreRenderSPA
> incluir no webpack.prod.conf.js
 ``` bash
  const PrerenderSPAPlugin = require('prerender-spa-plugin')

    new PrerenderSPAPlugin(
      // Path to compiled app
      path.join(__dirname, '../dist'),
      // List of endpoints you wish to prerender
      [ '/', '/gsap', '/intro','/three' ],
      {
        // Espera puxar a api
        captureAfterTime: 10000,
        ignoreJSErrors: true,
        phantomPageViewportSize: {
          width: 1280,
          height: 720
        }
      }
    )
```

## Importar Component dentro do Single File Component
# ATENÇÃO - COLOCAR CSS SCOPED
> inserir dentro do Javascript  da página que vai receber o component externo:
> depois inserir o nome do component inserido (externo) dentro do template do SFC (receptor) <mymenu> </mymenu>
 ``` bash
import MyMenu from '../MyMenu.vue'


export default { 

  components: {
    'mymenu': MyMenu
  },

```

## Mixins | Reutilizar JS em outros components 
> Criar um arquivo JS | ex.: innerMixin.js
> Colocar export const innerMixin = { //Code goes Here ... }
 ``` bash
 //IMPORTAR LIBS ANTES
import { TweenMax, TimelineMax } from 'gsap'
import $ from 'jquery'
import Mymenu from '../Mymenu.vue'

export const innerMixin = {

  components: {
    'mymenu': Mymenu,
    'transition': Transition
  },

  mounted(){
  TweenMax.to('#div',1,{color:'red'})
  },
    beforeRouteLeave(to, from, next) {    
     //...
    }
    
 }//Close export const
  
```

> Importar mixin dentro da tag Script nos Components
 ``` bash
 <script>
import { innerMixin } from './js/innerMixin';

export default {
  mixins: [innerMixin],
  
	  created() {
        //Scrolls to top when view is displayed
				window.scrollTo(0, 0)
				window.document.title = "FASHION 2  | EFETIVOS  "
    },
    mounted () {
      TweenMax.to('a',1,{color:'red'})
    }
}

</script>
```

> Css /SCSS Component
 ``` bash
<style lang="scss" scoped>
@import './css/alias-mixins'; 
@import './css/normal-reset'; 
@import './css/style-inner';

h1 {
    color: aqua;
    transform: rotate(90deg)
}
</style>

</script>
```


## Dynamic Router-link / Change onClick
> HTML
 ``` bash
<router-link :to="{path: '/'+name}" class="link-dynamic"> LINK DYNAMIC</router-link>
    <button @click="sobre"> Sobre </button>
    <button @click="services"> Services </button>
    <button @click="contato"> Contato </button>
```

> JS
 ``` bash
export default {
  data (){
    return {
      name: ' '
    }
  },
  methods:{
    sobre:function (){
      this.name= 'sobre'; 
      this.$router.push({ path: '/sobre' })
    },
    
    services:function (){
      this.name= 'services';      
    },
    
    contato:function (){
      this.name= 'contato';      
    },
    
    home:function (){
      this.name= '';      
    }
  }
}
```

## Preload All Images
> main.js - On Scopo
 ``` bash
import Vue from 'vue'
import App from './App'
import router from './router'
import { TweenMax, TimelineMax } from 'gsap'
import $ from 'jquery'
import createjs from 'preload-js'

function importAll(r) {
  return r.keys().map(r);
}
const images = importAll(require.context('./components/images', false, /\.(png|jpe?g|svg)$/));




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
      src: images[3]
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
```

> No js do Component
 ``` bash
unction importAll(r) {
  return r.keys().map(r);
}
const images = importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));


//SET ALL IMAGES ON JQUERY
var i = 0;
$(document).ready(function(){
    $(".photos").each(function(i){
        i++
        $(this).css({'background-image':'url('+images[i]+')'});
    });
});
```