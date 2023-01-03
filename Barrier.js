// const vec3 = glMatrix.vec3;

// export default class Barrier {
//      constructor() {   
//         this.barrier = null;
//     }

//     async build(loader) {
//         await loader.load('./blender/map/city.gltf');
//         let b = await loader.loadNode('barrier');
//         b.translation = vec3.set(vec3.create(), 0, 400, 0);
//         b.scale = vec3.set(vec3.create(), 1500, 1500, 1500);
//         this.barrier = b;
//         //console.log(b);
//     }
    
//     collision(object) {
//         let collided = false;
//         if ((object.translation[0] > this.barrier.translation[0]+1500 ||
//             object.translation[0] < this.barrier.translation[0]-1500 ||
//             object.translation[2] > this.barrier.translation[2]+1500 || 
//             object.translation[2] < this.barrier.translation[2]-1500
//             )) {
//             console.log('hit');
//             collided = true;
//         }          
//         return collided;
//     }

// }