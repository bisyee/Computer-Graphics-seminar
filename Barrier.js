
export default class Barrier {
     constructor() {   
        this.barrier = [0,0,0];
    }
    
    collision(object) {
        let collided = false;
        //console.log(object);
        if ((object.translation[0] > this.barrier[0]+1700 ||
            object.translation[0] < this.barrier[0]-1700 ||
            object.translation[2] > this.barrier[2]+1700 ||
            object.translation[2] < this.barrier[2]-1700
            )) {
            
            collided = true;
        }          
        return collided;
    }
}

