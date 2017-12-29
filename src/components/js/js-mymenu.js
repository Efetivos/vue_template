
import { TweenMax, TimelineMax } from 'gsap'
import $ from 'jquery'

export default { 
		
    mounted(){	

				$(".trigger-menu,.links-menu").click(function() {					
						tlMenu.reversed(!tlMenu.reversed());
						tlTriggerMenu.reversed(!tlTriggerMenu.reversed());
					});	
		}, 
		
            
  }//CloseExport