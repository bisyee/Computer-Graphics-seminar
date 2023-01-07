export default class Turbo{
    constructor() {
        this.width = 1;

      }
    subNitro(){
        var elem = document.getElementById("turboBar");
        var width = 1;
        var id = setInterval(frame, 100);
        function frame() {
        if (width >= 100) {
            clearInterval(id);
        } else {
            width++;
            elem.style.width = width + "%";
        }
        }
        // document.getElementById("nitrobutton").style.backgroundColor =  '#9E1A1A';
        // document.getElementById("nitrobutton").style.textShadow=  '#9E1A1A';
        // document.getElementById("nitrobutton").style.boxShadow=  '#9E1A1A';
    }
}