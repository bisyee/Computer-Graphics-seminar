import { Application } from './Application.js';
import { PerspectiveCamera } from './PerspectiveCamera.js';
import { GLTFLoader } from './GLTFLoader.js';
import { Renderer } from './Renderer.js';
import { FirstPersonController } from './FirstPersonController.js';

// import Barrier from './Barrier.js';

import Coins from './Coins.js';
import Meteors from './Meteors.js';
import Fuel from './Fuel.js';
import Life from './Life.js';

import {Light} from './Light.js';
import AirSpeed from './AirSpeed.js';






const mat4 = glMatrix.mat4;
const vec3 = glMatrix.vec3;
const quat = glMatrix.quat;

var mus = document.getElementById("music");


function playAudio() {
    //mus.currentTime = 0;
    mus.volume = 0.2;
    mus.play();
}

function pauseAudio() {
    mus.pause();
}

class App extends Application {
    async start() {
        this.loader = new GLTFLoader();
        await this.loader.load('./blender/map/city.gltf');

        this.scene = await this.loader.loadScene(this.loader.defaultScene);
        this.camera = await this.loader.loadNode('Camera_Orientation');
        this.plane = await this.loader.loadNode('ship');
        if (!this.scene || !this.camera) {
            throw new Error('Scene or Camera not present in glTF');
        }
        if (!this.camera.camera) {
            throw new Error('Camera node does not contain a camera reference');
        }   


        // this.barrier = new Barrier();
        // await this.barrier.build(this.loader);


        this.coins = new Coins();
        await this.coins.build(this.loader,  this.scene);

        this.meteors = new Meteors();
        await this.meteors.build(this.loader,  this.scene);

        this.life = new Life(); 
        // await this.loader.load('./blender/newmer1a.gltf');
        Object.assign(this.camera, { //2
            translation     :vec3.set(vec3.create(), 0, 2, 0),
            fov             : 1.5,
            maxFov          : 1.8,
            minFov          : 1,
            maxTranslation  : 7,
            yaw             : 0,
            pitch           : 0,
            roll            : 0,
            distanceFromPlane : 50,
            zoom            : -20,
            offset          : 0,
            angle           : 0
        });

    

        Object.assign(this.plane, {
            projection       : mat4.create(),
            rotation         : quat.fromEuler(quat.create(), 0, 0, 0),
            translation      : vec3.set(vec3.create(), -200, 400, 1000),
            velocity         : vec3.set(vec3.create(), 0, 0, 0),
            mouseSensitivity : 0.002,
            heading          : 0,
            maxSpeed         : 3,
            friction         : 0.04,
            acceleration     : 0.2,
            yaw              : 0,
            pitch            : 0,
            roll             : 0,
            collided         : false
        });
        this.scene.addNode(this.plane);
        this.scene.addNode(this.camera);
        this.fuel= new Fuel();
        this.fuel.subFuel();
        this.speed = 0;


       
        this.light = new Light();
        this.scene.addNode(this.light);


       
        this.controller= new FirstPersonController(this.plane,this.gl.canvas,this.camera);
        this.time = performance.now();
        this.startTime = this.time;
        // this.angle = this.plane.pitch;
        this.lastKeyPressed=null;

        this.renderer = new Renderer(this.gl);
        this.renderer.prepareScene(this.scene);

        playAudio();
        
    }

    render() {
        this.renderer.render(this.scene, this.camera,this.light);
    }

    resize(width, height) {
        this.camera.camera.aspect = width / height;
        this.camera.camera.updateProjectionMatrix();
    }
    update(time, dt){
        this.controller.update(dt);
        this.coins.update(dt);
        
        var collidedCoins = this.coins.collisionCoins(this.plane, this.scene);
        let angles = this.getEuler(this.plane.rotation);
        var collided = this.meteors.collision(this.plane, angles);
        //console.log(this.plane.translation);
        if(this.plane.translation[0] >330 && this.plane.translation[0]<475 &&  this.plane.translation[2] > 330  &&  this.plane.translation[2] <455 ){
            this.plane.translation = vec3.set(vec3.create(), this.plane.translation[0] - 1, 400, this.plane.translation[2]);
        }


               
        if (collided){
            this.plane.translation = vec3.set(vec3.create(), this.plane.translation[0] - 20, 400, this.plane.translation[2] - 20);
            this.life.subLife();
        }
        if(collidedCoins){
            this.checkpoints +=1;
           
        }
        
    }

    getEuler(q) {
        let vector = vec3.create();
        let x = q[0];
        let y = q[1];
        let z = q[2];
        let w = q[3];
        let x2 = x*x;
        let y2 = y*y;
        let z2 = z*z;
        let w2 = w*w;
        vector[0] = Math.asin(-2*(y*z+w*x));
        if (Math.cos(vector[0]!=0)) {
            vector[1] = Math.atan2(2*x*z-2*w*y, 1-2*x2-2*y2)
            vector[2] = Math.atan2(x*y-w*z, 1/2-x2-z2);
        } else {
            vector[1] = Math.atan2(-x*z-w*y, 1/2-y2-z2)
            vector[2] = 0;
        }
        return vector;
     }
    
    
}

const canvas = document.querySelector('canvas');
const app = new App(canvas);
await app.init();
document.querySelector('.loader-container').remove();
