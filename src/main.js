import App from "./App.js"
import Cannon from "./Cannon.js"
// import RaycastScene from "./RaycastScene.js";

window.addEventListener('DOMContentLoaded',()=>{
    const canvas = document.getElementById('app')
    const app = new Cannon({canvas});
})