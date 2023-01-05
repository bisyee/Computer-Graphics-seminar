
var width = 0;
export default class Life{
    constructor() {
        this.width = 0;
      }
    subLife(){
        var elem = document.getElementById("lifeBar");
        if (width >= 100) {
            localStorage.setItem('status','lost')
            location.href='./end.html'
        } else {
            width+=10;
            elem.style.width = width + "%";
        }
    }
}