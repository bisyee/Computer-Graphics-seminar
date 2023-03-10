var canvas = document.getElementById("speedometer");
var context = canvas.getContext("2d");

const mainCanvas = document.getElementById('canvas');

export default class Speedometer {

   constructor() {
       canvas.style.display="block";
   }

    draw(speed) {
        let oPointX, oPointY, iPointX, iPointY, wPointX, wPointY, angle, sineAngle, cosAngle, pointX, pointY;
        context.clearRect(0,0,canvas.width, canvas.height);
        var centerX = 180;
        var centerY = 115;
        var radius = 115;

    
        context.beginPath();
        context.arc(centerX, centerY, radius, Math.PI*0.10, Math.PI*-1.1, true);

        var gradience = context.createRadialGradient(centerX, centerY, radius-radius/2, centerX, centerY, radius-radius/8);
        let R = Math.abs(Math.floor(speed*0.3));

        let G = 144;
        let B = 64;
        if (R<20) {
            R+=20;
        }
        if (R>255){
            B++;
            R = 255;
        }
        gradience.addColorStop(0, '#000000');
        gradience.addColorStop(1, '#'+R.toString(16)+G.toString(16)+B.toString(16));

        context.fillStyle = gradience;
        context.fill();
        context.closePath();
        context.restore();

        context.beginPath();
        context.strokeStyle = '#FFFFFF';
        context.translate(centerX,centerY);
        var increment = 40;
        context.font="12px Arial";
          
        
        for (var i=-18; i<=18; i++)
        {
            this.helpdraw(radius, oPointX, oPointY, iPointX, iPointY, wPointX, wPointY, angle, sineAngle, cosAngle, pointX, pointY, i, increment);
        }
        var numOfSegments = speed/increment;
        numOfSegments = numOfSegments -18;
        angle = Math.PI/30*numOfSegments;
        sineAngle = Math.sin(angle);
        cosAngle = -Math.cos(angle);
        pointX = sineAngle *(3/4*radius);
        pointY = cosAngle *(3/4*radius);

        context.beginPath();
        context.strokeStyle = '#FFFFFF';
        context.arc(0, 0, 15, 0, 2*Math.PI, true);
        context.fill();
        context.closePath();

        context.beginPath();    	
        context.lineWidth=6;
        context.moveTo(0,0);
        context.lineTo(pointX,pointY);
        context.stroke();
        context.closePath();
        context.restore();
        context.translate(-centerX,-centerY);
    }
    helpdraw(radius, oPointX, oPointY, iPointX, iPointY, wPointX, wPointY, angle, sineAngle, cosAngle, pointX, pointY,i, increment){
        angle = Math.PI/30*i;
            sineAngle = Math.sin(angle);
            cosAngle = -Math.cos(angle);

            if (i % 5 == 0) {
            context.lineWidth = 2;
            wPointX = sineAngle *(radius -radius/2.5);
            wPointY = cosAngle *(radius -radius/2.5);
            context.fillStyle = '#FFFFFF';
   
            context.fillText((i+18)*increment,wPointX-9,wPointY);
            context.fillText("Air Speed", -25 , -39);
             
            }
            else
            {
            context.lineWidth = 2; 			
            iPointX = sineAngle *(radius -radius/5.5);
            iPointY = cosAngle *(radius -radius/5.5);
            oPointX = sineAngle *(radius -radius/7);
            oPointY = cosAngle *(radius -radius/7);
            }
            context.beginPath();
            context.moveTo(iPointX,iPointY);
            context.lineTo(oPointX,oPointY);
            context.stroke();
            context.closePath();
    }

}