const vec3 = glMatrix.vec3;

export default class Stars {
     constructor() {   
        this.trees = [];
    }

    async build(loader, scene) {
        await loader.load('./blender/star.gltf');
        let tree = await loader.loadNode(loader.defaultScene);
        tree.translation = vec3.set(vec3.create(), 720, 200, 900);
        tree.scale = vec3.set(vec3.create(), 3, 3, 3);
        this.trees.push(tree);
        // console.log(this.gl.canvas);
        this.add(scene);
    }

    add(scene) {
        for (let i=0;i<this.trees.length;i++) {
            scene.addNode(this.trees[i]);       
        }
    }

}