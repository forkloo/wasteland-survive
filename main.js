
var c = document.getElementById('kanwa').getContext('2d');
var height = 720;
c.canvas.height = height;
var width = 1000;
c.canvas.width = width;
	
var scaledSize = 64; //wielkość tekstur x i y
var scrollZone = 60;

var cursorX, cursorY, overlayMouseX, overlayMouseY;
let objectSizeX = 1; let objectSizeY = 1;

var cursor = true;
var scrolling = false;
var pause = false; let start = true;

let kitchAmount=0; let armAmount=0; let workAmount=0; let wellAmount=0; let genAmount=0; let bedAmount=0; let bathAmount=0; let dinAmount=0;
let pop=0;

const Camera = function(x, y, w, h)
{
	this.x = x; this.y = y;
	this.w = w; this.h = h;
	this.velocity = 6;
}

var world1 = {
	tsize: 128,
	cols: 60,
	rows: 60,
	wtile: 0,
	
	grass : [
		   [ 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 0, 0, 0, 0, 0, 1, 1, 1, 7, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 4, 1, 0, 0, 0, 1, 1, 4, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 0, 2, 1, 2, 0, 1, 4, 3, 1, 0, 1, 1, 1, 1, 1 ,0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 0, 4, 3, 6, 3, 5, 1, 2, 6, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 0, 0, 0, 0, 0, 1, 1, 1, 7, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 4, 1, 0, 0, 0, 1, 1, 4, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 0, 2, 1, 2, 0, 1, 4, 3, 1, 0, 1, 1, 1, 1, 1 ,0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 0, 4, 3, 6, 3, 5, 1, 2, 6, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 0, 0, 0, 0, 0, 1, 1, 1, 7, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 4, 1, 0, 0, 0, 1, 1, 4, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 0, 2, 1, 2, 0, 1, 4, 3, 1, 0, 1, 1, 1, 1, 1 ,0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 0, 4, 3, 6, 3, 5, 1, 2, 6, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 0, 0, 0, 0, 0, 1, 1, 1, 7, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 4, 1, 0, 0, 0, 1, 1, 4, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 0, 2, 1, 2, 0, 1, 4, 3, 1, 0, 1, 1, 1, 1, 1 ,0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 0, 4, 3, 6, 3, 5, 1, 2, 6, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 0, 0, 0, 0, 0, 1, 1, 1, 7, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 4, 1, 0, 0, 0, 1, 1, 4, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 0, 2, 1, 2, 0, 1, 4, 3, 1, 0, 1, 1, 1, 1, 1 ,0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 0, 4, 3, 6, 3, 5, 1, 2, 6, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 0, 0, 0, 0, 0, 1, 1, 1, 7, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 4, 1, 0, 0, 0, 1, 1, 4, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 0, 2, 1, 2, 0, 1, 4, 3, 1, 0, 1, 1, 1, 1, 1 ,0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 0, 4, 3, 6, 3, 5, 1, 2, 6, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 0, 0, 0, 0, 0, 1, 1, 1, 7, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 4, 1, 0, 0, 0, 1, 1, 4, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 0, 2, 1, 2, 0, 1, 4, 3, 1, 0, 1, 1, 1, 1, 1 ,0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 0, 4, 3, 6, 3, 5, 1, 2, 6, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 0, 0, 0, 0, 0, 1, 1, 1, 7, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 4, 1, 0, 0, 0, 1, 1, 4, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 0, 2, 1, 2, 0, 1, 4, 3, 1, 0, 1, 1, 1, 1, 1 ,0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 0, 4, 3, 6, 3, 5, 1, 2, 6, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 0, 0, 0, 0, 0, 1, 1, 1, 7, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 4, 1, 0, 0, 0, 1, 1, 4, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 0, 2, 1, 2, 0, 1, 4, 3, 1, 0, 1, 1, 1, 1, 1 ,0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 0, 4, 3, 6, 3, 5, 1, 2, 6, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 0, 0, 0, 0, 0, 1, 1, 1, 7, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 4, 1, 0, 0, 0, 1, 1, 4, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 0, 2, 1, 2, 0, 1, 4, 3, 1, 0, 1, 1, 1, 1, 1 ,0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 0, 4, 3, 6, 3, 5, 1, 2, 6, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 0, 0, 0, 0, 0, 1, 1, 1, 7, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 4, 1, 0, 0, 0, 1, 1, 4, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 0, 2, 1, 2, 0, 1, 4, 3, 1, 0, 1, 1, 1, 1, 1 ,0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 0, 4, 3, 6, 3, 5, 1, 2, 6, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 0, 0, 0, 0, 0, 1, 1, 1, 7, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 4, 1, 0, 0, 0, 1, 1, 4, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 0, 2, 1, 2, 0, 1, 4, 3, 1, 0, 1, 1, 1, 1, 1 ,0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
			 0, 0, 4, 3, 6, 3, 5, 1, 2, 6, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 4, 0, 3, 0, 0, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
		]
	,
	[]],

	resources: [ 
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 1, 1, , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
	
	],

	build: [ 
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
		, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
	
	],
	}
var worldTile = 0;

var camera = new Camera(0, 0, width, height);

var grassTx = new Image();
var treeTx = new Image();


function drawLand(worldTile)
{
	worldTile = world1.wtile;
	grassTx.src = "img/terrain/gtilemap.png";
	
	var minX = Math.floor((camera.x / scaledSize));
	var maxX = Math.ceil(((camera.x + camera.w) / scaledSize));
	var minY = Math.floor((camera.y / scaledSize));
	var maxY = Math.ceil(((camera.y + camera.h) / scaledSize));
	
	if(minX < 0)
	{
		minX = 0;
	}
	if(minY < 0)
	{
		minY = 0;
	}
	if(maxX > world1.cols)
	{
		maxX = world1.cols;
	}
	if(maxY > world1.rows)
	{
		maxY = world1.rows;
	}
	
	for (var mapX = minX; mapX < maxX; mapX++)
	{
		for(var mapY = minY; mapY < maxY; mapY++)
		{
			var grassValue = (world1.grass[world1.wtile][ mapY*world1.cols + mapX ]);
			var grassX = mapX * scaledSize - camera.x;
			var grassY = mapY * scaledSize - camera.y;
			
			c.drawImage(grassTx, grassValue * world1.tsize, 0, world1.tsize, world1.tsize, grassX, grassY, scaledSize, scaledSize);
		}
	}
}

function drawBuildings(worldTile)
{
	worldTile = world1.wtile;
	//buildsTx.src = "img/terrain/btilemap.png";
	
	var minX = Math.floor((camera.x / scaledSize));
	var maxX = Math.ceil(((camera.x + camera.w) / scaledSize));
	var minY = Math.floor((camera.y / scaledSize));
	var maxY = Math.ceil(((camera.y + camera.h) / scaledSize));
	
	if(minX < 0)
	{
		minX = 0;
	}
	if(minY < 0)
	{
		minY = 0;
	}
	if(maxX > world1.cols)
	{
		maxX = world1.cols;
	}
	if(maxY > world1.rows)
	{
		maxY = world1.rows;
	}
	
	for (var mapX = minX; mapX < maxX; mapX++)
	{
		for(var mapY = minY; mapY < maxY; mapY++)
		{
			var buildValue = world1.build[mapY*world1.cols + mapX ];
			var buildX = mapX * scaledSize - camera.x;
			var buildY = mapY * scaledSize - camera.y;

			if(buildValue == 2){
				c.fillStyle = "red";
				c.fillRect(buildX, buildY, scaledSize, scaledSize);
			}
			if(buildValue == 3){
				c.fillStyle = "darkgreen";
				c.fillRect(buildX, buildY, scaledSize, scaledSize);
			}
			if(buildValue == 4){
				c.fillStyle = "grey";
				c.fillRect(buildX, buildY, scaledSize, scaledSize);
			}
			if(buildValue == 5){
				c.fillStyle = "blue";
				c.fillRect(buildX, buildY, scaledSize, scaledSize);
			}
			if(buildValue == 6){
				c.fillStyle = "lightblue";
				c.fillRect(buildX, buildY, scaledSize, scaledSize);
			}
			if(buildValue == 7){
				c.fillStyle = "darkblue";
				c.fillRect(buildX, buildY, scaledSize, scaledSize);
			}
			if(buildValue == 8){
				c.fillStyle = "white";
				c.fillRect(buildX, buildY, scaledSize, scaledSize);
			}
			if(buildValue == 9){
				c.fillStyle = "green";
				c.fillRect(buildX, buildY, scaledSize, scaledSize);
			}
			if(buildValue == 10){
				c.fillStyle = "pink";
				c.fillRect(buildX, buildY, scaledSize, scaledSize);
			}
			
			//c.drawImage(grassTx, buildValue * world1.tsize, 0, world1.tsize, world1.tsize, buildX, buildY, scaledSize, scaledSize);
		}
	}
}

let mode = "gm";

let expl = 0;
let createNpc = {
	explorer : function(){
		expl += 1;
		return;
	}
}

scrolling
function getMouse(e) 
{
	middleX = width/2;
	middleY = height/2;

	cursorX = e.clientX - c.canvas.offsetLeft + camera.x;
	cursorY = e.clientY - c.canvas.offsetTop + camera.y;

	overlayMouseX = e.clientX - c.canvas.offsetLeft;
	overlayMouseY = e.clientY - c.canvas.offsetTop;
}

let editTile; let cEditTile; let buildInfo = document.getElementById("build"); let items = document.getElementById("itemContainer");
function editor(e)
{
	editX = (tileX * scaledSize) - camera.x;
	editY = (tileY * scaledSize) - camera.y;
	c.strokeStyle = "red";
	c.rect(editX, editY, scaledSize*objectSizeX, scaledSize*objectSizeY);
	c.stroke()

	editTile = (tileY * world1.cols + tileX);
	cEditTile = world1.build[editTile];
	c.canvas.addEventListener("mousedown", function(){
	if(mode == "gm"){
		console.log(cEditTile)
		if(cEditTile == 2){
			pause = true;

			let explorer = document.createElement("button");
			let explorerOut = document.createElement("button");

			let farmer = document.createElement("button");
			let farmerOut = document.createElement("button");

			explorer.innerHTML = "Poszukiwacz";
			explorerOut.innerHTML = "Odwołaj jednego";

			farmer.innerHTML = "Farmer";
			farmerOut.innerHTML = "Odwołaj jednego";

			explorer.onclick = createNpc.explorer;
			
			buildInfo.innerHTML = "Baza<hr></hr>Rekrutuj: <br><br>";

			buildInfo.appendChild(explorer);
			buildInfo.appendChild(explorerOut);
			buildInfo.appendChild(farmer);
			buildInfo.appendChild(farmerOut);
		}
		else{
			pause = false;
			buildInfo.innerHTML = "";
		}
	}
	}, false);
}

//let univBuildCheckX = (!isNaN(world.build[editTile-1]) || !isNaN(world.build[editTile+objectSizeX]) || !isNaN(world.build[(editTile+world1.cols)-1]) || !isNaN(world.build[(editTile+world1.cols)+objectSizeX]))

let objects = {
	base: function(){
		console.log("base")
		objectSizeX = 6; objectSizeY = 4;
		let ix = 0; let iy = 0;
		function draw(){
			while(iy < objectSizeY){
				while(ix<objectSizeX){ world1.build[editTile+(world1.cols*iy)+ix] = 2; ix++};
				ix = 0; iy++; 
			}
			iy = 0;
			start = false;
			pop = 10;
			c.canvas.removeEventListener("mousedown", draw,false)
			return;
		}
		c.canvas.addEventListener("mousedown", draw, false);
		return;
	},
	kitchen: function(){
		if(mode == "gm") {return;}
		console.log("kitchen")
		
		objectSizeX = 4; objectSizeY = 3;
		let ix = 0; let iy = 0;
		function draw(){
			while(iy < objectSizeY){
				while(ix<objectSizeX){ world1.build[editTile+(world1.cols*iy)+ix] = 3; ix++};
				ix = 0; iy++; 
			}
			iy = 0;
			
			kitchAmount++;
			c.canvas.removeEventListener("mousedown", draw,false)
			return;
		}
		c.canvas.addEventListener("mousedown", draw, false);
		
		return;
	},
	armory: function(){
		if(mode == "gm") {return;}
		console.log("armory")
		
		objectSizeX = 3; objectSizeY = 3;
		let ix = 0; let iy = 0;
		function draw(){
			while(iy < objectSizeY){
				while(ix<objectSizeX){ world1.build[editTile+(world1.cols*iy)+ix] = 4; ix++};
				ix = 0; iy++; 
			}
			iy = 0;
			
			armAmount++;
			c.canvas.removeEventListener("mousedown", draw,false)
			return;
		}
		c.canvas.addEventListener("mousedown", draw, false);
		
		return;
	},
	workshop: function(){
		if(mode == "gm") {return;}
		console.log("workshop")
		
		objectSizeX = 3; objectSizeY = 4;
		let ix = 0; let iy = 0;
		function draw(){
			while(iy < objectSizeY){
				while(ix<objectSizeX){ world1.build[editTile+(world1.cols*iy)+ix] = 5; ix++};
				ix = 0; iy++; 
			}
			iy = 0;
			
			workAmount++;
			c.canvas.removeEventListener("mousedown", draw,false)
			return;
		}
		c.canvas.addEventListener("mousedown", draw, false);
		
		return;
	},
	well: function(){
		if(mode == "gm") {return;}
		console.log("well")
		
		objectSizeX = 2; objectSizeY = 2;
		let ix = 0; let iy = 0;
		function draw(){
			while(iy < objectSizeY){
				while(ix<objectSizeX){ world1.build[editTile+(world1.cols*iy)+ix] = 6; ix++};
				ix = 0; iy++; 
			}
			iy = 0;
			
			wellAmount++;
			c.canvas.removeEventListener("mousedown", draw,false)
			return;
		}
		c.canvas.addEventListener("mousedown", draw, false);
		
		return;
	},
	generator: function(){
		if(mode == "gm") {return;}
		console.log("generator")
		
		objectSizeX = 1; objectSizeY = 1;
		let ix = 0; let iy = 0;
		function draw(){
			while(iy < objectSizeY){
				while(ix<objectSizeX){ world1.build[editTile+(world1.cols*iy)+ix] = 7; ix++};
				ix = 0; iy++; 
			}
			iy = 0;
			
			genAmount++;
			c.canvas.removeEventListener("mousedown", draw,false)
			return;
		}
		c.canvas.addEventListener("mousedown", draw, false);
		
		return;
	},
	bedrooms: function(){
		if(mode == "gm") {return;}
		console.log("bedrooms")
		
		objectSizeX = 5; objectSizeY = 4;
		let ix = 0; let iy = 0;
		function draw(){
			while(iy < objectSizeY){
				while(ix<objectSizeX){ world1.build[editTile+(world1.cols*iy)+ix] = 8; ix++};
				ix = 0; iy++; 
			}
			iy = 0;
			
			bedAmount++;
			c.canvas.removeEventListener("mousedown", draw,false)
			return;
		}
		c.canvas.addEventListener("mousedown", draw, false);
		
		return;
	},
	baths: function(){
		if(mode == "gm") {return;}
		console.log("baths")
		
		objectSizeX = 6; objectSizeY = 3;
		let ix = 0; let iy = 0;
		function draw(){
			while(iy < objectSizeY){
				while(ix<objectSizeX){ world1.build[editTile+(world1.cols*iy)+ix] = 9; ix++};
				ix = 0; iy++; 
			}
			iy = 0;
			
			bathAmount++;
			c.canvas.removeEventListener("mousedown", draw,false)
			return;
		}
		c.canvas.addEventListener("mousedown", draw, false);
		
		return;
	},
	diningRoom: function(){
		if(mode == "gm") {return;}
		console.log("diningRoom")
		
		objectSizeX = 6; objectSizeY = 4;
		let ix = 0; let iy = 0;
		function draw(){
			while(iy < objectSizeY){
				while(ix<objectSizeX){ 
					
					if(world1.build[editTile+(world1.cols*(objectSizeY-1)+(objectSizeX - 1))]){
						return;
					}
					else{
						world1.build[editTile+(world1.cols*iy)+ix] = 10; 
						ix++
					}
				}
				ix = 0;iy++; 
			}
			
			iy = 0;
			
			dinAmount++;
			c.canvas.removeEventListener("mousedown", draw,false)
			return;
		}
		c.canvas.addEventListener("mousedown", draw, false);
		
		return;
	},
}

function editMode()
{
	if(mode == "edit"){
		pause = true;
	let kuch = document.createElement("button");
	let warsz = document.createElement("button");

	let stud = document.createElement("button");
	let gen = document.createElement("button");
	
	let syp = document.createElement("button");
	let lazn = document.createElement("button");
	let jad = document.createElement("button");

	kuch.innerHTML = "Kuchnia"
	warsz.innerHTML = "Warsztat"

	stud.innerHTML = "Studnia"
	gen.innerHTML = "Generator"

	syp.innerHTML = "Sypialnia"
	lazn.innerHTML = "Łaźnie"
	jad.innerHTML = "Jadalnia"

	kuch.onclick = objects.kitchen
	warsz.onclick = objects.workshop

	stud.onclick = objects.well
	gen.onclick = objects.generator

	syp.onclick = objects.bedrooms
	lazn.onclick = objects.baths
	jad.onclick = objects.diningRoom

	items.appendChild(kuch);
	items.appendChild(warsz)

	items.appendChild(stud)
	items.appendChild(gen)

	items.appendChild(syp)
	items.appendChild(lazn)
	items.appendChild(jad)
}
if(mode == "gm")
{
	pause = false;
	objectSizeX = 1; objectSizeY = 1;
	items.innerHTML = ""
}
}

function getKeyDown(e)
{
   if (e.keyCode == 32 && e.target == document.body) {
	   e.preventDefault();
	 }
   if(e.keyCode == 32 && mode == "edit"){
	   mode = "gm";
	   editMode()
   }
   else if(e.keyCode == 32 && mode == "gm"){
	   mode = "edit";
	   editMode()
   }
}
//PĘTLA GRY
var offSetX, offSetY, tileX, tileY;

function loop()
{
	c.canvas.addEventListener("contextmenu", function(e){e.preventDefault();}, false);
	c = document.getElementById('kanwa').getContext("2d");
	
	c.clearRect(0, 0, c.width, c.height); //czyszczenie ekranu <===
	
	c.imageSmoothingEnabled = false;
	
	var height = 720;
	c.canvas.height = height;
	var width = 1000;
	c.canvas.width = width;

	tileX = Math.floor(cursorX / scaledSize)
	tileY = Math.floor(cursorY / scaledSize)
	drawLand(world1.wtile)
	drawBuildings(world1.wtile)
	


	if(!pause && !start)
	{
		drawLand(world1.wtile)
		drawBuildings(world1.wtile)
		objectSizeX = 1; objectSizeY = 1;
		editor();

		document.addEventListener('keydown', getKeyDown, false);

		window.addEventListener("mousemove", getMouse, false);
	
		if(overlayMouseX > (width - 100))
			{
			camera.x += camera.velocity;
			}
		if(overlayMouseY < 100 && camera.y > 0)
			{
			camera.y -= camera.velocity;
			}
		if(overlayMouseY > (height - 100))
			{
			camera.y += camera.velocity;
			}
		if(overlayMouseX < 100 && camera.x > 0)
			{
			camera.x -= camera.velocity;
			}

		
		
		
		// if(right){
		// 	camera.x += 5;
		// }
		// if(left){
		// 	camera.x -= 5;
		// }
		// if(up){
		// 	camera.y -= 5;
		// }
		// if(down){
		// 	camera.y += 5;
		// }

	}
	if(pause)
	{
		//document.addEventListener('keydown', getKeyDown, false);
		//document.addEventListener('keyup', getKeyUp, false);
		window.addEventListener("mousemove", getMouse, false);
		drawLand(world1.wtile)
		drawBuildings(world1.wtile)
		editor()
	}
	if(start){
		//document.addEventListener('keydown', getKeyDown, false);
		//document.addEventListener('keyup', getKeyUp, false);
		window.addEventListener("mousemove", getMouse, false);
		drawLand(world1.wtile)
		drawBuildings(world1.wtile)
		editor();
		objects.base();

		window.addEventListener("mousemove", getMouse, false);
		scrolling = false;
		if(overlayMouseX > (width - 100) && camera.x < 280)
		{
			camera.x += camera.velocity;
			scrolling = true;
		}
		if(overlayMouseY < 100 && camera.y > 0)
		{
			camera.y -= camera.velocity;
			scrolling = true;
		}
		if(overlayMouseY > (height - 100) && camera.y < 555)
		{
			camera.y += camera.velocity;
			scrolling = true;
		}
		if(overlayMouseX < 100 && camera.x > 0)
		{
			camera.x -= camera.velocity;
			scrolling = true;
		}
	}

}
let gameInfo= document.getElementById("gameInfo")
function init(){

	gameInfo.innerHTML = "Populacja: "+"*"+"/"+pop+"   |   "+"Tryb: "+mode+"<hr></hr>Statystyki profesji: <br>"+"Poszukiwacze: "+expl+"<br>"+"Farmerzy";
	loop()
	window.requestAnimationFrame(init);
}

window.addEventListener("load", init);
