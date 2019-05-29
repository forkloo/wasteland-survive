
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
var pause = false; let start = true; let mode = "gm";
let wTimeSpeed = 2;

let kitchAmount=0; let armAmount=0; let workAmount=0; let wellAmount=0; let genAmount=0; let bedAmount=0; let bathAmount=0; let dinAmount=0; let farmAmount = 0;
let nExpl = 0; let nFarm = 0; let nColl = 0;
let fFood = 1*(farmAmount*nFarm); let fDish = 0;
let maxPop = 0; let currPop = 0;
let account = 100;

const Camera = function(x, y, w, h)
{
	this.x = x; this.y = y;
	this.w = w; this.h = h;
	this.velocity = 6;
}

var world1 = {
	tsize: 128,
	cols: 35,
	rows: 35,
	wtile: 0,
	
	grass : [
		   [  
			5,1,1,1,1,1,0, , ,7,7,7, , , , , , , ,2,2,2,2,2, , , , , , , ,2,2,2,2,
			0,5,1,1,1,1,0, , ,0,7,7, , , , , , , , ,2,2,2,2, , , , , , , , ,2,2,2,
			0,0,5,5,1,1,0, ,0,0,0,7, , , , , , , , , ,2,2,2,2, , , , , , , , ,2,2,
			0,0,0,0,5,5,0,0,4,0, , , , ,5, , , , , , , , ,2,2,2, , , , , , , , , ,
			0,0, ,4,0, , , ,0,0, , , , ,6, , , , , , , , , , , , , , , , , , , , ,
			0, ,0, ,3,3, , , , , ,0, , , , , , , , , , , , , , , , , , , , , , , ,
			3,3,0,0,3,3, , , ,0, ,4,0, , , , , , , , , , , , , , , , , , , , , , ,
			3,3,3,0,3,3,3, , , , ,0,0, , , ,6, , , , , , , , , , , , , , , , , , ,
			3,3,3,3,3,3, , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
			, , , ,0, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
			, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
			, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
			, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
			, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
			, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
			, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
			, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
			, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
			, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
			, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
			, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
			, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
			, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
			, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
			, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
			, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
			, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
			, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
			, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
			, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
			, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
			, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
			, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
			, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
			, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
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

let wTime = 0; let min = "00"; let hours = 6; 

let time ={
	
	wClock: function(){
		
		wTime+=wTimeSpeed;
	if(start){
		min = 0;
	}
	if(min > 59){
		wTime = 0;
		hours++;
	}
	if(min < 10){
		min = "0"+Math.round(wTime/100);
	}
	
	else{
		min = Math.round(wTime/100);
	}
	}
	

	
}

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
			if(grassValue == undefined){
				c.fillStyle = "#fff176";
				c.fillRect(grassX, grassY, scaledSize, scaledSize);
			}
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



let createNpc = {
	explorer : function(){
		if(currPop > 0){
			nExpl += 1;
			currPop -= 1;
			return;
		}
		
	},
	explorerOut : function(){
		if(nExpl > 0){
			nExpl -= 1;
			currPop += 1;
			return;
		}
	},
	farmer : function(){
		if(currPop > 0){
		nFarm += 1;
		currPop -= 1;
		return;
		}
		
	},
	farmerOut : function(){
		if(nFarm > 0){
			nFarm -= 1;
			currPop += 1;
			return;
		}
		
	},
	collector : function(){
		if(currPop > 0)
		{
		nColl += 1;
		currPop -= 1;
		return;
		}
	},
	collectorOut : function(){
		if(nColl > 0){
			nColl -= 1;
			currPop += 1;
			return;
		}
		
	},
}

let cCommands = {
	cactus: function(){

	},
	water: function(){

	},
	food: function(){

	},
	blueprints: function(){

	}


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
		if(cEditTile == 2){
			
			pause = true;
			function manage(){
				let explorer = document.createElement("button");
				let collector = document.createElement("button");
				let mainB = document.createElement("button");
	
				explorer.innerHTML = "Wyślij Wędrowca<br>(Powróci rano)";
				collector.innerHTML = "Wydaj zadanie Zbieraczowi<br>(Powróci rano)";
				mainB.innerHTML = "Powrót<br>do<br>Rekrutacji"
	
				//explorer.onclick = manageNpc.explorer;
				collector.onclick = collectorMenu;
				mainB.onclick = main;
				
				buildInfo.innerHTML = "Baza<hr></hr>Zarządzaj: <br><br>";
	
				buildInfo.appendChild(explorer);
				buildInfo.appendChild(collector);
				buildInfo.appendChild(mainB);
				}
			function main(){
				let explorer = document.createElement("button");
				let explorerOut = document.createElement("button");
	
				let farmer = document.createElement("button");
				let farmerOut = document.createElement("button");
	
				let collector = document.createElement("button");
				let collectorOut = document.createElement("button");
				
				let manageB = document.createElement("button");

				explorer.innerHTML = "Poszukiwacz";
				explorerOut.innerHTML = "Odwołaj jednego";
	
				farmer.innerHTML = "Farmer";
				farmerOut.innerHTML = "Odwołaj jednego";
	
				collector.innerHTML = "Zbieracz";
				collectorOut.innerHTML = "Odwołaj jednego";
	
				manageB.innerHTML = "Zarządzaj";

				explorer.onclick = createNpc.explorer;
				farmer.onclick = createNpc.farmer;
				collector.onclick = createNpc.collector;
	
				explorerOut.onclick = createNpc.explorerOut;
				farmerOut.onclick = createNpc.farmerOut;
				collectorOut.onclick = createNpc.collectorOut;

				manageB.onclick = manage;
				
				buildInfo.innerHTML = "Baza<hr></hr>Rekrutuj: <br><br>";
	
				buildInfo.appendChild(explorer);
				buildInfo.appendChild(explorerOut);
				buildInfo.appendChild(farmer);
				buildInfo.appendChild(farmerOut);
				buildInfo.appendChild(collector);
				buildInfo.appendChild(collectorOut);
				buildInfo.appendChild(manageB);
				}
			
			function collectorMenu(){
				let cactusB = document.createElement("button");
				let waterB = document.createElement("button");
				let foodB = document.createElement("button");
				let blueprintsB = document.createElement("button");
				let cancel = document.createElement("button");
				
				cactusB.innerHTML = "Szukaj<br>kaktusów";
				waterB.innerHTML = "Szukaj<br>wody";
				foodB.innerHTML = "Szukaj<br>pożywienia";
				blueprintsB.innerHTML = "Szukaj<br>planów";
				cancel.innerHTML = "Anuluj";

				cactusB.onclick = cCommands.cactus;
				waterB.onclick = cCommands.water;
				foodB.onclick = cCommands.food;
				blueprintsB.onclick = cCommands.blueprints;
				cancel.onclick = manage;
			
				buildInfo.innerHTML = "Baza<hr></hr>Wydaj dwa priorytety: <br><br>";
	
				buildInfo.appendChild(cactusB);
				buildInfo.appendChild(waterB);
				buildInfo.appendChild(foodB);
				buildInfo.appendChild(blueprintsB);
				buildInfo.appendChild(cancel);
			}
			
			main()
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
		objectSizeX = 6; objectSizeY = 4;
		let ix = 0; let iy = 0;
		function draw(){
			while(iy < objectSizeY){
				while(ix<objectSizeX){ world1.build[editTile+(world1.cols*iy)+ix] = 2; ix++};
				ix = 0; iy++; 
			}
			iy = 0;
			start = false;
			maxPop = 10;
			currPop = maxPop;
			c.canvas.removeEventListener("mousedown", draw,false)
			return;
		}
		c.canvas.addEventListener("mousedown", draw, false);
		return;
	},
	kitchen: function(){
		if(mode == "gm") {return;}
		if(mode == "edit"){
		
		
		objectSizeX = 4; objectSizeY = 3;
		let ix = 0; let iy = 0;
		function draw(){
			while(iy < objectSizeY){
				while(ix<objectSizeX){ world1.build[editTile+(world1.cols*iy)+ix] = 3; ix++};
				ix = 0; iy++; 
			}
			iy = 0;
			account -= 35;
			kitchAmount++;
			c.canvas.removeEventListener("mousedown", draw,false)
			return;
		}
		c.canvas.addEventListener("mousedown", draw, false);
	}
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
			account -= 100;
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
			account -= 20;
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
			account -= 20;
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
			account -= 35;
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
			account -= 25;
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
			account -= 50;
			dinAmount++;
			c.canvas.removeEventListener("mousedown", draw,false)
			return;
		}
		c.canvas.addEventListener("mousedown", draw, false);
		
		return;
	},
	farm: function(){
		
		objectSizeX = 1; objectSizeY = 1;
		let ix = 0; let iy = 0;

		function draw(){
			if(mode == "gm"){
				c.canvas.removeEventListener("mousedown", draw,false)
			}
			else{
			while(iy < objectSizeY){
				while(ix<objectSizeX){ world1.build[editTile+(world1.cols*iy)+ix] = 7; ix++};
				ix = 0; iy++; 
			}
			iy = 0;
			account -= 5;
			farmAmount++;
			}
		}
		c.canvas.addEventListener("mousedown", draw, false);
		return 0;
	},
}

function editMode()
{
	if(mode == "edit"){
		pause = true;
	let kuch = document.createElement("button");
	let warsz = document.createElement("button");
	let farm = document.createElement("button");

	let stud = document.createElement("button");
	let gen = document.createElement("button");
	
	let syp = document.createElement("button");
	let lazn = document.createElement("button");
	let jad = document.createElement("button");

	kuch.innerHTML = "Kuchnia"
	warsz.innerHTML = "Warsztat"
	farm.innerHTML = "Farma"

	stud.innerHTML = "Studnia"
	gen.innerHTML = "Generator"

	syp.innerHTML = "Sypialnia"
	lazn.innerHTML = "Łaźnie"
	jad.innerHTML = "Jadalnia"

	kuch.onclick = objects.kitchen
	warsz.onclick = objects.workshop
	farm.onclick = objects.farm

	stud.onclick = objects.well
	gen.onclick = objects.generator

	syp.onclick = objects.bedrooms
	lazn.onclick = objects.baths
	jad.onclick = objects.diningRoom

	items.appendChild(kuch);
	items.appendChild(warsz)
	items.appendChild(farm);

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
var tileX, tileY;

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
		time.wClock();
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
	}

}


let currfFood = 0;
let currDish = 0;

function foodAndEating(){
	fFood = 1*(farmAmount*nFarm);
	if(hours > 6 && wTime == 0 || wTime == 3000){
		currfFood += fFood;
	}
	if(start && (hours == 6 && wTime == 0) || (hours == 13 && wTime == 2500) || (hours == 19 && wTime == 0)){
		
		if(fDish > 0){
			currDish = maxPop;
			let p=0;
			while(p < currDish){
				if(fDish == 0){
					currFFood -= currDish*2;
					p++
				}
				if(fDish > 0){
					fDish--;
					p++;
				}
			}
			p = 0;
		}
		else if(fFood > 0){
			currDish = maxPop;
			let p=0;
			while(p < currDish){
				if(fDish == 0){
					currFFood -= currDish*2;
					p++
				}
				if(fFood > 0){
					fFood--;
					p++;
				}
			}

		}
	}
}

let gameInfo= document.getElementById("gameInfo")
function init(){
	
	gameInfo.innerHTML = "Populacja: "+currPop+"/"+maxPop+"   |   "+"Tryb: "+mode+" Czas: "+hours+":"+min+
	"<hr></hr>Statystyki profesji: <br>"+
	"Poszukiwacze: "+nExpl+
	"<br>"+"Farmerzy: "+nFarm+
	"<br>"+"Zbieracze: "+nColl+"<hr></hr>"+
	"Surowce<br></br>"+
	"Surowe warzywa: "+currfFood+"<br>"+
	"Posiłki: "+"fDish<br>"+
	"Woda: "+"fWater<br>"+
	"Prąd: "+"gElectr<br><br>"+
	"Kamyki: "+account
	;
	loop()
	foodAndEating()
	
	window.requestAnimationFrame(init);
}

window.addEventListener("load", init);
