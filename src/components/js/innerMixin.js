//IMPORTAR LIBS ANTES
import { TweenMax } from 'gsap'
import $ from 'jquery'
import Mymenu from '../Mymenu.vue'

export const innerMixin = {

 components: {
   'mymenu': Mymenu
 },

 mounted(){

        TweenMax.to('h1',1,{color:'red'});

 },
   beforeRouteLeave(to, from, next) {    
    //...
   }
   
}//Close export const
 