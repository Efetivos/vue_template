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
 (Verificar se todos constam no  Package.json)
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
npm install --save-dev node-sass
npm install sass-loader --save-dev
npm install sass-resources-loader --save-dev

Utilizar Lang:
<style lang="scss" scoped src="./css/style-contato.scss">
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

> Before Rooute Enter
 ``` bash
        beforeRouteEnter (to, from, next) {
          if (from.name === 'nameOfComponent'){
              next(vm => {

                //Do Something

              });
              } else {
                  next();
              }
          }// End beforeRouteEnter
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

  ..
```