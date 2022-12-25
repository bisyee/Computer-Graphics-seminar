const vec3 = glMatrix.vec3;

export default class Meteors {
     constructor() {   
        this.meteors = [];
    }

    async build(loader, scene) {
        await loader.load('./blender/meteor/Planet.gltf');
        let meteor = await loader.loadNode(loader.defaultScene);
        meteor.translation = vec3.set(vec3.create(), 300, 400, 300);
        meteor.scale = vec3.set(vec3.create(), 20, 20, 10);
        this.meteors.push(meteor);

        await loader.load('./blender/meteor/Planet.gltf');
        meteor = await loader.loadNode(loader.defaultScene);
        meteor.translation = vec3.set(vec3.create(), -300, 400, 300);
        meteor.scale = vec3.set(vec3.create(), 20, 20, 10);
        this.meteors.push(meteor);
        
        await loader.load('./blender/meteor/Planet.gltf');
        meteor = await loader.loadNode(loader.defaultScene);
        meteor.translation = vec3.set(vec3.create(), 100, 400, -500);
        meteor.scale = vec3.set(vec3.create(), 20, 20, 10);
        this.meteors.push(meteor);

        await loader.load('./blender/meteor/Planet.gltf');
        meteor = await loader.loadNode(loader.defaultScene);
        meteor.translation = vec3.set(vec3.create(), 300, 400, -300);
        meteor.scale = vec3.set(vec3.create(), 20, 20, 10);
        this.meteors.push(meteor);

        await loader.load('./blender/meteor/Planet.gltf');
        meteor = await loader.loadNode(loader.defaultScene);
        meteor.translation = vec3.set(vec3.create(), -300, 400, -300);
        meteor.scale = vec3.set(vec3.create(), 20, 20, 10);
        this.meteors.push(meteor);



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
                console.log('hit'); 
               
                
                // vec3.sub(object.translation, object.translation, vec3.set(vec3.create(), Math.sin(angles[1])*0.0005, 0, -Math.cos(angles[1])*0.0005));
                // object.translation( vec3.set(vec3.create(), -200, 400, 1000));
                collided= true;
            //    this.meteors.splice(i, 1); 
            }          
            
        }
        return collided;
    }

}