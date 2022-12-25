const vec3 = glMatrix.vec3;

export default class Stars {
     constructor() {   
        this.coins = [];
    }

    async build(loader, scene) {
        await loader.load('./blender/coin/coin.gltf');
        let coin = await loader.loadNode(loader.defaultScene);
        coin.translation = vec3.set(vec3.create(), 400, 400, -300);
        coin.scale = vec3.set(vec3.create(), 20, 3, 20);
        this.coins.push(coin);
        // console.log(this.gl.canvas);

        await loader.load('./blender/coin/coin.gltf');
        coin = await loader.loadNode(loader.defaultScene);
        coin.translation = vec3.set(vec3.create(), 0, 400, 0);
        coin.scale = vec3.set(vec3.create(), 20, 3, 20);
        this.coins.push(coin);
        this.add(scene);


        await loader.load('./blender/coin/coin.gltf');
        coin = await loader.loadNode(loader.defaultScene);
        coin.translation = vec3.set(vec3.create(), -400, 400, -400);
        coin.scale = vec3.set(vec3.create(), 20, 3, 20);
        this.coins.push(coin);
  


        await loader.load('./blender/coin/coin.gltf');
        coin = await loader.loadNode(loader.defaultScene);
        coin.translation = vec3.set(vec3.create(), -400, 400, 400);
        coin.scale = vec3.set(vec3.create(), 20, 3, 20);
        this.coins.push(coin);
 


        await loader.load('./blender/coin/coin.gltf');
        coin = await loader.loadNode(loader.defaultScene);
        coin.translation = vec3.set(vec3.create(), -100, 400, 800);
        coin.scale = vec3.set(vec3.create(), 20, 3, 20);
        this.coins.push(coin);
 


        await loader.load('./blender/coin/coin.gltf');
        coin = await loader.loadNode(loader.defaultScene);
        coin.translation = vec3.set(vec3.create(), 300, 400, 0);
        coin.scale = vec3.set(vec3.create(), 20, 3, 20);
        this.coins.push(coin);


        await loader.load('./blender/coin/coin.gltf');
        coin = await loader.loadNode(loader.defaultScene);
        coin.translation = vec3.set(vec3.create(), 300, 400, 800);
        coin.scale = vec3.set(vec3.create(), 20, 3, 20);
        this.coins.push(coin);
        this.add(scene);
    
    }

    add(scene) {
      
        for (let i=0;i<this.coins.length;i++) {
            scene.addNode(this.coins[i]);       
        }
    }

    collision(object) {
        // let collided = false;
        // for (let i=0; i<this.coins.length; i++) {
        //     console.log(object.translation[0] < this.coins[i].translation[0]+50 , 
        //         object.translation[0] > this.coins[i].translation[0]-50, 
        //         object.translation[2] < this.coins[i].translation[2]+50, 
        //         object.translation[2] > this.coins[i].translation[2]-50)
        //     if ((object.translation[0] < this.coins[i].translation[0]+100 && 
        //         object.translation[0] > this.coins[i].translation[0]-100 && 
        //         object.translation[2] < this.coins[i].translation[2]+100 && 
        //         object.translation[2] > this.coins[i].translation[2]-100)) {
        //             console.log('hit'); 
        //        collided = true;
        //     //    this.coins.splice(i, 1); 
        //     }
           
            
        // }
    }
}