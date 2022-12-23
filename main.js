import { Application } from './Application.js';
import { PerspectiveCamera } from './PerspectiveCamera.js';
import { GLTFLoader } from './GLTFLoader.js';
import { Renderer } from './Renderer.js';
import { FirstPersonController } from './FirstPersonController.js';
import Timer from './Timer.js';
import Stars from './Stars.js';

const mat4 = glMatrix.mat4;
const vec3 = glMatrix.vec3;
const quat = glMatrix.quat;

class App extends Application {

    async start() {
        this.loader = new GLTFLoader();
        await this.loader.load('./blender/cameraparenttry12.gltf');

        this.scene = await this.loader.loadScene(this.loader.defaultScene);
        this.camera = await this.loader.loadNode('Camera_Orientation');
        this.plane = await this.loader.loadNode('ship');
        if (!this.scene || !this.camera) {
            throw new Error('Scene or Camera not present in glTF');
        }
        if (!this.camera.camera) {
            throw new Error('Camera node does not contain a camera reference');
        }   
        this.stars = new Stars();
        await this.stars.build(this.loader,  this.scene);

    
        
        // await this.loader.load('./blender/newmer1a.gltf');

    

        Object.assign(this.plane, {
            projection       : mat4.create(),
            rotation         : quat.fromEuler(quat.create(), 0, 0, 0),
            translation      : vec3.set(vec3.create(), 720, 200, 900),
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

       
        this.controller= new FirstPersonController(this.plane,this.gl.canvas);
      


        this.time = performance.now();
        this.startTime = this.time;
        // this.angle = this.plane.pitch;
        this.lastKeyPressed=null;

        this.renderer = new Renderer(this.gl);
        this.renderer.prepareScene(this.scene);
        
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    resize(width, height) {
        this.camera.camera.aspect = width / height;
        this.camera.camera.updateProjectionMatrix();
    }
    update(time, dt){
        this.controller.update(dt);
        this.timer = new Timer();
         console.log(this.plane);
        // if(this.plane.translation[0] == vec3.set(vec3.create(), 720, 200, 900)[0]){
        //     console.log('star');
        // }

    }

}




const canvas = document.querySelector('canvas');
const app = new App(canvas);
await app.init();
document.querySelector('.loader-container').remove();
