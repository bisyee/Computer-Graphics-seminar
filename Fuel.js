export default class Fuel {

    subFuel(){
        var elem = document.getElementById("myBar");
        var width = 1;
        var id = setInterval(frame, 1000);
        function frame() {
        if (width >= 100) {
            clearInterval(id);
            localStorage.setItem('status','lost')
            location.href='./end.html'
        } else {
            width++;
            elem.style.width = width + "%";
        }
        }
    }

}