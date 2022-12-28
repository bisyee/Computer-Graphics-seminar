const vec3 = glMatrix.vec3;

export default class Coins {
     constructor() {   
        this.coins = [];
        this.coinsNum = 0;
        localStorage.setItem('status', 'won');
        localStorage.setItem('coins', this.coinsNum);
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
        // coin.rotation = vec3.set(vec3.create(), 1, 0, 0);
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

    collisionCoins(object, scene) {
        var collided = false;
        
        for (let i=0; i<this.coins.length; i++) {
            // console.log(object.translation)
            // console.log(this.coins[i])
            if (object.translation[0] < this.coins[i].translation[0]+20 && 
                object.translation[0] > -20 + this.coins[i].translation[0] && 
                object.translation[2] < this.coins[i].translation[2]+20 && 
                object.translation[2] > -20 + this.coins[i].translation[2]) {
                //console.log('got coin'); 
                scene.removeNode(this.coins[i]);

                //console.log(this.coins[i]);


                this.coins.splice(i, 1); 
                collided = true;
                this.coinsNum+=1;
                localStorage.setItem('coins', this.coinsNum);
                if (this.coins.length == 0) {
                    location.href='./end.html'
                }
                
                //console.log(this.coinsNum);
                return true;
                
                // vec3.sub(object.translation, object.translation, vec3.set(vec3.create(), Math.sin(angles[1])*0.0005, 0, -Math.cos(angles[1])*0.0005));
                // object.translation( vec3.set(vec3.create(), -200, 400, 1000));
            //    this.coins.splice(i, 1); 
            }          
            
        }
        return collided;
    }
}