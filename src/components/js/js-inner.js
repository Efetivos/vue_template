import { TweenMax, TimelineMax } from 'gsap'
import $ from 'jquery'

import Mymenu from '../Mymenu.vue'
/*import ScrollMagic from 'scrollmagic'
import 'ScrollMagicGSAP'
import SplitText from 'gsap/SplitText'
import DrawSVGPluginfrom from 'gsap/DrawSVGPlugin'
//import niceScroll from 'jquery.nicescroll''*/



export default { 
 components: {
    'mymenu': Mymenu
  },

	  created() {
        //Scrolls to top when view is displayed
				window.scrollTo(0, 0)
				window.document.title = "INNER 1 🔸 | EFETIVOS  "
		},
		
    mounted(){


    }, //CloseMounted
        beforeRouteLeave(to, from, next) {
      
          if (to.name === 'Home') {
            var tlGoDanny  = new TimelineMax({onComplete: next})
            .to('h1', 1, {opacity:0}) 
          }
          else {
            var tlGoNext  = new TimelineMax({onComplete: next})
            .to('h1', 1, {x:100})           
        }
          
        }
              
  }//CloseExport

          