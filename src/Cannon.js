import App from "./App.js"
import * as THREE from 'three'
import * as CANNON from 'cannon-es'

export default class Cannon extends App{

    threeSetup(){
        this.scene= new THREE.Scene();
        const geometry = new THREE.PlaneGeometry( 80, 80 );
        const material = new THREE.MeshBasicMaterial( {color: 0x00008B, side: THREE.DoubleSide} );
        this.plane = new THREE.Mesh( geometry, material );
        this.scene.add( this.plane );
// Box Geometry 1
        const geometry1 = new THREE.BoxGeometry( 10, 10, 10 );
        const material1 = new THREE.MeshBasicMaterial( {color: 0x00ff00, wireframe: true} );
        this.cube = new THREE.Mesh( geometry1, material1 );
        this.cube.position.y = 10
        // this.cube.quaternion.setFromEuler(-(3*Math.PI)/4,0,0)
        this.scene.add( this.cube );
// Box Geometry starts 2
        const geometry2 = new THREE.BoxGeometry( 10, 10, 10,5,5,5 );
        const material2 = new THREE.MeshBasicMaterial( {color: 0x00ff01, wireframe: true} );
        this.cube2 = new THREE.Mesh( geometry2, material2 );
        this.cube2.position.y = 15
        this.scene.add( this.cube2 );
    }

    cannonSetup(){
        this.world = new CANNON.World({
            gravity: new CANNON.Vec3(0,-9.81,0) //m/s^2
        })

        // Cube setup
        this.cubeBody = new CANNON.Body({
            mass: 1,
            shape: new CANNON.Box(new CANNON.Vec3(5,5,5)),
            position: new CANNON.Vec3(10,40,0)
        })
        this.world.addBody(this.cubeBody)
        // World setup
        this.groundBody = new CANNON.Body({
            type: CANNON.Body.STATIC,
            shape: new CANNON.Plane(),
          })
        this.groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0) // make it face up
        this.world.addBody(this.groundBody)
        // Cube setup 2
        this.cubeBody2 = new CANNON.Body({
            mass: 1,
            shape: new CANNON.Box(new CANNON.Vec3(5,5,5)),
            position: new CANNON.Vec3(0,20,10)
        })
        this.world.addBody(this.cubeBody2)
    }
}