<template>
<div class="body">
<mymenu></mymenu>

<div class="bg"></div>
<div id="div-test"></div>

<h1> INNER 2</h1>

</div>
</template>

<script>
import { innerMixin } from './js/innerMixin';
import { pixiMixin } from './js/pixiMixin';

export default {
 mixins: [innerMixin, pixiMixin],
 
     created() {
       //Scrolls to top when view is displayed
   			window.scrollTo(0, 0)
   			window.document.title = "FASHION 2  | EFETIVOS  "
   },
   mounted () {
     TweenMax.to('a',1,{color:'#ff0000'})
   }
}

</script>
<style lang="scss" scoped src="./css/style-inner2.scss"></style>