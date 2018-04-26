import { TweenMax } from 'gsap';
import $ from 'jquery';
import * as THREE from 'three';
var OrbitControls = require('three-orbit-controls')(THREE);
var glsl = require('glslify')
import img1 from '../images/efetivos_wp.png'
import img2 from '../images/efetivos_wp.png'
import img3 from '../images/efetivos_wp.png'
import img4 from '../images/efetivos_wp.png'

export default {
  mounted() {

    const vertex = glsl`
    uniform float time;
    uniform float waveLength;
    uniform vec2 resolution;
    uniform vec2 mouse;
    uniform float ratio;
    varying vec2 vUv;
    varying vec4 vPosition;
    void main() {
      vUv = uv;
    
    
      lowp float vWave = sin( time/4.+ (position.x + position.y)*waveLength);
    
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position.x + mouse.y*0.02 ,position.y + mouse.x*0.02,vWave*0.04, 1.0 );
    }
`;
    const fragment = glsl`
    uniform float time;
    uniform vec2 resolution;
    uniform vec2 mouse;
    uniform sampler2D img1;
    uniform float waveLength;
    uniform float ratio;
    varying vec2 vUv;
    varying vec4 vPosition;
    
    void main()	{
      vec2 p = 7.68*(gl_FragCoord.xy/resolution.xy - vec2(0.5,1.0)) - vec2(mouse.x,-15);
      vec2 i = p;
    
      float c = 0.;
        for(int n = 0; n<4; n++){
          float t = ( 1.0 - ( 10.0 / float( n + 10 ) ) ) * time*0.3;
          float ix = i.x + mouse.x;
          float iy = i.y + mouse.y;
          i = vec2( cos( t - ix ) + sin( t + iy ), sin( t - iy ) + cos( t + ix ) ) + p;
          c += float( n ) / length( vec2( p.x / ( sin( t + i.x ) / 1.1 ), p.y / ( cos( t + i.y ) / 1.1 ) ) ) * 20.0;
        }
        
        c /= 190.;
        c = 1.8 - sqrt( c );
    
    
        vec4 tx = texture2D( img1, vec2(vUv.s + 0.015, vUv.t + 0.015)) * 
        texture2D( img1, vec2( vUv.s + cos(c) * mouse.x * 0.5, vUv.t + cos(c) * mouse.y * 0.5 ) ) 
        * 0.25;
        vec4 newTx = vec4(tx.rgb, tx.a * ratio);
        vec4 ct = c * c * c * newTx;
        gl_FragColor = texture2D( img1, vec2( vUv.s + c*mouse.x * 0.75, vUv.t +  c*mouse.y * 0.75 ) );
        gl_FragColor = (ct - newTx * newTx - vec4( tx.rgb * 0.5, tx.a * vPosition.z ))*ratio;
    
    
    }
`;





    let camera, pos, controls, scene, renderer, geometry, geometry1, material, plane, tex1, tex2;
    let destination = { x: 0, y: 0 };
    let textures = [];

    function init() {
      scene = new THREE.Scene();

      renderer = new THREE.WebGLRenderer();

      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerWidth);

      var container = document.getElementById('container');
      container.appendChild(renderer.domElement);

      camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.001, 100
      );
      camera.position.set(0, 0, 1);


      controls = new OrbitControls(camera, renderer.domElement);

      textures = [
        THREE.ImageUtils.loadTexture(img1),
        THREE.ImageUtils.loadTexture(img2),
        THREE.ImageUtils.loadTexture(img3),
        THREE.ImageUtils.loadTexture(img4),
      ];


      material = new THREE.ShaderMaterial({
        side: THREE.DoubleSide,
        uniforms: {
          time: { type: 'f', value: 0 },
          ratio: { type: 'f', value: 1.2 },
          waveLength: { type: 'f', value: 14 },
          mouse: { type: 'v2', value: new THREE.Vector2() },
          resolution: { type: 'v2', value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
          img1: { type: 't', value: textures[0] }
        },
        // wireframe: true,
        vertexShader: vertex,
        fragmentShader: fragment,
      });

      plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 64, 64), material);
      scene.add(plane);

      resize();


    }

    window.addEventListener('resize', resize);
    function resize() {
      var w = window.innerWidth;
      var h = window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;

      // calculate scene
      let dist = camera.position.z - plane.position.z;
      let height = 1;
      camera.fov = 2 * (180 / Math.PI) * Math.atan(height / (2 * dist));

      if (w / h > 1) {
        plane.scale.x = plane.scale.y = 1.25 * w / h;
      }



      camera.updateProjectionMatrix();
    }

    let time = 0;
    function animate() {
      time = time + 0.12;
      material.uniforms.time.value = time;

      requestAnimationFrame(animate);
      render();
    }

    function render() {
      material.uniforms.mouse.value.x += (destination.x - material.uniforms.mouse.value.x) * 0.05;
      material.uniforms.mouse.value.y += (destination.y - material.uniforms.mouse.value.y) * 0.05;

      renderer.render(scene, camera);
    }

    let ww = window.innerWidth;
    let wh = window.innerHeight;

    function onMousemove(e) {
      var x = (e.clientX - ww / 2) / (ww / 2);
      var y = (e.clientY - wh / 2) / (wh / 2);
      destination.x = y;
      destination.y = x;
    }
    window.addEventListener('mousemove', onMousemove);



    init();
    animate();


    let counter = 0;
    let animating = 0;
    $('body').on('click', function () {
      if (animating) return;
      animating = 1;
      counter = (counter + 1) % textures.length;
      let tl = new TimelineMax({ onComplete: function () { animating = 0; } });
      tl
        .to(material.uniforms.waveLength, 0.5, { value: 22 })
        .to(material.uniforms.ratio, 0.5, {
          value: 0, onComplete: function () {
            material.uniforms.img1.value = textures[counter];
          }
        }, 0)
        .to(material.uniforms.ratio, 0.5, { value: 1.2 })
        .to(material.uniforms.waveLength, 0.5, { value: 26 }, 0.5);
    });

  } //close Mounted

}//Close Export Defautl