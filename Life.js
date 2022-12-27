export default class Life{
    constructor() {
        this.width = 1;
      }
    subLife(){
        var elem = document.getElementById("lifeBar");
        if (this.width >= 100) {
            console.log('endgame');
        } else {
            this.width+=10;
            elem.style.width = this.width + "%";
        }
    }
}