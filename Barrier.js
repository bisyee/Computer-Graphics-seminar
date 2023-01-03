
// const vec3 = glMatrix.vec3;

export default class Barrier {
     constructor() {   
        this.barrier = [0,0,0];
    }
    
    collision(object) {
        let collided = false;
        if ((object.translation[0] > this.barrier.translation[0]+1500 ||
            object.translation[0] < this.barrier.translation[0]-1500 ||
            object.translation[2] > this.barrier.translation[2]+1500 || 
            object.translation[2] < this.barrier.translation[2]-1500
            )) {
            console.log('hit');
            collided = true;
        }          
        return collided;
    }
}