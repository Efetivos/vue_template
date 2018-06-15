<template>
<div class="body">
<mymenu></mymenu>

<h1> INNER 1</h1>
</div>
</template>

<script>
import { innerMixin } from './js/innerMixin';

export default {
 mixins: [innerMixin],
 
     created() {
       //Scrolls to top when view is displayed
   			window.scrollTo(0, 0)
   			window.document.title = "FASHION 1  | EFETIVOS  "
   },
   mounted () {
     TweenMax.to('a',1,{color:'pink'})
   }
}

</script>

<style lang="sass" scoped>
@import './css/alias-mixins'; 
@import './css/normal-reset'; 
@import './css/style-inner';

h1 
    color: aqua;
    transform: rotate(90deg)

</style>