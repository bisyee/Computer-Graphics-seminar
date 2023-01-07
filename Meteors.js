const vec3 = glMatrix.vec3;

export default class Meteors {
     constructor() {   
        this.meteors = [];
        this.animated = [];
    }

    async build(loader, scene) {

        let locat = [
            [700, 1300],
            [700, 700],
            [650, 100],
            [1100, -100],
            [750, -750],
            [0, 0],
            [0, -700],
            [-350, -200],
            [-350, -1300],
            [-1000, -750],
            [-1400, -200],
            [-200, 300],
            [-200, 1200],
            [-700, 200],
            [-1100, 800]
        ];

        var meteor;

        for (let i = 0; i < locat.length; i++) {
            await loader.load('./blender/meteor/Planet.gltf');
            meteor = await loader.loadNode(loader.defaultScene);
            meteor.translation = vec3.set(vec3.create(), locat[i][0], 400, locat[i][1]);
            meteor.scale = vec3.set(vec3.create(), 20, 20, 10);
            this.meteors.push(meteor);
            this.animated.push(meteor);
        }
        for(const object of this.animated) {
            object.isAnimated = true;
        }
        this.add(scene);
    }

    add(scene) {
        for (let i=0;i<this.meteors.length;i++) {
            scene.addNode(this.meteors[i]);       
        }
    }

    collision(object) {
        let collided = false;
        for (let i=0; i<this.meteors.length; i++) {
            if ((object.translation[0] < this.meteors[i].translation[0]+30 && 
                object.translation[0] > this.meteors[i].translation[0]-30 && 
                object.translation[2] < this.meteors[i].translation[2]+30 && 
                object.translation[2] > this.meteors[i].translation[2]-30)) {
                // console.log('hit'); 
               
                
                // vec3.sub(object.translation, object.translation, vec3.set(vec3.create(), Math.sin(angles[1])*0.0005, 0, -Math.cos(angles[1])*0.0005));
                // object.translation( vec3.set(vec3.create(), -200, 400, 1000));
                collided= true;
            //    this.meteors.splice(i, 1); 
            }          
            
        }
        return collided;
    }

}