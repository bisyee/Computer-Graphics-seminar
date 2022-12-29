export default class Life{
    constructor() {
        this.width = 1;
      }
    subLife(){
        var elem = document.getElementById("lifeBar");
        if (this.width >= 100) {
            localStorage.setItem('status','lost')
            location.href='./end.html'
        } else {
            this.width+=10;
            elem.style.width = this.width + "%";
        }
    }
}