import  {Light}  from "./Light.js";

export default class Life{
    constructor() {
        this.width = 1;
        this.light = new Light();
      }
    subLife(){
        var elem = document.getElementById("lifeBar");
        this.light.turnOff();
        if (this.width >= 100) {
            localStorage.setItem('status','lost')
            location.href='./end.html'
           
        } else {
            this.width+=10;
            elem.style.width = this.width + "%";
        }
    }
}