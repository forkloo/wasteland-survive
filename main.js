
var c = document.getElementById('kanwa').getContext('2d');
var height = 720;
c.canvas.height = height;
var width = 1000;
c.canvas.width = width;
	
var scaledSize = 64; //wielkość tekstur x i y
var scrollZone = 60;

var cursorX, cursorY, overlayMouseX, overlayMouseY;

var cursor = true;
var scrolling = false;
var pause = false; let start = true;

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

	middleLayer: [ 
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


let objectSizeX = 1; let objectSizeY = 1;



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

let up = false; let down = false; let right = false; let left = false;

function getKeyDown(e)
{
	if(e.keyCode == 87){
		up = true;
		down = false;
		right = false;
		left = false;
	}
	else if(e.keyCode == 83){
		down = true;
		up = false;
		right = false;
		left = false;
	}
	else if(e.keyCode == 65){
		left = true;
		up = false;
		down = false;
		right = false;
	}
	else if(e.keyCode == 68){
		right = true;
		up = false;
		down = false;
		left = false;
	}
}

function getKeyUp(e)
{
	up = false;
	down = false;
	right = false;
	left = false;

}

var enemyFPS = 0;
function enemySpawner(){

}

function getMouse(e) 
{
	middleX = width/2;
	middleY = height/2;

	cursorX = e.clientX - c.canvas.offsetLeft + camera.x;
	cursorY = e.clientY - c.canvas.offsetTop + camera.y;

	overlayMouseX = e.clientX - c.canvas.offsetLeft;
	overlayMouseY = e.clientY - c.canvas.offsetTop;
}

let editTile;
function editor(e)
{
	editX = (tileX * scaledSize) - camera.x;
	editY = (tileY * scaledSize) - camera.y;
	c.strokeStyle = "red";
	c.rect(editX, editY, scaledSize*objectSizeX, scaledSize*objectSizeY);
	c.stroke()

	editTile = (tileY * world1.cols + tileX);
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
			c.canvas.removeEventListener("mousedown", draw,false)
			return;
		}
		c.canvas.addEventListener("mousedown", draw, false);
		return;
	},
	kitchen: function(){
		console.log("kitchen")
		pause = true;
		objectSizeX = 4; objectSizeY = 3;
		let ix = 0; let iy = 0;
		function draw(){
			while(iy < objectSizeY){
				while(ix<objectSizeX){ world1.build[editTile+(world1.cols*iy)+ix] = 3; ix++};
				ix = 0; iy++; 
			}
			iy = 0;
			pause = false;
			c.canvas.removeEventListener("mousedown", draw,false)
			return;
		}
		c.canvas.addEventListener("mousedown", draw, false);
		
		return;
	},
	armory: function(){
		console.log("armory")
		pause = true;
		objectSizeX = 3; objectSizeY = 3;
		let ix = 0; let iy = 0;
		function draw(){
			while(iy < objectSizeY){
				while(ix<objectSizeX){ world1.build[editTile+(world1.cols*iy)+ix] = 4; ix++};
				ix = 0; iy++; 
			}
			iy = 0;
			pause = false;
			c.canvas.removeEventListener("mousedown", draw,false)
			return;
		}
		c.canvas.addEventListener("mousedown", draw, false);
		
		return;
	},
	workshop: function(){
		console.log("workshop")
		pause = true;
		objectSizeX = 3; objectSizeY = 4;
		let ix = 0; let iy = 0;
		function draw(){
			while(iy < objectSizeY){
				while(ix<objectSizeX){ world1.build[editTile+(world1.cols*iy)+ix] = 5; ix++};
				ix = 0; iy++; 
			}
			iy = 0;
			pause = false;
			c.canvas.removeEventListener("mousedown", draw,false)
			return;
		}
		c.canvas.addEventListener("mousedown", draw, false);
		
		return;
	},
	well: function(){
		console.log("well")
		pause = true;
		objectSizeX = 2; objectSizeY = 2;
		let ix = 0; let iy = 0;
		function draw(){
			while(iy < objectSizeY){
				while(ix<objectSizeX){ world1.build[editTile+(world1.cols*iy)+ix] = 6; ix++};
				ix = 0; iy++; 
			}
			iy = 0;
			pause = false;
			c.canvas.removeEventListener("mousedown", draw,false)
			return;
		}
		c.canvas.addEventListener("mousedown", draw, false);
		
		return;
	},
	generator: function(){
		console.log("generator")
		pause = true;
		objectSizeX = 1; objectSizeY = 1;
		let ix = 0; let iy = 0;
		function draw(){
			while(iy < objectSizeY){
				while(ix<objectSizeX){ world1.build[editTile+(world1.cols*iy)+ix] = 7; ix++};
				ix = 0; iy++; 
			}
			iy = 0;
			pause = false;
			c.canvas.removeEventListener("mousedown", draw,false)
			return;
		}
		c.canvas.addEventListener("mousedown", draw, false);
		
		return;
	},
	bedrooms: function(){
		console.log("bedrooms")
		pause = true;
		objectSizeX = 5; objectSizeY = 4;
		let ix = 0; let iy = 0;
		function draw(){
			while(iy < objectSizeY){
				while(ix<objectSizeX){ world1.build[editTile+(world1.cols*iy)+ix] = 8; ix++};
				ix = 0; iy++; 
			}
			iy = 0;
			pause = false;
			c.canvas.removeEventListener("mousedown", draw,false)
			return;
		}
		c.canvas.addEventListener("mousedown", draw, false);
		
		return;
	},
	baths: function(){
		console.log("baths")
		pause = true;
		objectSizeX = 6; objectSizeY = 3;
		let ix = 0; let iy = 0;
		function draw(){
			while(iy < objectSizeY){
				while(ix<objectSizeX){ world1.build[editTile+(world1.cols*iy)+ix] = 9; ix++};
				ix = 0; iy++; 
			}
			iy = 0;
			pause = false;
			c.canvas.removeEventListener("mousedown", draw,false)
			return;
		}
		c.canvas.addEventListener("mousedown", draw, false);
		
		return;
	},
	diningRoom: function(){
		console.log("diningRoom")
		pause = true;
		objectSizeX = 6; objectSizeY = 4;
		let ix = 0; let iy = 0;
		function draw(){
			while(iy < objectSizeY){
				while(ix<objectSizeX){ world1.build[editTile+(world1.cols*iy)+ix] = 10; ix++};
				ix = 0; iy++; 
			}
			iy = 0;
			pause = false;
			c.canvas.removeEventListener("mousedown", draw,false)
			return;
		}
		c.canvas.addEventListener("mousedown", draw, false);
		
		return;
	},
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
		document.addEventListener('keyup', getKeyUp, false);
		window.addEventListener("mousemove", getMouse, false);
		scrolling = false;

		if(right){
			camera.x += 5;
		}
		if(left){
			camera.x -= 5;
		}
		if(up){
			camera.y -= 5;
		}
		if(down){
			camera.y += 5;
		}

		// if(overlayMouseX > (width - 100))
		// {
		// 	camera.x += camera.velocity;
		// 	scrolling = true;
		// }
		// if(overlayMouseY < 100 && camera.y > 0)
		// {
		// 	camera.y -= camera.velocity;
		// 	scrolling = true;
		// }
		// if(overlayMouseY > (height - 100))
		// {
		// 	camera.y += camera.velocity;
		// 	scrolling = true;
		// }
		// if(overlayMouseX < 100 && camera.x > 0)
		// {
		// 	camera.x -= camera.velocity;
		// 	scrolling = true;
		// }

		
	}
	if(pause)
	{
		document.addEventListener('keydown', getKeyDown, false);
		document.addEventListener('keyup', getKeyUp, false);
		window.addEventListener("mousemove", getMouse, false);
		drawLand(world1.wtile)
		drawBuildings(world1.wtile)
		editor()
	}
	if(start){
		document.addEventListener('keydown', getKeyDown, false);
		document.addEventListener('keyup', getKeyUp, false);
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

window.requestAnimationFrame(loop);
}


window.addEventListener("load", function(){ window.setTimeout(loop, 500);});
