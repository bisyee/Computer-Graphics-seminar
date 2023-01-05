import { Light } from "./Light.js";
export default class Fuel {
    constructor(){
        this.light = new Light();
    }
    subFuel(){
        var elem = document.getElementById("myBar");
        var width = 1;
        var id = setInterval(frame, 1000);
        function frame() {
        if (width >= 100) {
            clearInterval(id);
            localStorage.setItem('status','fuel');
            location.href='./end.html';
            this.light.turnOff();

        } else {
            width++;
            elem.style.width = width + "%";
        }
        }
    }

}