const vec3 = glMatrix.vec3;

export default class Trees {
     constructor() {   
        this.trees = [];
    }

    async build(loader, scene) {
        await loader.load('./blender/tree.gltf');
        let tree = await loader.loadNode(loader.defaultScene);
        tree.translation = vec3.set(vec3.create(), 100, -4, 0);
        tree.scale = vec3.set(vec3.create(), 3, 3, 3);
        this.trees.push(tree);


        this.add(scene);
    }

    add(scene) {
        for (let i=0;i<this.trees.length;i++) {
            scene.addNode(this.trees[i]);
            this.trees[i].updateMatrix();
        
        }
    }

}