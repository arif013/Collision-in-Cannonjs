import * as THREE from "three"
// import * as TWEEN from '@tweenjs/tween.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {TransformControls} from 'three/examples/jsm/controls/TransformControls';
import * as dat from 'dat.gui'

export default class App{
    constructor({canvas}){
        this.canvas = canvas;
        this.init();
        this.render();
    }
    init(){
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight,0.1,1000);
        this.camera.position.set(0,20,60)
        this.renderer = new THREE.WebGLRenderer({canvas:this.canvas})

        this.pointer = new THREE.Vector2();
        this.setUpLights();

        this.resize();
        this.setUpEvents();
        this.setUpControls()
        this.setUpGUI()

        // From Cannon 
        this.threeSetup()
        this.cannonSetup()
        // this.setup()
    }
    render(){
        this.orbitControl.update()
        this.renderer.render(this.scene, this.camera);
        
        // this.update();
        requestAnimationFrame(()=>{this.render()});
        // From Cannon
        this.world.fixedStep()
        this.plane.position.copy(this.groundBody.position)
        this.plane.quaternion.copy(this.groundBody.quaternion)

        this.cube.position.copy(this.cubeBody.position)
        this.cube.quaternion.copy(this.cubeBody.quaternion)

        this.cube2.position.copy(this.cubeBody2.position)
        this.cube2.quaternion.copy(this.cubeBody2.quaternion)


    }
    resize(){
        this.camera.aspect = window.innerWidth/window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight)
    }

    setUpEvents(){
        window.addEventListener('resize',()=> this.resize());
        // window.addEventListener('mousemove',(e)=>this.mouseMove(e))
    }

    setUpControls(){
        this.orbitControl = new OrbitControls(this.camera, this.renderer.domElement)
    }
    setUpLights(){
        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
        this.scene.add(this.ambientLight);

        this.pointLight = new THREE.PointLight(0xffffff, 1.0);
        this.pointLight.position.y = 5;
        this.scene.add(this.pointLight)

        this.pointLightTransformControl = new TransformControls(this.camera, this.renderer.domElement);
        this.pointLightTransformControl.addEventListener('dragging-changed',()=>{
            this.orbitControl.enabled = !this.orbitControl.enabled;
        })
        this.pointLightTransformControl.attach(this.pointLight);
        this.scene.add(this.pointLightTransformControl)
    }
    setUpGUI(){
        this.gui = new dat.GUI();
        let ambientFolder = this.gui.addFolder("Ambient Light")
        ambientFolder.add(this.ambientLight,'intensity',0,1)

        let pointFolder = this.gui.addFolder("Point Light")
        pointFolder.add(this.pointLight,'intensity',0,1)

        pointFolder.add(this.pointLightTransformControl, 'visible')
        .onChange((e)=>{
            this.pointLightTransformControl.enabled = e;
        })
        }
    // mouseMove(event){
    //     this.pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    //     this.pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    // }
    
}