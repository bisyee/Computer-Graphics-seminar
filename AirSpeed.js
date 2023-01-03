var canvas = document.getElementById("airspeed");
var ctx = canvas.getContext("2d");

export default class AirSpeed {

   constructor() {
       canvas.style.display="block";
   }

    draw(speed) {
        let px, py, ipx, ipy, wpx, wpy, angle, sineAngle, cosAngle, pointX, pointY;

        var cx = 180;
        var cy = 115;
        var r = 115;

    
        ctx.beginPath();
        ctx.arc(cx, cy, r, Math.PI*0.10, Math.PI*-1.1, true);

        var grad = ctx.createRadialGradient(cx, cy, r-r/2, cx, cy, r-r/8);
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
        grad.addColorStop(0, '#000000');
        grad.addColorStop(1, '#'+R.toString(16)+G.toString(16)+B.toString(16));

        ctx.fillStyle = grad;
        ctx.fill();
        ctx.closePath();
        ctx.restore();

        ctx.beginPath();
        ctx.strokeStyle = '#FFFFFF';
        ctx.translate(cx,cy);
        var increment = 40;
        ctx.font="12px Arial";
          
        
        for (var i=-18; i<=18; i++)
        {
            this.helpdraw(r, px, py, ipx, ipy, wpx, wpy, angle, sineAngle, cosAngle, pointX, pointY, i, increment);
        }
        var numOfSegments = speed/increment;
        numOfSegments = numOfSegments -18;
        angle = Math.PI/30*numOfSegments;
        sineAngle = Math.sin(angle);
        cosAngle = -Math.cos(angle);
        pointX = sineAngle *(3/4*r);
        pointY = cosAngle *(3/4*r);

        ctx.beginPath();
        ctx.strokeStyle = '#FFFFFF';
        ctx.arc(0, 0, 15, 0, 2*Math.PI, true);
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();    	
        ctx.lineWidth=6;
        ctx.moveTo(0,0);
        ctx.lineTo(pointX,pointY);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
        ctx.translate(-cx,-cy);
    }
    helpdraw(r, px, py, ipx, ipy, wpx, wpy, angle, sineAngle, cosAngle, pointX, pointY,i, increment){
        angle = Math.PI/30*i;
            sineAngle = Math.sin(angle);
            cosAngle = -Math.cos(angle);

            if (i % 5 == 0) {
            ctx.lineWidth = 2;
            wpx = sineAngle *(r -r/2.5);
            wpy = cosAngle *(r -r/2.5);
            ctx.fillStyle = '#FFFFFF';
   
            ctx.fillText((i+18)*increment,wpx-9,wpy);
            ctx.fillText("Air Speed", -25 , -39);
             
            }
            else
            {
            ctx.lineWidth = 2; 			
            ipx = sineAngle *(r -r/5.5);
            ipy = cosAngle *(r -r/5.5);
            px = sineAngle *(r -r/7);
            py = cosAngle *(r -r/7);
            }
            ctx.beginPath();
            ctx.moveTo(ipx,ipy);
            ctx.lineTo(px,py);
            ctx.stroke();
            ctx.closePath();
    }

}