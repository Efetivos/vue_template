//IMPORTAR LIBS ANTES
import { TweenMax, TimelineMax } from 'gsap'
import { container } from 'pixi.js'
import $ from 'jquery'

export const pixiMixin = {

 mounted(){

      
var myView = document.getElementById('div-test'),
divW = $(window).width(),
divH = $(window).height(); 

  var app = new PIXI.Application(divW,divH , {antialias: true, transparent: true}); 

console.log(divW); 


myView.appendChild(app.view);

var bg = PIXI.Sprite.fromImage('http://unsplash.it/1093');

bg.anchor.set(0.5);
bg.width = divW;
bg.x = app.screen.width / 2;
bg.y = app.screen.height / 4;

app.stage.addChild(bg);

var style = new PIXI.TextStyle({
fontFamily: 'Impact',
fontSize: 260,
// fontStyle: 'italic',
fontWeight: 'bold',
fill: ['#ff0000', '#ff0000'], // gradient
stroke: '#4a1850',
strokeThickness: 5,
dropShadow: true,
// dropShadowColor: '#ff0000',
// dropShadowBlur: 4,
// dropShadowAngle: Math.PI / 6,
// dropShadowDistance: 6,
wordWrap: true,
wordWrapWidth: 440
});

var basicText = new PIXI.Text('Efetivos', style);
basicText.x = app.screen.width / 6;
basicText.y = app.screen.height / 4;
app.stage.addChild(basicText);

bg.mask = basicText;

TweenMax.to(bg, 2, {x:400, repeat:-1, yoyo:true})
TweenMax.to( basicText, 2, {x:100, repeat:-1, yoyo:true})


  

        TweenMax.to('h1',1,{color:'red'});
        console.log(pixi);
        

 }
}//Close export const
 