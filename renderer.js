var c = document.getElementById('kanwa').getContext('2d');
var height = 600;
c.canvas.height = height;
var width = 800;
c.canvas.width = width;

var kc = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
var nkc = [];
var offKc = [78, 73, 69, 32, 68, 90, 73, 69, 75, 85, 74, 69];

//BOOLEANY DEBUGOWE
var dbXY = false;
var dbKeys = false;
var dbGrid = false;
var dbWindow = false;
var mKeyCode = [];

//ilosc kafelkow na ekranie
let tilesPerScreenX = 10;	//10
let tilesPerScreenY = 8;	//8

//wielkość tekstur x i y
let scaledSizeX = width/tilesPerScreenX;
let scaledSizeY = height/tilesPerScreenY; 

//staly obszar aktywacji przesuniecia obszaru
let chright = width - scaledSizeX;
let chleft = scaledSizeX;
let chup = scaledSizeY;
let chdown = height - scaledSizeY;

//Booleany dla ekwipunku, menu i swiata
var pause = false;
var inventory = false;
var overworld = true;
var interior = false;
var activate = false;
var objAct = false;

var cTop;
var cBottom;
var cRight;
var cLeft;
//Postacie
var Player = function(x, y) 	//GRACZ
{	
	this.x = x; this.y = y;
	this.oldX; this.oldY;
	this.pScale = 1.2;
	this.pWidth = scaledSizeX-30; this.pHeight = scaledSizeY/this.pScale;
	
	this.life = 3; this.velocity = 4;
	this.inventory = [[/*przedmiot*/],
					[/*ilość*/]];
	this.capt = 12;
	this.stats = {
		wisdom: 1, 
		strength: 1,
		charisma: 1,
	
	}
};
var charSpawn = {				//SPRZEDAWCY
	merchant : function(x, y){
		this.store = [];

	}
}

//Swiat
var worldTile = 0;
var world1 = {
	tsize: 128,
	cols: 20,
	rows: 20,
	intCols: 10,
	intRows: 10,
	worldType: 0,
	
	interiors : [
		[0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,
		],
		[],
		[],
		[],
	],
	interiorWalls : [
		[1,1,1,1,1,1,1,1,1,1,
		1, , , , , , , , ,1,
		1, , , , , , , , ,1,
		1,1,1,1,1,1, , , ,1,
		1, , , , , , , , ,1,
		1, , ,2, , , , , ,1,
		1, , ,2,2,2,2,2,2,1,
		1, , , , , , , , ,1,
		1, , , , , , , , ,1,
		1,1,1,1, , ,1,1,1,1,
		],
		[],
		[],
		[],
	],


	grass : [
			[ 
			4, 4, 5, 1, 1, 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
			1, 3, 3, 2, 1, 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
			1, 1, 0, 1, 1, 0,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
			1, 0, 1, 0, 0, 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
			1, 1, 0, 1, 1, 1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
			1, 1, 3, 2,10,25,20,20,20,20,20,20,20,20,20,20,20,  ,  ,  ,
			1, 1, 1, 3,10,21,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
			2, 1, 1, 1,10,21,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
			1, 2, 1, 3,10,21,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
			1, 3, 1, 2,10,21,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
			1, 1, 2, 1,10,21,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
			1, 1, 1, 2,10,25,20,20,20,20,20,20,20,20,20,20,20,  ,  , 1,
			1, 1, 1, 6,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
			1, 1, 6,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
			1,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1,  ,
			6,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1,  ,
			 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
			 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
			 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  , 1,  ,
			 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
			],[]],

	roads : [
			[ 
			 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
			 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
			 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
			 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
			 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
			 ,  ,  ,17, 9,13,10, 9,11,13, 9, 9,13,12, 9,10, 9,  ,  ,  ,
			 ,  ,  ,17, 9, 9, 9, 9, 9,12, 9, 9,13, 9, 9, 9,13,  ,  ,  ,
			 ,  ,  ,17, 9, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,  ,  ,  ,
			 ,  ,  ,17, 9, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  ,  ,  ,
			 ,  ,  ,17, 9, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  ,  ,  ,
			 ,  ,  ,19, 9, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  ,  ,  ,
			 ,  ,  ,17, 9, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  ,  ,  ,
			 ,  ,  ,17, 9, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  ,  ,  ,
			 ,  ,  ,17, 9, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  ,  ,  ,
			 ,  ,  ,17, 9, 4, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,  ,  ,  ,
			 ,  ,  ,17, 9,13,10, 9,11,13, 9, 9,13,12, 9,10, 9,  ,  ,  ,
			 ,  ,  ,17, 9, 9, 9, 9, 9,12, 9, 9,13, 9, 9, 9,13,  ,  ,  ,
			 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
			 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
			 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
			],[
				,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
				,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
				,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
				,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
				,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
				,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
				,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
				,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
				,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
				,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
				,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
				,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
				,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
				,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
				,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
				,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
				,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
				,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
				,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
				,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
			]],
	
	buildings: [
			[ 
			 ,  ,  ,  ,  ,  , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,  ,  ,  ,
			 ,  ,  ,  ,  ,  , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,  ,  ,  ,
			 ,  ,  ,  ,  ,  , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,  ,  ,  ,
			 ,  ,  ,  ,  ,  , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,  ,  ,  ,
			 ,  ,  ,  ,  ,  , 1, 1,69,69, 1, 1, 1,69,69, 1, 1,  ,  ,  ,
			 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
			 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
			 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
			 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
			 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
			 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
			 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
			 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
			 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
			 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
			 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
			 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
			 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
			 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
			 ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,  ,
			],[]],
	
	
	cMap : 
		  [[ 0, 0, 0, 0, 0, 0, 1,  ,  ,  ,  ,  ,  ,  ,  , 1, 0, 0, 0, 1,
			 0, 0, 0, 0, 0, 0, 1,  ,  ,  ,  ,  ,  ,  ,  , 1, 0, 0, 0, 0,
			 0, 0, 0, 0, 0, 0, 1,  ,  ,  ,  ,  ,  ,  ,  , 1, 0, 0, 0, 0,
			 0, 0, 0, 0, 0, 0, 1,  ,  ,  ,  ,  ,  ,  ,  , 1, 0, 0, 0, 0,
			 0, 0, 0, 0, 0, 0,14,2,"m","m",2,2,"wm","wm", 2,15, 0,0,0,0,
			 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			 0, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]
			,
			[
			5, 1, 1, 1,10, 0, 0, 8, 1, 5,
			2, 0, 0, 0, 0, 0, 0, 0, 0, 2,
			5, 1, 1, 1, 0, 0, 0, 0, 0,11,
			2, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			2, 0, 0, 5, 5, 0, 0, 0, 0, 9,
			2, 0, 0, 0, 0, 0, 0, 0, 0, 4,
			2, 0, 0, 0, 0, 0, 0, 0, 0, 4,
			2, 0, 0, 0, 0, 0, 0, 7, 7, 5,
			2, 0, 0, 0, 0, 0, 0, 0, 0, 0,
			5, 1, 1, 1,10, 0, 8, 1, 0, 5,
			]
			,
			[
			2,2,2,2,2,2,
		    2,0,0,0,0,2,
			2,0,0,0,0,2,
			2,0,0,0,0,2,
			2,0,0,0,0,2,
			2,2,2,2,2,2]
			],
	}

//Kamera
var Camera = function(x, y, w, h)
{
	this.w = w; this.h = h;
	this.x = x * w; this.y = y * h;
	this.nx = this.x; this.ny = this.y;
}

//Kolizje na krawedziach
function leftCollision(object, column){
	if(right)
	{
		
		let left = column * scaledSizeX;
		//
		if(object.x + object.pWidth + camera.x > left ) {
			
			object.x -= object.velocity;
			
			return true;
			
		}
	}
	return false;
	}
function rightCollision(object, column){

	if(left)
	{
		let right = (column + 1) * scaledSizeX;
		if(object.x + camera.x < right ){
			object.x += object.velocity;
			return true;
		}
	}
	return false;
	}
function topCollision(object, row){
	if(down) {
		let top = row * scaledSizeY;		
		if(object.y + object.pHeight + camera.y > top && (object.y - object.velocity) + object.pHeight + camera.y <= top) {
			object.y -= object.velocity;
			return true;
			}
		}
		return false;
	}
function bottomCollision(object, row){
	if(up) {
		let bottom = (row + 1) * scaledSizeY;
		if(object.y + camera.y < bottom && object.y - object.pHeight + camera.y < bottom) 	//możliwe bugi
		{
			object.y += object.velocity;
			return true;
		}
	}
	return false;
	}

//Kolizje na kafelkach
collision = {
		1:function(object, row, column) {
			
			if(leftCollision(object, column)){return;}
			rightCollision(object, column)
		},
		2:function(object, row, column) {
			
			if(topCollision(object, row)){return;}
			bottomCollision(object, row)
		},
		3:function(object, row, column){
			
			topCollision(object, column);
		},
		4:function(object, row, column){
			
			bottomCollision(object, column);
		},
		5:function(object, row, column){
			
		 	if(bottomCollision(object, row)){return;}
		 	if(topCollision(object, row)){return;}
		 	if(rightCollision(object, column)){return;}
		 	leftCollision(object, column);
		 },
		6:function(object, row, column){
			
			topCollision(object, row);
		},
		7:function(object, row, column){
			
			bottomCollision(object, row)
		},
		12:function(object, row, column){
			
			if(topCollision(object, row)){return;}
			rightCollision(object, column);
			
		},
		13:function(object, row, column){
			
			if(topCollision(object, column)){return;}
			leftCollision(object, column);
		},
		14:function(object, row, column){
			
			if(bottomCollision(object, row)){return;}
			leftCollision(object, column);
		},
		15:function(object, row, column){
			
			if(bottomCollision(object, row)){return;}
			rightCollision(object, column);
		},
		undefined:function(object, row, column) {
				console.log("error: player left boundry")
		},
		"m":function(){
			objAct = true;
		}
		
}

//Przedmioty
let itemSpawn = {
	apple: {	//JABLKO
		active : true,
		draw: function(x, y){
			x = x - camera.x;
			y = y - camera.y;
			appleTx = new Image();
			appleTx.src = "img/expressions/exclamationMark.png";
			
			collected = false;
			
			if( cTop < y || cBottom > y + scaledSizeY || cRight > x + scaledSizeX || cLeft < x)
			{
				c.fillStyle = "red";
				c.fillRect(x, y, scaledSizeX/3, scaledSizeY/3);
			}
			else
			{
				z = 0;
				while(z < player.capt)
				{
					if(player.inventory[0][z] == "apple")
					{
						player.inventory[1][z]++;
						this.active = false;
					}
					z++;
				}
				player.inventory.recent;
				player.inventory[0][0] = "apple";
				player.inventory[1][0] = 1;
				this.active = false;
			}
		}
	
	}
}

// OBSŁUGA KLAWIATURY
var up = false;
var down = false;
var right = false;
var left = false;

function keyDownHandler(event)
{
	if(event.keyCode == 68) //"d"
	{
		right = true;
	}
	if(event.keyCode == 65) //"a"
	{
		left = true;
	}
	if(event.keyCode == 83) //"s"
	{
		down = true;
	}
	if(event.keyCode == 87) //"w"
	{
		up = true;
	}
	if(event.keyCode == 32 && !inventory) //"i"
	{
		inventory = true;
		z = 0;
		v = 0;
		pause = true;
	}
	else if(event.keyCode == 32 && inventory) //"i"
	{
		inventory = false;
		z = 0;
		v = 0;
		pause = false;
	}
	
	
}

function keyUpHandler(event)
{
	if(event.keyCode == 68)
	{
		right = false;
	}
	if(event.keyCode == 65)
	{
		left = false;
		
	}
	if(event.keyCode == 83)
	{
		down = false;
	}
	if(event.keyCode == 87)
	{
		up = false;
	}
}


function scrollControll(){

	let defaultChValue = 200;
	let left = defaultChValue;
	let right = width - defaultChValue;
	let up = defaultChValue;
	let down = height - defaultChValue;

	if(!pause){
	if(player.x < left && camera.x > 0)	//przewiniecie w lewo
	{
		camera.x -= player.velocity;
		player.x += player.velocity;
	}
	if(player.x > right && camera.x < width) //przewiniecie w prawo
	{
		camera.x += player.velocity;
		player.x -= player.velocity;
	}
	if(player.y < up && camera.y > 0)	//przewiniecie w gore
	{
		camera.y -= player.velocity;
		player.y += player.velocity;
	}
	if(player.y > down && camera.y < height) //przewiniecie w dol
	{
		camera.y += player.velocity;
		player.y -= player.velocity;
	}
	}
}

function mapChangeControll(worldTile){
	
	if(worldTile == 0 && cLeft > width){
		worldTile++;
		console.log(worldTile)
	}


}
let z = 0;
let v = 0;

function drawInv(inv, capt)
{
	let i = 0;
	let invWindowX = 705;
	let invWindowY = 505;
	
	//rysuj ekwipunek
	c.fillStyle = "rgba(20,20,20,0.95)"
	c.fillRect(50, 50, invWindowX, invWindowY);

	c.fillStyle = "white";
	c.font = "50px Calibri";
	c.fillText("Inventory", 70, 150);

	let invcount=0;
	let invTile = 140;
	let invBreak = 0;
	let invTileX = 485;
	let invTileY = 130;

	let itemX = invTileX + 12;
	let itemY = invTileY + 12;
	let itemid = 0;
	c.fillStyle = "rgb(100, 100, 100)";
	//rysuj ekwipunek
	while(invcount < capt)
	{
		c.fillRect(invTileX, invTileY, invTile/2, invTile/2 );
		invBreak = 20;
		invTileX+=(invTile/2) + invBreak;
		if(invTileX >= invWindowX)
		{
			invTileY+=(invTile/2) + invBreak;
			invTileX = 485;
		}

		item = player.inventory[0][invcount];
		itemC = player.inventory[1][invcount];
		
		switch(item)
		{
				case "apple":
				c.fillStyle = "red";
				c.fillRect(itemX, itemY, invTile/3, invTile/3);
				c.fillStyle = "white";
				c.font = "28px Calibri";
				c.fillText(itemC, itemX + 42, itemY + 52);
		}
		c.fillStyle = "rgb(100, 100, 100)";
		invcount++;
	}

	invTileY = 220;
	invBreak = 20;
	c.fillRect(70, invTileY, invTile + invBreak, invTile + invBreak);
	c.drawImage(playerTx, (invTile + player.pWidth + 25)/2, (invTileY + invTile - player.pHeight - 35), player.pWidth*1.25, player.pHeight*1.25);

	let heartX = invTile + 95;
	let heartY = invTileY;
	let heartScale = 32;
	while (i<player.life)
	{
		c.drawImage(heart, heartX, heartY, heartScale, heartScale);
		invBreak = 26;
		heartX += invBreak;
		if(heartX >= invTileX - invBreak)
		{
			heartX = invTile + 95;
			heartY += heartScale;
		}
		i++;
	}
	invTileY = 130;
	invTileX = 485;
	invBreak = 20;
	itemid = player.inventory[0][z];
	
	c.strokeStyle = "white";
	
	if(z > -1 && z < 3)
	{
		c.rect(invTileX + (((invTile/2) + invBreak) * v),  invTileY , invTile/2, invTile/2);
	}
	if(z > 2 && z < 6)
	{
		c.rect(invTileX + (((invTile/2) + invBreak) * v),  invTileY+(invTile/2)+invBreak , invTile/2, invTile/2);
	}
	if(z > 5 && z < 9)
	{
		c.rect(invTileX + (((invTile/2) + invBreak) * v),  invTileY+((invTile/2)*2)+(invBreak*2) , invTile/2, invTile/2);
	}
	if(z > 8 && z < 12)
	{
		c.rect(invTileX + (((invTile/2) + invBreak) * v),  invTileY+((invTile/2)*3)+(invBreak*3) , invTile/2, invTile/2);
	}
	
	c.stroke();
}

//Stworzenie gracza
var player = new Player(250, 250);

//Ustawienie kamery
var camera = new Camera(0, 0, width, height);

//GLOBALNE KOLIZJE DLA PRZEDMIOTÓW


//status textures
var heart = new Image();
heart.src = "img/status/heart.png";

//character textures
var playerTx = new Image();
playerTx.src = "img/npc/hero.png";

var grassTx = new Image();
grassTx.src = "img/terrain/gTileMap.png";
var roadTx = new Image();
roadTx.src = "img/terrain/rTileMap.png";


var land = {
	
	drawInterior: {
		floor: function(type, worldTile){
			worldTile = world1.worldType;
		
			let minX = Math.floor((camera.x / scaledSizeX));
			let maxX = Math.ceil(((camera.x + camera.w) / scaledSizeX));
			let minY = Math.floor((camera.y / scaledSizeY));
			let maxY = Math.ceil(((camera.y + camera.h) / scaledSizeY));
		
			if(minX < 0)
			{
				minX = 0;
			}
			if(minY < 0)
			{
				minY = 0;
			}
			if(maxX > world1.intCols)
			{
				maxX = world1.intCols;
			}
			if(maxY > world1.intRows)
			{
				maxY = world1.intRows;
			}
		
			for (var mapX = minX; mapX < maxX; mapX++)
			{
				for(var mapY = minY; mapY < maxY; mapY++)
				{
					var floorValue = (world1.interiors[type][ mapY*world1.intCols + mapX]);
					var floorX = mapX * scaledSizeX - camera.x;
					var floorY = mapY * scaledSizeY - camera.y;
					
					c.drawImage(grassTx, floorValue * world1.tsize, floortxrow, world1.tsize, world1.tsize, floorX, floorY, scaledSizeX, scaledSizeY);
					}
			}
		},
		walls: function(type, worldTile){
			worldTile = world1.worldType;
		
			let minX = Math.floor((camera.x / scaledSizeX));
			let maxX = Math.ceil(((camera.x + camera.w) / scaledSizeX));
			let minY = Math.floor((camera.y / scaledSizeY));
			let maxY = Math.ceil(((camera.y + camera.h) / scaledSizeY));
		
			if(minX < 0)
			{
				minX = 0;
			}
			if(minY < 0)
			{
				minY = 0;
			}
			if(maxX > world1.intCols)
			{
				maxX = world1.intCols;
			}
			if(maxY > world1.intRows)
			{
				maxY = world1.intRows;
			}
		
			for (var mapX = minX; mapX < maxX; mapX++)
			{
				for(var mapY = minY; mapY < maxY; mapY++)
				{
					var walltxrow = 0;
					var wallValue = (world1.interiorWalls[type][ mapY*world1.intCols + mapX]);
					var wallX = mapX * scaledSizeX - camera.x;
					var wallY = mapY * scaledSizeY - camera.y;
					if(wallValue >= 20)
					{
						walltxrow = world1.tsize;
					}
					else if(wallValue >= 30)
					{
						walltxrow = world1.tsize*2;
					}
					else
					c.drawImage(grassTx, wallValue * world1.tsize, walltxrow, world1.tsize, world1.tsize, wallX, wallY, scaledSizeX, scaledSizeY);
					}
					
			}
	}
	},

	drawGrass: function(worldTile){

	worldTile = world1.worldType;
	
	let minX = Math.floor((camera.x / scaledSizeX));
	let maxX = Math.ceil(((camera.x + camera.w) / scaledSizeX));
	let minY = Math.floor((camera.y / scaledSizeY));
	let maxY = Math.ceil(((camera.y + camera.h) / scaledSizeY));

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
			var grassValue = (world1.grass[worldTile][ mapY*world1.cols + mapX ]);
			var grassX = mapX * scaledSizeX - camera.x;
			var grassY = mapY * scaledSizeY - camera.y;
			if(grassValue == undefined){
				c.fillStyle = '#42bd41';
				c.fillRect(grassX, grassY, scaledSizeX, scaledSizeY);
			}
			else{
				c.drawImage(grassTx, grassValue * world1.tsize, 0, world1.tsize, world1.tsize, grassX, grassY, scaledSizeX, scaledSizeY);
			}
			
			}
			
	}
},

	drawRoads: function(worldTile){

		worldTile = world1.worldType;

		let minX = Math.floor((camera.x / scaledSizeX));
		let maxX = Math.ceil(((camera.x + camera.w) / scaledSizeX));
		let minY = Math.floor((camera.y / scaledSizeY));
		let maxY = Math.ceil(((camera.y + camera.h) / scaledSizeY));

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
				var roadValue = (world1.roads[worldTile][ mapY*world1.cols + mapX ]);
				var roadX = mapX * scaledSizeX - camera.x;
				var roadY = mapY * scaledSizeY - camera.y;
				c.drawImage(roadTx, roadValue * world1.tsize, 0, world1.tsize, world1.tsize, roadX, roadY, scaledSizeX, scaledSizeY);
				}
				
		}
	},

	drawBuild: function(worldTile){
	worldTile = world1.worldType;
	
	let minX = Math.floor((camera.x / scaledSizeX));
	let maxX = Math.ceil(((camera.x + camera.w) / scaledSizeX));
	let minY = Math.floor((camera.y / scaledSizeY));
	let maxY = Math.ceil(((camera.y + camera.h) / scaledSizeY));

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
			var buildVal = (world1.buildings[worldTile][ mapY*world1.cols + mapX ]);
			var buildX = mapX * scaledSizeX - camera.x;
			var buildY = mapY * scaledSizeY - camera.y;

			if(buildVal == 0){
				c.fillStyle = "green";
				c.fillRect(buildX, buildY, scaledSizeX, scaledSizeY);
			}
			else if(buildVal == 1)
			{
				c.fillStyle = "grey";
				c.fillRect(buildX, buildY, scaledSizeX, scaledSizeY);
			}
			else if(buildVal == 2)
			{
				c.fillStyle = "orange";
				c.fillRect(buildX, buildY, scaledSizeX, scaledSizeY);
			}
			else if(buildVal == 69)
			{
				c.fillStyle = "red";
				c.fillRect(buildX, buildY, scaledSizeX, scaledSizeY);
			}	
		}
	}
},
	tree: function(x, y, type){
		let treeTx = new Image();
		
		x -= camera.x;
		y -= camera.y;

		if(type == "oak"){
			treeTx.src = "img/terrain/tree0.png";
			c.drawImage(treeTx, x, y, scaledSizeX, scaledSizeY*1.55);
		}
		
	}
}

var npc = {
	//rNumberLength: 3,
	//rRandomizedNumber: parseInt(Math.random()*this.rNumberLength),
    //rTxHolder: ['img/npc/2.png','img/npc/3.png','img/npc/4.png'],
	height: scaledSizeX*1.20,
	random: function(x, y){
		c.fillStyle = 'yellow';
		x -= camera.x;
		y -= camera.y;
		let randomTx = new Image();
		if(cTop > y && cBottom < y + this.height && cLeft > x  && cRight < x + scaledSizeX){
			c.fillStyle = 'yellow';
			c.fillRect(x, y, scaledSizeX, this.height);
			c.fillStyle = 'red';
			c.fillRect(x+25, y-30, 30, 30); 
		}
		else{
			c.fillRect(x, y, scaledSizeX, this.height);
			c.fillStyle = 'red';
			c.font = "20px Calibri"; 
			c.fillText("npc", x+20, y+50);
		}
		
	}
}

//PĘTLA GRY
function loop()
{
	var c = document.getElementById('kanwa').getContext('2d');
	c.clearRect(0, 0, c.width, c.height); //czyszczenie ekranu <===
	c.imageSmoothingEnabled = false;
	var height = 600;
	c.canvas.height = height;
	var width = 800;
	c.canvas.width = width;

	cTop = parseInt(player.y + player.pHeight);
	cBottom = player.y;
	cRight = player.x;
	cLeft = parseInt(player.x + player.pWidth);

	mapChangeControll(worldTile);

	if(tilesPerScreenX <= 2 || tilesPerScreenY <= 2)
	{
		pause = true;
		c.font = "42px Calibri"; 
		c.fillStyle = "red";
		c.fillText("number of tiles per screen", width/4, (height/2));
		c.fillText("for x or y axis is too low", width/4, (height/2) + 41);
	}
	else
	{
	if(overworld && !interior)
	{

	land.drawGrass(worldTile);
	land.drawRoads(worldTile);
	npc.random(500, 500)
	npc.random(700, 500)
	land.tree(100, 200, "oak");
	c.drawImage(playerTx, player.x, player.y, player.pWidth, player.pHeight);
	land.drawBuild(worldTile);

	

	}
	if(interior && !overworld){
	land.drawInterior.floor(0 ,0);
	c.drawImage(playerTx, player.x, player.y, player.pWidth, player.pHeight);
	land.drawInterior.walls(0 ,0);
	}
	

	//PORUSZANIE SIĘ
	if(!pause)
	{
		//poruszanie sie
		if(up)
		{
			player.y -= player.velocity;
		}
		if(down)
		{
			player.y += player.velocity;
		} 

		if(left)
		{
			player.x -= player.velocity;
		}
		if(right)
		{
			player.x += player.velocity;
		}
		
		
		
		if(camera.x + player.velocity < 0)	//sprawdź czy gracz porusza się w lewo
		{
			if(overworld){
			var leftColumn = Math.floor((player.x + camera.x) / scaledSizeX);
			var bottomRow = Math.floor((player.pHeight + player.y + camera.y) / scaledSizeY);
			var tileValue = world1.cMap[world1.worldType][bottomRow * world1.cols + leftColumn];
			}
			if(interior){
			var leftColumn = Math.floor((player.x + camera.x) / scaledSizeX);
			var bottomRow = Math.floor((player.pHeight + player.y + camera.y) / scaledSizeY);
			var tileValue = world1.interiorWalls[0][bottomRow * world1.cols + leftColumn];
			}
			if(tileValue != 0)
			{
				collision[tileValue](player, bottomRow, leftColumn);
			}
			
			var topRow = Math.floor((player.y + camera.y) / scaledSizeY);
			if(overworld){
				tileValue = world1.cMap[world1.worldType][topRow * world1.cols + leftColumn];
			}
			if(interior){
				tileValue = world1.interiorWalls[0][topRow * world1.cols + leftColumn];
			}
			
			if(tileValue != 0)
			{
				collision[tileValue](player, topRow, leftColumn);
			}
		}
		if(camera.x + player.velocity > 0) //sprawdź czy gracz porusza się w prawo
		{
			
			var rightColumn = Math.floor((player.x + player.pWidth + camera.x) / scaledSizeX);
			var bottomRow = Math.floor((player.y + player.pHeight + camera.y) / scaledSizeY);
			if(overworld){
				var tileValue = world1.cMap[world1.worldType][bottomRow * world1.cols + rightColumn];
			}
			if(interior){
				var tileValue = world1.interiorWalls[0][bottomRow * world1.cols + rightColumn];
			}
			if(tileValue != 0)
			{
				collision[tileValue](player, bottomRow, rightColumn);
			}
			
			var topRow = Math.floor((player.y + camera.y) / scaledSizeY);
			if(overworld){
				tileValue = world1.cMap[world1.worldType][topRow * world1.cols + rightColumn];
			}
			if(interior){
				tileValue = world1.interiorWalls[0][topRow * world1.cols + rightColumn];
			}

			if(tileValue != 0)
			{
				collision[tileValue](player, topRow, rightColumn);
			}
			
		}
		
		if(camera.y + player.velocity < 0) //sprawdź czy gracz porusza się w górę
		{
			var leftColumn = Math.floor((player.x + camera.x) / scaledSizeX);
			var topRow = Math.floor((player.y + camera.y) / scaledSizeY);
			if(overworld){
				var tileValue = world1.cMap[world1.worldType][topRow * world1.cols + leftColumn];
			}
			if(interior){
				var tileValue = world1.interiorWalls[world1.worldType][topRow * world1.cols + leftColumn];
			}

			if(tileValue != 0)
			{
				collision[tileValue](player, topRow, leftColumn);
			}
//
			var rightColumn = Math.floor((player.x + player.pWidth + camera.x) / scaledSizeX);
			
			if(tileValue != 0)
			{
				collision[tileValue](player, topRow, rightColumn);
			}
		}
		else if(camera.y + player.velocity > 0) //sprawdź czy gracz porusza się w dół
		{
		{
		var leftColumn = Math.floor((player.x + camera.x) / scaledSizeX);
		var bottomRow = Math.floor((player.pHeight + player.y + camera.y) / scaledSizeY);
		if(overworld){
			var tileValue = world1.cMap[world1.worldType][bottomRow * world1.cols + leftColumn];
		}
		if(interior){
			var tileValue = world1.interiorWalls[world1.worldType][bottomRow * world1.cols + leftColumn];
		}

		if(tileValue != 0)
		{
			collision[tileValue](player, bottomRow, leftColumn);
		}
		
		var rightColumn = Math.floor((player.pWidth + player.x + camera.x) / scaledSizeX);
		if(overworld)
		{
			tileValue = world1.cMap[world1.worldType][bottomRow * world1.cols + rightColumn];
		}
		if(interior)
		{
			tileValue = world1.interiorWalls[world1.worldType][bottomRow * world1.cols + rightColumn];
		}
		
		
		
		if(tileValue != 0)
		{
			collision[tileValue](player, topRow, rightColumn);
		}
		}
		}
	if(objAct && activate){
		overworld = false;
		interior = true;
		player.oldX = player.x;
		player.oldY = player.y;
		player.x = width/2;
		player.y = height - 130;
	}
		
	}
	window.requestAnimationFrame(scrollControll);
		if(inventory)
		{
		drawInv(player.inventory, player.capt);
		}
		if(!pause && !inventory)
		{
			var i = 0;
			var heartX;
			heartX = 10;
			while (i<player.life)
			{
			c.drawImage(heart, heartX, 10, 40, 40);
			heartX += 35;
			i++;
		}
		}
		
		if(dbXY)
		{
			console.log("pX: "+player.x+" pY: "+player.y+"\ncX: "+camera.x+" cY: "+camera.y)
		}
		else if(dbKeys)
		{
			window.addEventListener("keydown", (e) => { console.log("Kod klawisza: "+e.keyCode)})
		}
		else if(dbWindow)
		{
			console.log("w: "+width+" H: "+height );
		}
		
		if(!pause)
		{
		document.addEventListener('keydown', keyDownHandler, false);
		document.addEventListener('keyup', keyUpHandler, false);
		}
		
		if(player.life <= 0)
		{
			pause = true;
			c.font = "42px Arial";
			c.fillStyle = "rgb(160,0,0)";
			c.textAlign = "center";
			c.fillText("Nie żyjesz. Odśwież stronę...", 400,300)
			
		}
		
		// window.addEventListener('resize', resizeCanvas, false);
	}
		window.requestAnimationFrame(loop); // <== odświeżanie
		
}



window.addEventListener('keyup', (e) => {
		if(!pause){
			if(e.keyCode == "69" && objAct){
				activate = true;
			}
		}
		if(pause && inventory)
		{
			if(e.keyCode == "68")
			{
				z++;
				v++;
				
				if(z == player.capt)
				z=0;
				
				if(v == 3)
				v = 0;
			}
			if(e.keyCode == "65")
			{
				z--;
				v--;
				if(z<0)
				{
					z=player.capt -1;
				}
				if(v == -1)
				v = 0;
				
			}
			if(e.keyCode == "87")
			{
				z-=3;
				v-=3;
				if(z == -3)
				{
					z = 9;
				}
				else if(z == -2)
				{
					z = 10;
				}
				else if(z == -1)
				{
					z = 11;
				}
			}
			if(e.keyCode == "83")
			{
				z+=3;
				v+=3;
				if(z == 12)
				{
					z = 0;
				}
				else if(z == 13)
				{
					z = 1;
				}
				else if(z == 14)
				{
					z = 2;
				}
			}
		}

		if(dbXY == false && dbKeys == false && dbWindow == false && dbGrid == false)
		{
			nkc.push(e.keyCode);
			if(e.keyCode == "113" || e.keyCode == "116")
			{ 
			nkc = [];
			}
			if(nkc.length == 10)
			{
				if(nkc.join("") == kc.join(""))
				{
					var db = prompt("[1] = debug X i Y postaci\n[2] = wymiary okna\n[3] = kody klawisze\n[off] = wylaczenie debugowania");
					parseInt(db);
					if(db == 1)
					{
						dbXY = true;
					}
					else if(db == 3)
					{
						dbKeys = true;
					}
					else if(db == 2)
					{
						dbWindow = true;
					}
					else if(db = "off")
					{
						dbXY = false;
						dbKeys = false;
						dbWindow = false;
					}
				}
				else if(nkc.join("") != kc.join(""))
				{
					nkc = [];
				}
			}
		}
		else if(dbXY || dbGrid || dbKeys || dbWindow)
		{
			nkc.push(e.keyCode);
			if(e.keyCode == "113")
			{ 
				nkc = [];
			}
			if(nkc.length == 10)
			{
				if(nkc.join("") == kc.join(""))
				{
					dbXY = false;
					dbKeys = false;
					dbWindow = false;
				}
				else if(nkc.join("") != kc.join(""))
				{
					nkc = [];
				}
			}
		}
	});
	

window.addEventListener("load", (event) => {loop();});