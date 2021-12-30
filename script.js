
//allows use to utilize all canvas functions
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//declaring and initializing important variables used throughout code
var directions = 1; 
var page = 1;
var count = 0;
var surroundedBy = 0;
var startIndex;

//declaring variables (buttons) for the home page
var begin = { 
	x: 210, 
	y: 263, 
	w: 180, 
	h: 60
}

var headed = {
	x: 50,
	y: 180,
	w: 200,
	h: 60
}

var obstacles = {
	x: 50, 
	y: 280, 
	w: 200,
	h: 60
}

var backtracking = {
	x: 50, 
	y: 380, 
	w: 200, 
	h: 60
}

var gridFilling = {
	x: 50, 
	y: 480, 
	w: 200, 
	h: 60
}

var targetFinding = {
	x: 350, 
	y: 180, 
	w: 200, 
	h: 60
}

var gridFillingMulti = {
	x: 350, 
	y: 280,
	w: 200, 
	h: 60
}

var copsAndRobbers = {
	x: 350, 
	y: 480,
	w: 200, 
	h: 60
}

var startSimulation = {
	x: 252,
	y: 63,
 	w: 100,
 	h: 40
 };

var returnMessage = {
	x: startSimulation.x-5,
	y: startSimulation.y-5, 
 	w: startSimulation.w+10,
 	h: startSimulation.h+10
 };


const start = canvas.width/2 - 30; //left side of 8x8 grid
var arrayOfRectsMulti = []; //array of rectangles used for the multi faced simulations (Cubic Exterior)

//first direction: cops and robbers
function copsRobbersDirection() {
	ctx.textAlign = "center";
	ctx.fillStyle = 'black';
	ctx.font = "25px Arial";
	ctx.fillText("Let's See if the Cops Can Catch", canvas.width/2, 35);
	ctx.fillText("the Robber Before They Find the Gems", canvas.width/2, 80);
}

//drawing cops: cops and robbers
function drawStationaryCops() {
	ctx.fillStyle = 'rgb(56, 152, 236)';
	ctx.fillRect(202, 277, 46, 46);
	ctx.fillRect(302, 377, 46, 46);
}

//first direction for multi face simulations (Cubic Exterior)
function multiDirectionOne() {
	ctx.textAlign = "center";
	ctx.fillStyle = 'black';
	ctx.font = "25px Arial";
	ctx.fillText("Please Select a Starting Position", canvas.width/2, 35);
}

//second direction for multi face simulations (Cubic Exterior)
function multiDirectionTwo() {
	ctx.textAlign = "center";
	ctx.fillStyle = 'black';
	ctx.font = "25px Arial";
	ctx.fillText("Please Select a Target Position", canvas.width/2, 35);
}

//third direction for multi face simulations (Cubic Exterior)
function multiDirectionThree() {
	ctx.textAlign = "center";
	ctx.fillStyle = 'black';
	ctx.font = "25px Arial";
	ctx.fillText("Please Enjoy the Simulation", canvas.width/2, 35);
}

//drawing first page 
function drawPageOne() { 
 	ctx.textAlign = "center";
	ctx.fillStyle = 'black';
	ctx.font = "25px Arial";
	ctx.fillText("Hello and Welcome to Random Walk", canvas.width/2, 70);
	ctx.fillText("Developed By John Delucia", canvas.width/2, 130);
	ctx.fillStyle = 'rgb(56, 152, 236)';
	ctx.fillRect(210, 263, 180, 60);
	ctx.fillStyle = 'white';
	ctx.fillRect(215, 268, 170, 50);
	ctx.fillStyle = 'black';
	ctx.fillText("Begin", canvas.width/2, 300);
 }

//drawing home page where user selects type of simulation
function drawPageTwo() { 
	ctx.textAlign = "center";
	ctx.fillStyle = 'black';
	ctx.font = "25px Arial";
	//titles
	ctx.fillText("Please Select the Type of Random Walk", canvas.width/2, 50);
	ctx.fillText("Singular Face", canvas.width/4, 130);
	ctx.fillText("Cubic Exterior", canvas.width*3/4, 130);
	ctx.fillText("Cops + Robbers", canvas.width*3/4, 420);
	//underlining  titles
	ctx.beginPath();
	ctx.moveTo(50, 145);
	ctx.lineTo(250, 145);
	ctx.moveTo(350, 145);
	ctx.lineTo(550, 145);
	ctx.moveTo(350, 435);
	ctx.lineTo(550, 435);
	ctx.stroke();
	ctx.lineWidth = 1.5;
	//Heading with Target Finding
	ctx.fillStyle = 'rgb(56, 152, 236)';
	ctx.fillRect(50, 180, 200, 60);
	ctx.fillStyle = 'white';
	ctx.fillRect(55, 185, 190, 50);
	ctx.fillStyle = 'black';
	ctx.textAlign = "center";
	ctx.fillText("Heading: P(0.5)", canvas.width/4, 220);
	//Target Finding With Obstacles
	ctx.fillStyle = 'rgb(56, 152, 236)';
	ctx.fillRect(50, 280, 200, 60);
	ctx.fillStyle = 'white';
	ctx.fillRect(55, 285, 190, 50);
	ctx.fillStyle = 'black';
	ctx.textAlign = "center";
	ctx.fillText("Obstacles", canvas.width/4, 320);
	//No Backtracking
	ctx.fillStyle = 'rgb(56, 152, 236)';
	ctx.fillRect(50, 380, 200, 60);
	ctx.fillStyle = 'white';
	ctx.fillRect(55, 385, 190, 50);
	ctx.fillStyle = 'black';
	ctx.textAlign = "center";
	ctx.fillText("No Backtracking", canvas.width/4, 420);
	//Grid Filling
	ctx.fillStyle = 'rgb(56, 152, 236)';
	ctx.fillRect(50, 480, 200, 60);
	ctx.fillStyle = 'white';
	ctx.fillRect(55, 485, 190, 50);
	ctx.fillStyle = 'black';
	ctx.textAlign = "center";
	ctx.fillText("Grid Filling", canvas.width/4, 520);
	//Cubic Exterior Target Finding
	ctx.fillStyle = 'rgb(56, 152, 236)';
	ctx.fillRect(350, 180, 200, 60);
	ctx.fillStyle = 'white';
	ctx.fillRect(355, 185, 190, 50);
	ctx.fillStyle = 'black';
	ctx.textAlign = "center";
	ctx.fillText("Target Finding", canvas.width*3/4, 220);
	//Cubic Exterior Grid Filling
	ctx.fillStyle = 'rgb(56, 152, 236)';
	ctx.fillRect(350, 280, 200, 60);
	ctx.fillStyle = 'white';
	ctx.fillRect(355, 285, 190, 50);
	ctx.fillStyle = 'black';
	ctx.textAlign = "center";
	ctx.fillText("Grid Filling", canvas.width*3/4, 320);
	//Cops and Robbers
	ctx.fillStyle = 'rgb(56, 152, 236)';
	ctx.fillRect(350, 480, 200, 60);
	ctx.fillStyle = 'white';
	ctx.fillRect(355, 485, 190, 50);
	ctx.fillStyle = 'black';
	ctx.textAlign = "center";
	ctx.fillText("Play!", canvas.width*3/4, 520);
}

//first direction used for all single faced simulations on 8x8 grid
function directionOne() { 
	ctx.textAlign = "center";
	ctx.fillStyle = 'black';
	ctx.font = "25px Arial";
	ctx.fillText("Please Select a Starting Position", canvas.width/2, 70);
	ctx.beginPath();
	ctx.moveTo(50, 90);
	ctx.lineTo(550, 90);
	ctx.lineWidth = 1.5;
	ctx.stroke();
}

//search node movement for headed simulation
function headedMovement() {
	if (currentPos.x > targetPos.x) { //move left toward target
		return 0;
	} else if (currentPos.x < targetPos.x) { //move right toward target
		return 1;
	} else if (currentPos.y < targetPos.y) { //move down
		return 2;
	} else {
		return 3;
	}
}

//no backtracking: determines if the search node is surrounded meaning it collides with itself
function checkIfSurrounded() {
	for (let i = 0; i < 64; i++) { //run through all 64 squares
		if (currentPos.x == 100) { //if search node is in the left most column
			if (currentPos.y == 125) { //if search node is in top left corner square
				if (arrayOfRects[i].x == 150 && arrayOfRects[i].y == 125 && arrayOfRects[i].walls == 1) {  //if square directly right of the search node has been visited
					surroundedBy++;
				} else if (arrayOfRects[i].x == 100 && arrayOfRects[i].y == 175 && arrayOfRects[i].walls == 1) { //if square directly below the search node has been visited
					surroundedBy++;
				} else if (arrayOfRects[i].x == 100 && arrayOfRects[i].y == 475 && arrayOfRects[i].walls == 1) { //if square directly above the search node (bottom left of grid) has been visited
					surroundedBy++;
				} else if (arrayOfRects[i].x == 450 && arrayOfRects[i].y == 125 && arrayOfRects[i].walls == 1) { //if square directly left of the search node (top right of grid) has been visited
					surroundedBy++;
				}
			} else if (currentPos.y == 475) { //if search node is in bottom left corner square
				if (arrayOfRects[i].x == 150 && arrayOfRects[i].y == 475 && arrayOfRects[i].walls == 1) { 
					surroundedBy++;
				} else if (arrayOfRects[i].x == 100 && arrayOfRects[i].y == 425 && arrayOfRects[i].walls == 1) {
					surroundedBy++;
				} else if (arrayOfRects[i].x == 100 && arrayOfRects[i].y == 125 && arrayOfRects[i].walls == 1) {
					surroundedBy++;
				} else if (arrayOfRects[i].x == 450 && arrayOfRects[i].y == 475 && arrayOfRects[i].walls == 1) {
					surroundedBy++;
				}
			} else { //if search node is in the left most column but is not a corner square
				if (currentPos.x + 50 == arrayOfRects[i].x && currentPos.y == arrayOfRects[i].y && arrayOfRects[i].walls == 1) {
					surroundedBy++;
				} else if (arrayOfRects[i].x == 100 && currentPos.y - 50 == arrayOfRects[i].y && arrayOfRects[i].walls == 1) {
					surroundedBy++;
				} else if (arrayOfRects[i].x == 100 && currentPos.y + 50 == arrayOfRects[i].y && arrayOfRects[i].walls == 1) {
					surroundedBy++;
				} else if (arrayOfRects[i].x == 450 && currentPos.y == arrayOfRects[i].y  && arrayOfRects[i].walls == 1) {
					surroundedBy++;
				}
			}
		}
		else if (currentPos.x == 450) { //if search node is in the right most column
			if (currentPos.y == 125) { //if search node is in the top right corner square
				if (arrayOfRects[i].x == 400 && arrayOfRects[i].y == 125 && arrayOfRects[i].walls == 1) {
					surroundedBy++;
				} else if (arrayOfRects[i].x == 450 && arrayOfRects[i].y == 175 && arrayOfRects[i].walls == 1) {
					surroundedBy++;
				} else if (arrayOfRects[i].x == 450 && arrayOfRects[i].y == 475 && arrayOfRects[i].walls == 1) {
					surroundedBy++;
				} else if (arrayOfRects[i].x == 100 && arrayOfRects[i].y == 125 && arrayOfRects[i].walls == 1) {
					surroundedBy++;
				}
			} else if (currentPos.y == 475) { //if search node is in the bottom right corner square
				if (arrayOfRects[i].x ==  400 && arrayOfRects[i].y == 475 && arrayOfRects[i].walls == 1) {
					surroundedBy++;
				} else if (arrayOfRects[i].x == 450 && arrayOfRects[i].y == 425 && arrayOfRects[i].walls == 1) {
					surroundedBy++;
				} else if (arrayOfRects[i].x == 450 && arrayOfRects[i].y == 125 && arrayOfRects[i].walls == 1) {
					surroundedBy++;
				} else if (arrayOfRects[i].x == 100 && arrayOfRects[i].y == 475 && arrayOfRects[i].walls == 1) {
					surroundedBy++;
				}
			} else { //if search node is in the right most column but is not a corner square
				if (currentPos.x - 50 == arrayOfRects[i].x && currentPos.y == arrayOfRects[i].y && arrayOfRects[i].walls == 1) {
					surroundedBy++;
				} else if (arrayOfRects[i].x == 450 && currentPos.y - 50 == arrayOfRects[i].y && arrayOfRects[i].walls == 1) {
					surroundedBy++;
				} else if (arrayOfRects[i].x == 450 && currentPos.y + 50 == arrayOfRects[i].y && arrayOfRects[i].walls == 1) {
					surroundedBy++;
				} else if (arrayOfRects[i].x == 100 && currentPos.y == arrayOfRects[i].y  && arrayOfRects[i].walls == 1) {
					surroundedBy++;
				}
			}
		} else if (currentPos.y == 125) { //if search node is in the top row but is not a corner square (already checked)
			if (currentPos.x - 50 == arrayOfRects[i].x && currentPos.y == arrayOfRects[i].y && arrayOfRects[i].walls == 1) {
				surroundedBy++;
			} else if (currentPos.x + 50 == arrayOfRects[i].x && currentPos.y == arrayOfRects[i].y && arrayOfRects[i].walls == 1) {
				surroundedBy++;
			} else if (currentPos.x == arrayOfRects[i].x && currentPos.y + 50 == arrayOfRects[i].y && arrayOfRects[i].walls == 1) {
				surroundedBy++;
			} else if (currentPos.x == arrayOfRects[i].x && arrayOfRects[i].y == 475  && arrayOfRects[i].walls == 1) {
				surroundedBy++;
			}
		} else if (currentPos.y == 475) { //if search node is in the bottom row but is not a corner square (already checked)
			if (currentPos.x - 50 == arrayOfRects[i].x && currentPos.y == arrayOfRects[i].y && arrayOfRects[i].walls == 1) {
				surroundedBy++;
			} else if (currentPos.x + 50 == arrayOfRects[i].x && currentPos.y == arrayOfRects[i].y && arrayOfRects[i].walls == 1) {
				surroundedBy++;
			} else if (currentPos.x == arrayOfRects[i].x && currentPos.y - 50 == arrayOfRects[i].y && arrayOfRects[i].walls == 1) {
				surroundedBy++;
			} else if (currentPos.x == arrayOfRects[i].x && arrayOfRects[i].y == 125  && arrayOfRects[i].walls == 1) {
				surroundedBy++;
			}
		} else { //if search node is not in a bounding square (somewhere inside the grid)
			if (currentPos.x == arrayOfRects[i].x && currentPos.y  == arrayOfRects[i].y - 50 && arrayOfRects[i].walls == 1) {
				surroundedBy++;
			} else if (currentPos.x == arrayOfRects[i].x && currentPos.y  == arrayOfRects[i].y + 50 && arrayOfRects[i].walls == 1) {
				surroundedBy++;
			} else if (currentPos.y == arrayOfRects[i].y && currentPos.x == arrayOfRects[i].x - 50 && arrayOfRects[i].walls == 1) {
				surroundedBy++;
			} else if (currentPos.y == arrayOfRects[i].y && currentPos.x == arrayOfRects[i].x + 50 && arrayOfRects[i].walls == 1) {
				surroundedBy++;
			}
		}
	}
	if (surroundedBy == 4) { //if search node is completely surrounded
		surroundedBy = 0; //reset surrounded by
		return true; 
	} else {
		surroundedBy = 0; 
		return false; 
	}
}

//direction to place obstacles in 'Obstacles'
function pageFourDirectionTwo() {
	ctx.textAlign = "center";
	ctx.fillStyle = 'black';
	ctx.font = "25px Arial";
	ctx.fillText("Please Place Some Obstacles in the Grid", canvas.width/2, 45);
	ctx.fillStyle = 'rgb(56, 152, 236)';
 	ctx.fillRect(startSimulation.x, startSimulation.y, startSimulation.w, startSimulation.h);
 	ctx.fillStyle = 'white';
 	ctx.fillRect(startSimulation.x+5, startSimulation.y+5, startSimulation.w-10, startSimulation.h-10);
 	ctx.fillStyle = 'black';
	ctx.fillText("Done", canvas.width/2, 90);
}

//direction to select a target position: used in 'Heading', 'Obstacles', 'No Backtracking', 'Target Finding'
function selectTarget() {
	ctx.textAlign = "center";
	ctx.fillStyle = 'black';
	ctx.font = "25px Arial";
	ctx.fillText("Please Select a Target Position", canvas.width/2, 70);
	ctx.beginPath();
	ctx.moveTo(50, 90);
	ctx.lineTo(550, 90);
	ctx.lineWidth = 1.5;
	ctx.stroke();
}

//direction to enjoy the simulation used in all simulations
function enjoySimulation() {
	ctx.textAlign = "center";
	ctx.fillStyle = 'black';
	ctx.font = "25px Arial";
	ctx.fillText("Please Enjoy the Simulation", canvas.width/2, 70);
	ctx.beginPath();
	ctx.moveTo(50, 90);
	ctx.lineTo(550, 90);
	ctx.lineWidth = 1.5;
	ctx.stroke();
}

function drawTemporaryMessage() {
	ctx.textAlign = "center";
	ctx.fillStyle = 'black';
	ctx.font = "25px Arial";
	ctx.fillText("This Simulation is Still Being Developed", canvas.width/2, 45);
	ctx.fillStyle = 'rgb(56, 152, 236)';
 	ctx.fillRect(startSimulation.x-5, startSimulation.y-5, startSimulation.w+10, startSimulation.h+10);
 	ctx.fillStyle = 'white';
 	ctx.fillRect(startSimulation.x, startSimulation.y, startSimulation.w, startSimulation.h);
 	ctx.fillStyle = 'black';
	ctx.fillText("Return", canvas.width/2, 90);
}
//reset all obstacles and visited squares to unvisited (set to 0)
function clearWalls() {
	for (let i = 0; i < 64; i++) {
		arrayOfRects[i].walls = 0;
		arrayOfRects[i].hit = 0;
	}
}

//check if obstacle is hit by search node
function checkWallHit(x, y) {
	for (let i = 0; i < 64; i++) {
		if (arrayOfRects[i].x == x && arrayOfRects[i].y == y && arrayOfRects[i].walls == 1) {
			return true;
		}
	}
	return false;
}

//if a square is visited it becomes an obstacle and cannot be revisited: used in no backtracking
function noBackTracking(x, y) {
	for (let i = 0; i < 64; i++) {
		if (arrayOfRects[i].x == x && arrayOfRects[i].y == y) {
			arrayOfRects[i].walls = 1;
		}
	}
}

//check if the grid is filled in 8x8 simulation
function checkGridFilled() {
	for (let i = 0; i < 64; i++) {
		if (arrayOfRects[i].hit == 0) {
			return false;
		}
	}
	return true;
}

//check if the grids are filled in Cubic Exterior simulation
function checkGridFilledMulti() {
	for (let i = 0; i < 54; i++) {
		if (arrayOfRectsMulti[i].hit == 0) {
			return false;
		}
	}
	return true;
}

//if search node finds the target node return true
function checkCollisionOnTarget() {
	return (currentPos.x == targetPos.x) && (currentPos.y == targetPos.y);
}

//clear all walls, reset to homepage, reset count to 0
function reset() {
	clearWalls();
	directions = 1;
	page = 2;
	count = 0;
}

//reset everything from cubic exterior simulations
function resetMulti() {
	for (let i = 0; i < 54; i++) {
		arrayOfRectsMulti[i].hit = 0;
	}
	directions = 1;
	page = 2;
	count = 0;
}

//draws 8x8 grid used for 'Headed', 'Obstacles', 'No Backtracking', and 'Grid Filling Simulations'
function drawBox() {
	for (let i = 0; i <= 8; i++) {
		ctx.beginPath();
		ctx.moveTo(100, 125 + (i*50));
		ctx.lineTo(500, 125 + (i*50));
		ctx.moveTo(100 + (50*i), 125);
		ctx.lineTo(100 + (50*i), 525);
		ctx.strokeStyle = 'black';
		ctx.lineWidth = 1.5;
		ctx.stroke();
	}
}

//declare and initialize current pos
var currentPos = {
	x: 0,
	y: 0,
	w: 50,
	h: 50
};

//declare and initialize target pos
var targetPos = {
	x: 0,
	y: 0,
	w: 50,
	h: 50
};

//draw target node for 8x8 grid simulations
function drawTargetPos() {
	ctx.fillStyle = 'orange';
	ctx.fillRect(targetPos.x + 2, targetPos.y + 2, 46, 46);
}

//draw target node for cubic exterior simulations
function drawMultiTargetPos() {
	ctx.fillStyle = 'orange';
	ctx.fillRect(targetPos.x + 1, targetPos.y + 1, 18, 18);
}

//draw search node for 8x8 grid simulations
function drawCurrentPosition(x, y) {
	ctx.fillStyle = 'rgb(56, 152, 236)';
	ctx.fillRect(x + 2, y + 2, 46, 46);
}

//draw search node for cubic exterior simulations
function drawCurrentMultiPosition(x, y) {
	ctx.fillStyle = 'rgb(56, 152, 236)';
	ctx.fillRect(x + 1, y + 1, 18, 18);
}

//draw starting position for 8x8 grid simulations
function drawStartingPosition() {
	ctx.fillStyle = 'rgb(56, 152, 236)';
	ctx.fillRect(currentPos.x + 2, currentPos.y + 2, 46, 46);
}

//draw starting position for cubic exterior simulations
function drawMultiStartingPosition() {
	ctx.fillStyle = 'rgb(56, 152, 236)';
	ctx.fillRect(currentPos.x + 1, currentPos.y + 1, 18, 18);
}

//draw user entered obstacles: used in 8x8 'Grid Filling' and 'Obstacles' 
function drawWalls() {
	for (let i = 0; i < 64; i++) {
		if (arrayOfRects[i].walls == 1) {
			ctx.fillStyle = 'black';
			ctx.fillRect(arrayOfRects[i].x + 2, arrayOfRects[i].y + 2, 46, 46);
		}
	}
}

//draw labels for cubic exterior simulations
function drawLabels() {
	ctx.font = "22px Arial"
	ctx.textAlign = "center";
	ctx.fillStyle = 'rgb(56, 152, 236)';
	ctx.fillText("Top", canvas.width/2, 70);
	ctx.fillText("Front", canvas.width/2, 190);
	ctx.fillText("Bottom", canvas.width/2, 310);
	ctx.fillText("Back", canvas.width/2, 430);
	ctx.fillText("Left", 135, 190);
	ctx.fillText("Right", 465, 190);
}

//draw top of cube used in cubic exterior simulations
function drawTop() {
	for (let i = 0; i < 4; i++) {
		ctx.beginPath();
		ctx.moveTo(start, 80 + i * 20);
		ctx.lineTo(start + 60, 80 + i * 20);
		ctx.moveTo(start + i*20, 80);
		ctx.lineTo(start + i*20, 140);
		ctx.strokeStyle = 'black';
		ctx.lineWidth = 1.5;
		ctx.stroke();
	}
}

//draw front of cube used in cubic exterior simulations
function drawFront() {
	for (let i = 0; i < 4; i++) {
		ctx.beginPath();
		ctx.moveTo(start, 200 + i * 20);
		ctx.lineTo(start + 60, 200 + i * 20);
		ctx.moveTo(start + i*20, 200);
		ctx.lineTo(start + i*20, 260);
		ctx.strokeStyle = 'black';
		ctx.lineWidth = 1.5;
		ctx.stroke();
	}
}

//draw bottom of cube used in cubic exterior simulations
function drawBottom() {
	for (let i = 0; i < 4; i++) {
		ctx.beginPath();
		ctx.moveTo(start, 320 + i * 20);
		ctx.lineTo(start + 60, 320 + i * 20);
		ctx.moveTo(start + i*20, 320);
		ctx.lineTo(start + i*20, 380);
		ctx.strokeStyle = 'black';
		ctx.lineWidth = 1.5;
		ctx.stroke();
	}
}

//draw back of cube used in cubic exterior simulations
function drawBack() {
	for (let i = 0; i < 4; i++) {
		ctx.beginPath();
		ctx.moveTo(start, 440 + i * 20);
		ctx.lineTo(start + 60, 440 + i * 20);
		ctx.moveTo(start + i*20, 440);
		ctx.lineTo(start + i*20, 500);
		ctx.strokeStyle = 'black';
		ctx.lineWidth = 1.5;
		ctx.stroke();
	}
}

//draw left side of cube used in cubic exterior simulations
function drawLeft() {
	for (let i = 0; i < 4; i++) {
		ctx.beginPath();
		ctx.moveTo(start - 165, 200 + i * 20);
		ctx.lineTo(start - 165 + 60, 200 + i * 20);
		ctx.moveTo(start - 165 + i*20, 200);
		ctx.lineTo(start - 165 + i*20, 260);
		ctx.strokeStyle = 'black';
		ctx.lineWidth = 1.5;
		ctx.stroke();
	}
}

//draw right side of cube used in cubic exterior simulations
function drawRight() {
	for (let i = 0; i < 4; i++) {
		ctx.beginPath();
		ctx.moveTo(start + 165, 200 + i * 20);
		ctx.lineTo(start + 165 + 60, 200 + i * 20);
		ctx.moveTo(start + 165 + i*20, 200);
		ctx.lineTo(start + 165 + i*20, 260);
		ctx.strokeStyle = 'black';
		ctx.lineWidth = 1.5;
		ctx.stroke();
	}
}

//declare and initialize rectangle
var rect = {
    x: 0,
    y: 0,
    w: 50,
    h: 50,
    walls: 0,
    hit: 0
};

//trace path taken by the search node: used in 'Grid Filling' simulations
function tracePath(x, y) {
	for (let i = 0; i < 54; i++) {
		if (arrayOfRectsMulti[i].x == x && arrayOfRectsMulti[i].y == y) {
			arrayOfRectsMulti[i].hit = 1;
			return;
		}
	}
}

//find the side tha the search node is on: used in cubic exterior simulations
function findSide(x, y) {
	//top
	if (x >= start && x <= start + 60 && y >= 80 && y <= 140) {
		return 0;
	}
	//front
	else if (x >= start && x <= start + 60 && y >= 200 && y <= 260) {
		return 1;
	}
	//bottom
	else if (x >= start && x <= start + 60 && y >= 320 && y <= 380) {
		return 2;
	}
	//back
	else if (x >= start && x <= start + 60 && y >= 440 && y <= 500) {
		return 3;
	}
	//left side
	else if (x >= (start-165) && x <= (start-165) + 60 && y >= 200 && y <= 260) {
		return 4;
	}
	//right side
	else if (x >= (start+165) && x <= (start+165) + 60 && y >= 200 && y <= 260) {
		return 5;
	}
}

//function used to change the position of the search node in 8x8 grid simulations
function changePos() {
	var movement = (Math.floor(Math.random() * 4)); //generate random integer between 0 and 3
	if (page == 3) { //if running headed simulation
		if (movement == 0 || movement == 1) { //50% of the time the search node moves toward the target
			var movement = headedMovement();
		}
	}
	if (page == 5) { //if running no backtracking simulation
		if (checkIfSurrounded()) { //check if search node is surrounded to avoid infinite loop
			alert("Object collided with itself before finding the target after " + count + " moves");
			reset();
		}
	}
	if (movement == 0) { //move left
		if (currentPos.x == 100) { //if search node is in the far left column
			currentPos.x = 450;
			if (!checkWallHit(currentPos.x, currentPos.y)) { //if search node does not hit an obstacle increase count: only applicable for 'Obstacles' ang 'Grid Filling' on 8x8
				count++;
			} else { //if search node does collide with an obstacle change its position
				currentPos.x = 100;
				changePos();
			}
		} else { //if search node is not in the left most column
			currentPos.x -= 50;
			if (!checkWallHit(currentPos.x, currentPos.y)) {
				count++;
			} else {
				currentPos.x += 50;
				changePos();
			}
		}
	}
	else if (movement == 1) { //move right
		if (currentPos.x == 450) { //if search node is in the far right column
			currentPos.x = 100;
			if (!checkWallHit(currentPos.x, currentPos.y)) {
				count++;
			} else {
				currentPos.x = 450;
				changePos();
			}
		} else { //if search node is not in the far right column
			currentPos.x += 50;
			if (!checkWallHit(currentPos.x, currentPos.y)) {
				count++;
			} else {
				currentPos.x -= 50;
				changePos();
			}
		}
	}
	else if (movement == 2) { //move down
		if (currentPos.y == 475) { //if search node is in the bottom row of the grid
			currentPos.y = 125;
			if (!checkWallHit(currentPos.x, currentPos.y)) {
				count++;
			} else {
				currentPos.y = 475;
				changePos();
			}
		} else { //if the search node is not in the bottom row of the grid
			currentPos.y += 50;
			if (!checkWallHit(currentPos.x, currentPos.y)) {
				count++;
			} else {
				currentPos.y -= 50;
				changePos();
			}
		}
	}
	else  { //move up
		if (currentPos.y == 125) { //if the search node is in the top row of the grid
			currentPos.y = 475;
			if (!checkWallHit(currentPos.x, currentPos.y)) {
				count++;
			} else {
				currentPos.y = 125;
				changePos();
			}
		} else { //if the search node is not in the top row of the grid 
			currentPos.y -= 50;
			if (!checkWallHit(currentPos.x, currentPos.y)) {
				count++;
			} else {
				currentPos.y += 50;
				changePos();
			}
		}
	}
	if (page == 6) { //if running a grid filling simulation on 8x8 grid
		for (let i = 0; i < 64; i++) {
			if (currentPos.x == arrayOfRects[i].x && currentPos.y == arrayOfRects[i].y) { //keep track of all squares visited by the search node
				arrayOfRects[i].hit = 1;
			}
		}
	}
}

//changing position of the search node on cubic exterior simulations
function changePosMulti() {
	var movement = (Math.floor(Math.random() * 4)); //generate random integer between 0 and 3
	
	if (findSide(currentPos.x, currentPos.y) == 0) { //if search node is on the top face of the cube
		if (movement == 0) { //move left
			if (currentPos.x == 270 && currentPos.y == 80) { //if search node is in the top left corner
				currentPos.x = 105;
				currentPos.y = 200;
			} 
			else if (currentPos.x == 270 && currentPos.y == 100) { //if search node is in the left column middle position
				currentPos.x = 125;
				currentPos.y = 200;

			}
			else if (currentPos.x == 270 && currentPos.y == 120) { //if search node is in the bottom left corner
				currentPos.x = 145;
				currentPos.y = 200;
			}
			else { //if search node is not in the left column
				currentPos.x -= 20;
			}
		}
		else if (movement == 1) { //move right
			if (currentPos.x == 310 && currentPos.y == 80) { //if search node is in the top right corner
				currentPos.x = 475;
				currentPos.y = 200;
			} 
			else if (currentPos.x == 310 && currentPos.y == 100) { //if search node is in the right most column middle position
				currentPos.x = 455;
				currentPos.y = 200;

			}
			else if (currentPos.x == 310 && currentPos.y == 120) { //if search node is in the bottom right corner
				currentPos.x = 435;
				currentPos.y = 200;
			}
			else { //if search node is not in the right most column
				currentPos.x += 20;
			}
		}
		else if (movement == 2) { //move down
			if (currentPos.y == 120) { //if search node is in the bottom row
				currentPos.y = 200;
			} else { //if search node is not in the bottom row
				currentPos.y += 20;
			}
		}
		else  { //move up
			if (currentPos.y == 80) { //if search node is in the bottom row
				currentPos.y = 480;
			} else { //if search node is not in the bottom row
				currentPos.y -= 20;
			}
		}
	}

	else if (findSide(currentPos.x, currentPos.y) == 1) { //if search node is on the front face of the cube
		if (movement == 0) { //move left
			if (currentPos.x == 270) {
				currentPos.x = 145;
			} else {
				currentPos.x = currentPos.x - 20;
			}
		}
		else if (movement == 1) { //move right
			if (currentPos.x == 310) {
				currentPos.x = start + 165;
			} else {
				currentPos.x += 20;
			}
		}
		else if (movement == 2) { //move down
			if (currentPos.y == 240) {
				currentPos.y = 320;
			} else {
				currentPos.y += 20;
			}
		}
		else  { //move up
			if (currentPos.y == 200) {
				currentPos.y = 120;
			} else {
				currentPos.y -= 20;
			}
		}
	}
	else if (findSide(currentPos.x, currentPos.y) == 2) { //if search node is on the bottom face of the cube
		if (movement == 0) { //move left
			if (currentPos.x == 270 && currentPos.y == 320) {
				currentPos.x = 145;
				currentPos.y = 240;
			} 
			else if (currentPos.x == 270 && currentPos.y == 340) {
				currentPos.x = 125;
				currentPos.y = 240;

			}
			else if (currentPos.x == 270 && currentPos.y == 360) {
				currentPos.x = 105;
				currentPos.y = 240;
			}
			else {
				currentPos.x -= 20;
			}
		}
		else if (movement == 1) { //move right
			if (currentPos.x == 310 && currentPos.y == 320) {
				currentPos.x = 435;
				currentPos.y = 240;
			} 
			else if (currentPos.x == 310 && currentPos.y == 340) {
				currentPos.x = 455;
				currentPos.y = 240;

			}
			else if (currentPos.x == 310 && currentPos.y == 360) {
				currentPos.x = 475;
				currentPos.y = 240;
			}
			else {
				currentPos.x += 20;
			}
		}
		else if (movement == 2) { //move down
			if (currentPos.y == 360) {
				currentPos.y = 440;
			} else {
				currentPos.y += 20;
			}
		}
		else  { //move up
			if (currentPos.y == 320) {
				currentPos.y = 240;
			} else {
				currentPos.y -= 20;
			}
		}
	}
	else if (findSide(currentPos.x, currentPos.y) == 3) { //if search node is on the back face of the cube
		if (movement == 0) { //move left
			if (currentPos.x == 270) {
				currentPos.x = 475;
				currentPos.y -= 240;
			} else {
				currentPos.x -= 20;
			}
		}
		else if (movement == 1) { //move right
			if (currentPos.x == 310) {
				currentPos.x = 105;
				currentPos.y -= 240;
			} else {
				currentPos.x += 20;
			}
		}
		else if (movement == 2) { //move down
			if (currentPos.y == 480) {
				currentPos.y = 80;
			} else {
				currentPos.y += 20;
			}
		}
		else  { //move up
			if (currentPos.y == 440) {
				currentPos.y = 360;
			} else {
				currentPos.y -= 20;
			}
		}
	}
	else if (findSide(currentPos.x, currentPos.y) == 4) { //if search node is on the left face of the cube
		if (movement == 0) { //move left
			if (currentPos.x == 105) {
				currentPos.x = 310;
				currentPos.y += 240
			} else {
				currentPos.x = currentPos.x - 20;
			}
		}
		else if (movement == 1) { //move right
			if (currentPos.x == 145) {
				currentPos.x = 270;
			} else {
				currentPos.x += 20;
			}
		}
		else if (movement == 2) { //move down
			if (currentPos.y == 240 && currentPos.x == 145) {
				currentPos.y = 320;
				currentPos.x = 270;
			} else if (currentPos.y == 240 && currentPos.x == 125) {
				currentPos.y = 340;
				currentPos.x = 270;
			} else if (currentPos.y == 240 && currentPos.x == 105) {
				currentPos.y = 360;
				currentPos.x = 270;
			} else {
				currentPos.y += 20;
			}
		}
		else { //move up
			if (currentPos.y == 200 && currentPos.x == 105) {
				currentPos.y = 80;
				currentPos.x = 270;
			}
			else if (currentPos.y == 200 && currentPos.x == 125) {
				currentPos.y = 100;
				currentPos.x = 270;
			}
			else if (currentPos.y == 200 && currentPos.x == 145) {
				currentPos.y = 120;
				currentPos.x = 270;
			} 
			else {
				currentPos.y -= 20;
			}
		}
		
	}
	else { //if search node is on the right face of the cube
		if (movement == 0) { //move left
			if (currentPos.x == 435) {
				currentPos.x = 310;
			} else {
				currentPos.x -= 20;
			}
		}
		else if (movement == 1) { //move right
			if (currentPos.x == 475) {
				currentPos.x = 270;
				currentPos.y += 240;
			} else {
				currentPos.x += 20;
			}
		}
		else if (movement == 2) { //move down
			if (currentPos.y == 240 && currentPos.x == 435) {
				currentPos.y = 320;
				currentPos.x = 310;
			} else if (currentPos.y == 240 && currentPos.x == 455) {
				currentPos.y = 340;
				currentPos.x = 310
			} else if (currentPos.y == 240 && currentPos.x == 475) {
				currentPos.y = 360;
				currentPos.x = 310;
			} else {
				currentPos.y += 20;
			}
		}
		else  { //move up
			if (currentPos.y == 200 && currentPos.x == 435) {
				currentPos.y = 120;
				currentPos.x = 310;
			}
			else if (currentPos.y == 200 && currentPos.x == 455) {
				currentPos.y = 100;
				currentPos.x = 310;
			}
			else if (currentPos.y == 200 && currentPos.x == 475) {
				currentPos.y = 80;
				currentPos.x = 310;
			} 
			else {
				currentPos.y -= 20;
			}
		}
	}
	count++; //increase the count of moves by 1
	tracePath(currentPos.x, currentPos.y); //keep track of all visited squares
		
}

//declare and initialize rectangle used for cubic exterior simulations
var rectMulti = {
    x: canvas.width/2 - 40,
    y: 80,
    w: 20,
    h: 20,
    hit: 0
};

//fill array of rectangles used in cubic exterior simulations with all 54 grid positions
function fillMultiRect() {
	for (let i = 0; i < 54; i++) {
	//top face, first row
	if (i <= 2) {
		rectMulti.x = start + i*20;
		rectMulti.y = 80;
	}
	//top face, second row
	else if (i <= 5) {
		rectMulti.x = start + (i - 3) * 20;
		rectMulti.y = 100;
	}
	//top face, third row
	else if(i <= 8) {
		rectMulti.x = start + (i - 6) * 20;
		rectMulti.y = 120;
	}

	//front face, first row
	else if (i <= 11) {
		rectMulti.x = start + (i - 9) * 20;
		rectMulti.y = 200;
	}
	//front face, second row
	else if (i <= 14) {
		rectMulti.x = start + (i - 12) * 20;
		rectMulti.y = 220;
	}
	//front face, third row
	else if(i <= 17) {
		rectMulti.x = start + (i - 15) * 20;
		rectMulti.y = 240;
	}
	//bottom face, first row
	else if (i <= 20) {
		rectMulti.x = start + (i - 18) * 20;
		rectMulti.y = 320;
	}
	//bottom face, second row
	else if (i <= 23) {
		rectMulti.x = start + (i - 21) * 20;
		rectMulti.y = 340;
	}
	//bottom face, third row
	else if(i <= 26) {
		rectMulti.x = start + (i - 24) * 20;
		rectMulti.y = 360;
	}
	//back face, first row
	else if (i <= 29) {
		rectMulti.x = start + (i - 27) *20;
		rectMulti.y = 440;
	}
	//back face, second row
	else if (i <= 32) {
		rectMulti.x = start + (i - 30) * 20;
		rectMulti.y = 460;
	}
	//back face, third row
	else if(i <= 35) {
		rectMulti.x = start + (i - 33) * 20;
		rectMulti.y = 480;
	}
	//left face, first row
	else if (i <= 38) {
		rectMulti.x = (start - 165)+ (i - 36) * 20;
		rectMulti.y = 200;
	}
	//left face, second row
	else if (i <= 41) {
		rectMulti.x = (start - 165) + (i - 39) * 20;
		rectMulti.y = 220;
	}
	//left face, third row
	else if(i <= 44) {
		rectMulti.x = (start - 165) + (i - 42) * 20;
		rectMulti.y = 240;
	}
	//right face, first row
	else if (i <= 47) {
		rectMulti.x = (start + 165) + (i - 45) *20;
		rectMulti.y = 200;
	}
	//right face, second row
	else if (i <= 50) {
		rectMulti.x = (start + 165) + (i - 48) * 20;
		rectMulti.y = 220;
	}
	//right face, third row
	else if(i <= 53) {
		rectMulti.x = (start + 165) + (i - 51) * 20;
		rectMulti.y = 240;
	}
	//initialize each array index with a specific rectangle (each with a unique position) 
	arrayOfRectsMulti[i] = { 
		x: rectMulti.x,
		y: rectMulti.y,
		w: 20,
		h: 20,
		hit: 0
	};
	}
}

fillMultiRect(); //fill rectangle array used for cubic exterior simulations
	
var arrayOfRects = []; // array of rectangles used for 8x8 grid

//get mouse positon: record location of the user click
function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return { //return the position of the users click within the bounds of the canvas 
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

//fill array of rectangles used in 8x8 grid simulations with all 64 grid positions
function fillRectArray() {
	for (let i = 0; i < 64; i++) {
		//first row
		if (i < 8) {
			rect.x = 100 + i * 50;
			rect.y = 125;
		}
		//second row
		else if (i < 16) {
			rect.x = 100 + (i - 8) * 50;
			rect.y = 175;
		}
		//third row
		else if(i < 24) {
			rect.x = 100 + (i - 16) * 50;
			rect.y = 225;
		}

		//fourth row
		else if (i < 32) {
			rect.x = 100 + (i - 24) * 50;
			rect.y = 275;
		}
		//fifth row
		else if (i < 40) {
			rect.x = 100 + (i - 32) * 50;
			rect.y = 325;
		}
		//sixth row
		else if (i < 48) {
			rect.x = 100 + (i - 40) * 50;
			rect.y = 375;
		}
		//seventh row
		else if (i < 56) {
			rect.x = 100 + (i - 48) * 50;
			rect.y = 425;
		}
		//eight row
		else {
			rect.x = 100 + (i - 56) * 50;
			rect.y = 475;
		}
		//initialize each array index with a specific rectangle (each with a unique position) 
		arrayOfRects[i] = {
			x: rect.x,
			y: rect.y,
			w: 50,
			h: 50, 
			walls: 0,
			hit: 0
		};
	}
}

fillRectArray(); //fill rectangle array used for 8x8 grid simulations

//check if the mouse click is inside a rectangle
function isInside(pos, rect){
    return pos.x > rect.x && pos.x < rect.x+rect.w && pos.y < rect.y + rect.h && pos.y > rect.y;
}

//event listener detects user clicks 
canvas.addEventListener('click', function(evt) {
    var mousePos = getMousePos(canvas, evt);//get the position of the users click

    if (page == 1 && isInside(mousePos, begin)) { //if user clicks begin move to page 2
    	page = 2;
    }
    else if (page == 2 && isInside(mousePos, headed)) { //if user clicks 'Headed' move to headed simulation
    	page = 3;
    }
    else if (page == 2 && isInside(mousePos, obstacles)) { //if user clicks 'Obstacles' move to obstacle simulation
    	page = 4;
    }
    else if (page == 2 && isInside(mousePos, backtracking)) { //if user clicks 'No Backtracking' move to no backtracking simulation
    	page = 5;
    }
    else if (page == 2 && isInside(mousePos, gridFilling)) { //if user clicks 'Grid Filling' move to grid filling simulation for 8x8 grid
    	reset(); 
    	page = 6;
    }
    else if (page == 2 && isInside(mousePos, targetFinding)) { //if user clicks 'Target Finding' move to target finding simulation on cubic exterior grid
    	page = 7;
    }
    else if (page == 2 && isInside(mousePos, gridFillingMulti)) { //if user clicks 'Grid Filling' move to grid filling simulation on cubic exterior grid
    	page = 8;
    }
    else if (page == 2 && isInside(mousePos, copsAndRobbers)) { // if user clicks 'Cops + Robbers' move to cops and robbers simulation on 8x8 grid
    	page = 9;
    }
    else if (page == 3) { //headed simulation
    	for (let i = 0; i < 64; i++) {
    		if (directions == 1 && isInside(mousePos,arrayOfRects[i])) { //select start position for search node
     				currentPos.x = arrayOfRects[i].x;
     				currentPos.y = arrayOfRects[i].y;
     				directions = 2;
     		} else if (directions == 2 && isInside(mousePos,arrayOfRects[i])) { //select target position
     				targetPos.x = arrayOfRects[i].x;
     				targetPos.y = arrayOfRects[i].y;
     				directions = 3;
     		}
     	}
    }

    else if (page == 4) { //obstacles simulation
    	for (let i = 0; i < 64; i++) {
    		if (directions == 1 && isInside(mousePos,arrayOfRects[i])) { //select starting position for search node
     				currentPos.x = arrayOfRects[i].x;
     				currentPos.y = arrayOfRects[i].y;
     				directions = 2;
     		} 
     		else if (directions == 2 && isInside(mousePos, arrayOfRects[i])) { //select obstacle positions
   	 				arrayOfRects[i].walls = 1;
    		}
    		else if (directions == 2 && isInside(mousePos, startSimulation)) { //select done when finished with placing obstacles
    				directions = 3;
    		}
     		else if (directions == 3 && isInside(mousePos,arrayOfRects[i])) { //select target position
     				targetPos.x = arrayOfRects[i].x;
     				targetPos.y = arrayOfRects[i].y;
     				directions = 4;
     		}
     	}
    }
    else if (page == 5) { //no backtracking simulation
    	for (let i = 0; i < 64; i++) {
    		if (directions == 1 && isInside(mousePos,arrayOfRects[i])) { //select starting position for search node 
     				currentPos.x = arrayOfRects[i].x;
     				currentPos.y = arrayOfRects[i].y;
     				directions = 2;
     		} 
     		else if (directions == 2 && isInside(mousePos,arrayOfRects[i])) { //select target position
     				targetPos.x = arrayOfRects[i].x;
     				targetPos.y = arrayOfRects[i].y;
     				directions = 3;
     		}
     	}
    }

    else if(page == 6) { //grid filling simulation on an 8x8 grid
    	for (let i = 0; i < 64; i++) {
    		if (directions == 1 && isInside(mousePos,arrayOfRects[i])) { //select starting position
     				currentPos.x = arrayOfRects[i].x;
     				currentPos.y = arrayOfRects[i].y;
     				directions = 2;
     		} 
     		else if (directions == 2 && isInside(mousePos, arrayOfRects[i])) { //select obstacle positions
   	 				arrayOfRects[i].walls = 1;
   	 				arrayOfRects[i].hit = 1;
    		}
    		else if (directions == 2 && isInside(mousePos, startSimulation)) { //select target position
    					directions = 3;
    		}
     	}
    }
    else if (page == 7) { //target finding simulation on cubic exterior grid
    	for (let i = 0; i < 54; i++) {
    		if (isInside(mousePos, arrayOfRectsMulti[i]) && directions == 1) { //select starting position for search node
    				startIndex = i;
    				currentPos.x = arrayOfRectsMulti[i].x;
    				currentPos.y = arrayOfRectsMulti[i].y;
        			directions = 2;
    		}
    		else if (isInside(mousePos, arrayOfRectsMulti[i]) && directions == 2) { //select target position
    		 	targetPos.x = arrayOfRectsMulti[i].x;
    		 	targetPos.y = arrayOfRectsMulti[i].y;
    		 	directions = 3;
    	 	}
    	}
    }
    else if (page == 8) { //grid filling simulation on cubic exterior grid
    	for (let i = 0; i < 54; i++) {
    		if (isInside(mousePos, arrayOfRectsMulti[i]) && directions == 1) { //select starting position for search node
    				startIndex = i;
    				currentPos.x = arrayOfRectsMulti[i].x;
    				currentPos.y = arrayOfRectsMulti[i].y;
        			directions = 2;
    		}
    	}
    }
    else if (page == 9) { //allow user to return to home page
    	if (isInside(mousePos, returnMessage)) {
    		page = 2;
    	}
    }

}, false);

drawBox(); //draw 8x8 grid

//function that will continually be called throughout the progeram
function update() {
	
	//draw welcome and begin page
	if (page == 1) {
		ctx.clearRect(0, 0, 600, 600);
		drawPageOne();
	}

	//draw select random walk type page
	else if (page == 2) {
		ctx.clearRect(0, 0, 600, 600);
		drawPageTwo();
	}

	//please select starting position
	else if ((page == 3 && directions == 1) || 
		(page == 4 && directions == 1) || 
		(page == 5 && directions == 1) || 
		(page == 6 && directions == 1)) {
			ctx.clearRect(0, 0, 600, 600);
			drawBox();
			directionOne();
	}

	//heading simulation: select target position
	else if (page == 3 && directions == 2) {
		ctx.clearRect(0, 0, 600, 120);
		drawStartingPosition();
		selectTarget();
	}

	//heading simulation: enjoy simulation
	else if (page == 3 && directions == 3) {
		ctx.clearRect(0, 0, 600, 120);
		ctx.clearRect(currentPos.x + 1, currentPos.y + 1, 48, 48); //clear previous rectangle as we don't want to show objects path taken
		if (checkCollisionOnTarget() == true) { //check if search node finds the target 
			alert("Target hit after " + count + " moves");
			reset();
		}
		enjoySimulation();
		drawTargetPos();
		changePos();
		drawCurrentPosition(currentPos.x, currentPos.y);
	}

	//obstacle simulation: ask user to draw obstacles and select done when finished
	else if (page == 4 && directions == 2) {
		ctx.clearRect(0, 0, 600, 120);
		drawStartingPosition();
		pageFourDirectionTwo();
		drawWalls();
	}

	//obstacle simulation: select target position
	else if (page == 4 && directions == 3) {
		ctx.clearRect(0, 0, 600, 120);
		selectTarget();
		drawStartingPosition();
	}

	//obstacle simulation: enjoy the simulation
	else if (page == 4 && directions == 4) {
		ctx.clearRect(0, 0, 600, 120);
		ctx.clearRect(currentPos.x + 1, currentPos.y + 1, 48, 48);
		if (checkCollisionOnTarget() == true) {
			alert("Target hit after " + count + " moves");
			reset();
		}
		enjoySimulation();
		drawTargetPos();
		changePos();
		drawWalls();
		drawCurrentPosition(currentPos.x, currentPos.y);
	}

	//no backtracking simulation: select a target position
	else if (page == 5 && directions == 2) {
		ctx.clearRect(0, 0, 600, 120);
		selectTarget();
		drawStartingPosition();
	}

	//no backtracking simulation: enjoy simulation
	else if (page == 5 && directions == 3) {
		ctx.clearRect(0, 0, 600, 120);
		enjoySimulation();
		drawTargetPos();
		if (checkCollisionOnTarget() == true) {
			alert("Target hit after " + count + " moves");
			reset();
		}
		changePos();
		noBackTracking(currentPos.x, currentPos.y); //check if search node is completely surounded: if all nodes to its left, right, top, and bottom have been visited
		drawCurrentPosition(currentPos.x, currentPos.y);
	}
	//grid filling simulation on an 8x8 grid: ask user to draw obstacles and select done when finished
	else if (page == 6 && directions == 2) {
		ctx.clearRect(0, 0, 600, 120);
		drawStartingPosition();
		pageFourDirectionTwo();
		drawWalls();
	}
	//grid filling simulation on an 8x8 grid: enjoy simulation
	else if (page == 6 && directions == 3) {
		ctx.clearRect(0, 0, 600, 120);
		if (checkGridFilled()) {
			alert("Grid filled after " + count + " moves");
			reset();
		}
		enjoySimulation();
		changePos();
		drawWalls();
		drawCurrentPosition(currentPos.x, currentPos.y);
	}
	//target finding simulation on cubic exterior grid: select starting position for search node
	else if (page == 7 && directions == 1) {
		ctx.clearRect(0, 0, 600, 600)
		multiDirectionOne();
		drawTop();
		drawFront();
		drawBottom();
		drawBack();
		drawLeft();
		drawRight();
		drawLabels();
	}
	//target finding simulation on cubic exterior grid: select target position
	else if (page == 7 && directions == 2) {
		ctx.clearRect(0, 0, 600, 50);
		multiDirectionTwo();
		drawMultiStartingPosition();
	}
	//target finding simulation on cubic exterior grid: enjoy simulation
	else if (page == 7 && directions == 3) {
		ctx.clearRect(0, 0, 600, 50);
		drawMultiTargetPos();
		multiDirectionThree();
		if (checkCollisionOnTarget()) {
			alert("Target hit after " + count + " moves");
			directions = 4;
		}
		ctx.clearRect(currentPos.x + 1, currentPos.y + 1, 18, 18);
		changePosMulti();
		drawCurrentMultiPosition(currentPos.x, currentPos.y);
	}
	//target finding simulation on cubic exterior grid: trace path taken
	else if (page == 7 && directions == 4) {
		ctx.clearRect(0, 0, 600, 50);
		ctx.fillStyle = 'green';
		ctx.fillRect(arrayOfRectsMulti[startIndex].x, arrayOfRectsMulti[startIndex].y, 20, 20);
		for (i = 0; i < arrayOfRectsMulti.length; i++) {
			if (arrayOfRectsMulti[i].hit == 1) {
				ctx.fillRect(arrayOfRectsMulti[i].x, arrayOfRectsMulti[i].y, 20, 20);
			}
		}
		directions = 5;
	}
	//target finding simulation on cubic exterior grid: this was your path taken message
	else if (page == 7 && directions == 5) {
		alert("This Was the Path Taken");
		resetMulti();
	}
	//grid filling simulation on cubic exterior grid: select starting position
	else if (page == 8 && directions == 1) {
		ctx.clearRect(0, 0, 600, 600)
		multiDirectionOne();
		drawTop();
		drawFront();
		drawBottom();
		drawBack();
		drawLeft();
		drawRight();
		drawLabels();
	}
	//grid filling simulation on cubic exterior grid: enjoy simulation
	else if (page == 8 && directions == 2) {
		ctx.clearRect(0, 0, 600, 50);
		multiDirectionThree();
		if (checkGridFilledMulti()) {
			alert("Grid Filled After " + count + " Moves");
			resetMulti();
		}
		changePosMulti();
		drawCurrentMultiPosition(currentPos.x, currentPos.y);
	}
	//cops and robbers: lets see who will win cops or robbers
	 else if (page == 9 && directions == 1) {
	 	ctx.clearRect(0, 0, 600, 600);
	 	drawTemporaryMessage();
	 	drawBox();
	 	//copsRobbersDirection();
	 	//drawStationaryCops();
	}

	requestAnimationFrame(update); //continually calls update function, allows us to complete animations
}

update(); //call update function

