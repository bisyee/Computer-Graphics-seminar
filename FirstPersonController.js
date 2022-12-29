import { quat, vec3, mat4, vec4} from './lib/gl-matrix-module.js';
import Meteors from './Meteors.js';
import Nitro from './Nitro.js';

export class FirstPersonController {

    constructor(node, domElement,camera) {
        this.camera=camera;
        this.node = node;
        this.domElement = domElement;

        this.keys = {};
        this.nitro = new Nitro();
        this.nitroAllow = true;

        this.pitch = 1.7;
        this.yaw = -9.8;

        this.velocity = [0, 0, 0];
        this.acceleration = 600;
        this.maxSpeed = 3000;
        this.decay = 0.9;
        this.pointerSensitivity = 0.002;

        this.initHandlers();
    }

    initHandlers() {
        this.pointermoveHandler = this.pointermoveHandler.bind(this);
        this.keydownHandler = this.keydownHandler.bind(this);
        this.keyupHandler = this.keyupHandler.bind(this);

        const element = this.domElement;
        
        const doc = element.ownerDocument;
        doc.addEventListener('keydown', this.keydownHandler);
        doc.addEventListener('keyup', this.keyupHandler);

        /*element.addEventListener('click', e => element.requestPointerLock());
        doc.addEventListener('pointerlockchange', e => {
            if (doc.pointerLockElement === element) {
                doc.addEventListener('pointermove', this.pointermoveHandler);
            } else {
                doc.removeEventListener('pointermove', this.pointermoveHandler);
            }
        });*/
    }

    update(dt) {
        
        // Calculate forward and right vectors.
        const cos = Math.cos(this.yaw);
        const sin = Math.sin(this.yaw);
        const forward = [sin, 0, cos];
        const right = [-cos, 0, sin];

        // Map user input to the acceleration vector.
        const acc = vec3.create();
        if (this.keys['KeyW']) {
            vec3.add(acc, acc, forward);
        }
        if (this.keys['KeyS']) {
            vec3.sub(acc, acc, forward);
        }
        if (this.keys['KeyD']) {
            vec3.add(acc, acc, right);
            this.yaw -=0.01;
        }
        if (this.keys['KeyA']) {
            vec3.sub(acc, acc, right);
            this.yaw +=0.01;
        }
        if(this.keys['ArrowDown']){
            this.camera.translation = vec3.set(vec3.create(),this.camera.translation[0], this.camera.translation[1] + 360 * dt * 0.003139865044, this.camera.translation[2]);
        }

        if(this.keys['ArrowUp']){
            this.camera.translation = vec3.set(vec3.create(),this.camera.translation[0], this.camera.translation[1] -360 * dt * 0.003139865044, this.camera.translation[2]);
        }
        if(this.keys['ArrowRight']){
            this.camera.rotation = vec4.set(vec4.create(),this.camera.rotation[0] - 0.00002 , this.camera.rotation[1] - 0.0002, this.camera.rotation[2] ,  this.camera.rotation[3]);
        }
        if(this.keys['ArrowLeft']){
            
            this.camera.rotation = vec4.set(vec4.create(),this.camera.rotation[0] + 0.00002, this.camera.rotation[1]+0.0002, this.camera.rotation[2],  this.camera.rotation[3] );
        }

        if(this.keys['KeyC']){
            var translation1 =  vec3.set(vec3.create(),this.camera.translation[0], this.camera.translation[1], this.camera.translation[2]);
            if(this.nitroAllow){
              
                while(this.acceleration <= 3000){
                    console.log(this.acceleration)
                    this.acceleration+=100;
                    this.camera.translation = vec3.set(vec3.create(),this.camera.translation[0], this.camera.translation[1] + 360 * dt * 0.103139865044, this.camera.translation[2]);
                }
               
            }
            this.camera.translation = vec3.set(vec3.create(),translation1[0], translation1[1], translation1[2]);
            this.nitro.subNitro();
            this.acceleration = 600;
            this.nitroAllow = false;
        }
       
     


        // Update velocity based on acceleration.
        vec3.scaleAndAdd(this.velocity, this.velocity, acc, dt * this.acceleration);

        // If there is no user input, apply decay.
        if (!this.keys['KeyW'] &&
            !this.keys['KeyS'] &&
            !this.keys['KeyD'] &&
            !this.keys['KeyA'])
        {
            const decay = Math.exp(dt * Math.log(1 - this.decay));
            vec3.scale(this.velocity, this.velocity, decay);
        }

        // Limit speed to prevent accelerating to infinity and beyond.
        const speed = vec3.length(this.velocity);
        if (speed > this.maxSpeed) {
            vec3.scale(this.velocity, this.velocity, this.maxSpeed / speed);
        }

        // Update translation based on velocity.
        this.node.translation = vec3.scaleAndAdd(vec3.create(),
            this.node.translation, this.velocity, dt);

        // Update rotation based on the Euler angles.
        const rotation = quat.create();
        quat.rotateY(rotation, rotation, this.yaw);
        quat.rotateX(rotation, rotation, this.pitch);
        this.node.rotation = rotation;

      
        
    }
    	
    pointermoveHandler(e) {
        const dx = e.movementX;
        const dy = e.movementY;

        this.pitch -= dy * this.pointerSensitivity;
        this.yaw   -= dx * this.pointerSensitivity;

        const twopi = Math.PI * 2;
        const halfpi = Math.PI / 2;

        this.pitch = Math.min(Math.max(this.pitch, -halfpi), halfpi);
        this.yaw = ((this.yaw % twopi) + twopi) % twopi;
    }

    keydownHandler(e) {
        this.keys[e.code] = true;
    }

    keyupHandler(e) {
        this.keys[e.code] = false;
    }

}