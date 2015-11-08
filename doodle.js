	//  var canvas2 = document.getElementById('Doodle');
	  var ctx = '';
	  
$(document).ready(function() {

	 var canvas2 = document.getElementById('Doodle');
	   ctx = canvas2.getContext('2d');
	  
	  drawText('Happy Diwali!!!','#DFDFDF', '#494966', 90, 370);
	  flashyText();
	  
});

 //this.r = Math.round(Math.random() * 255 | 0);
   // this.g = Math.round(Math.random() * 255 | 0);
    //this.b = Math.round(Math.random() * 255 | 0);
    //this.alpha = 1;


function drawText(text, fill, stroke, x, y) {
  //  ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "40px verdana";
//    ctx.fillStyle = fill;
	ctx.fillStyle = "rgba(" + Math.round(Math.random() * 255 | 0) + ", " + Math.round(Math.random() * 255 | 0) + ", " + Math.round(Math.random() * 255 | 0) + ", " + 1 + ")"

   // ctx.strokeStyle = stroke;
    ctx.lineWidth = 1;
    ctx.fillText(text, x, y);
    ctx.strokeText(text, x, y);
}

function genRandom()
{
	return (Math.floor(Math.random() * 9) + 0);
}
function drawContext()
{
	//drawText('Happy Diwali!!!','#'+genRandom() +genRandom() +genRandom()+genRandom()+genRandom()+genRandom(),'#'+genRandom() +genRandom() +genRandom()+genRandom()+genRandom()+genRandom(), 90, 370)
	
	drawText('Happy Diwali!!!','#'+genRandom() +genRandom() +genRandom()+genRandom()+genRandom()+genRandom(),'#000000', 90, 370)
}
function clearContext()
{
	/* find the <canvas> element having id = "Doodle" */
	  var canvas2 = document.getElementById('Doodle');
	  /* Then, call its getContext() method which is an object with many properties and methods for drawing paths, shapes */
      var context2 = canvas2.getContext('2d');
     context2.clearRect(0, 0, canvas2.width, canvas2.height)
	  
}



function flashyText() {
    var count = 100,
        timer = setInterval(function() {
            count--;
            if( count%2 == 1) {
                drawContext();
//ctx.fillStyle = '#'+genRandom() +genRandom() +genRandom()+genRandom()+genRandom()+genRandom();
  
  }
            else {
  drawText('Happy Diwali!!!','#000000', '#000000', 90, 370)

	//		clearContext();
            }
            if( count == 0) clearInterval(timer);
        },1000);
}

      
	      