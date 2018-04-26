import { TweenMax } from 'gsap'
import $ from 'jquery'
/*import ScrollMagic from 'scrollmagic'
import 'ScrollMagicGSAP'
import SplitText from 'gsap/SplitText'*/
import Mymenu from '../Mymenu.vue'



export default { 
  components: {
    'mymenu': Mymenu
  },

	  created() {
        //Scrolls to top when view is displayed
				window.scrollTo(0, 0)
				window.document.title = "HOME  💠 | EFETIVOS "
		},
		
    mounted(){

      TweenMax.to('h1',2,{x:400,yoyo:true,repeat:-1})

        }, // mounted
        
        beforeRouteLeave(to, from, next) {
        
            if (to.name === 'Inner') {
              var tlGoDanny  = new TimelineMax({onComplete: next})
              .to('h1', 1, {opacity:0}) 
            }
            else {
              var tlGoNext  = new TimelineMax({onComplete: next})
              .to('h1', 1, {x:100})           
          }
        },// End beforeRouteLeave

        beforeRouteEnter (to, from, next) {
          if (from.name === 'Inner'){
              next(vm => {

                var tlFromlast  = new TimelineMax({onComplete: next})
                .set('h1', {rotation:180})        

              });
              } else {
                  next();
              }
          }// End beforeRouteEnter*/
              
  }//CloseExport


          