import {Node} from './Node.js';

export  class Light extends Node {

    static Light_ON = {
        position         : [300, 400, 500],
        ambientColor     : [255, 230, 230],
        diffuseColor     : [204, 204, 204],
        specularColor    : [255, 255, 255],
        shininess        : 10,
        attenuatuion     : [1, 0.0000001, 0.0000000000001],
       
        };


    constructor() {
        super();

        Object.assign(this, Light.Light_ON);
    }


}