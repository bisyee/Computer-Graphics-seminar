import { Node } from './Node.js';

export class Scene {

    constructor(options = {}) {
        this.nodes = [...(options.nodes ?? [])];
    }

    addNode(node) {
        this.nodes.push(node);
    }

    removeNode(node){
        console.log(this.nodes, 'scene')
        this.nodes.splice(this.nodes.indexOf(node), 1);
    }

    traverse(before, after) {
        for (const node of this.nodes) {
            this.traverseNode(node, before, after);
        }
    }

    traverseNode(node, before, after) {
        if (before) {
            before(node);
        }
        for (const child of node.children) {
            this.traverseNode(child, before, after);
        }
        if (after) {
            after(node);
        }
    }
}
