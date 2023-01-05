import {Node} from './Node.js';

export  class Light extends Node {

    static Light_ON = {
        position         : [1, 0.48, 5],
        ambientColor     : [255, 255, 255],
        diffuseColor     : [255, 255, 255],
        specularColor    : [250, 250, 250],
        shininess        : 17,
        attenuatuion     : [1.0, 0.04, 0.001],
       
        };


    constructor() {
        super();

        Object.assign(this, Light.Light_ON);
    }
    turnOn() {
        Object.assign(this, Light.Light_ON);

    }
}