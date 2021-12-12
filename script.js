const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

var directions = 1;
var page = 1;
var count = 0;
var surroundedBy = 0;
var startIndex;

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

const start = canvas.width/2 - 30;

var arrayOfRectsMulti = [];

function copsRobbersDirection() {
	ctx.textAlign = "center";
	ctx.fillStyle = 'black';
	ctx.font = "25px Arial";
	ctx.fillText("Let's See if the Cops Can Catch", canvas.width/2, 35);
	ctx.fillText("the Robber Before They Find the Gems", canvas.width/2, 80);
}

function drawStationaryCops() {
	ctx.fillStyle = 'rgb(56, 152, 236)';
	ctx.fillRect(202, 277, 46, 46);
	ctx.fillRect(302, 377, 46, 46);
}

function multiDirectionOne() {
	ctx.textAlign = "center";
	ctx.fillStyle = 'black';
	ctx.font = "25px Arial";
	ctx.fillText("Please Select a Starting Position", canvas.width/2, 35);
}

function multiDirectionTwo() {
	ctx.textAlign = "center";
	ctx.fillStyle = 'black';
	ctx.font = "25px Arial";
	ctx.fillText("Please Select a Target Position", canvas.width/2, 35);
}

function multiDirectionThree() {
	ctx.textAlign = "center";
	ctx.fillStyle = 'black';
	ctx.font = "25px Arial";
	ctx.fillText("Please Enjoy the Simulation", canvas.width/2, 35);
}

function drawPageOne() { //Home Page
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

function drawPageTwo() { //Select Random Walk Type
	ctx.textAlign = "center";
	ctx.fillStyle = 'black';
	ctx.font = "25px Arial";
	ctx.fillText("Please Select the Type of Random Walk", canvas.width/2, 50);
	ctx.fillText("Singular Face", canvas.width/4, 130);
	ctx.fillText("Cubic Exterior", canvas.width*3/4, 130);
	ctx.fillText("Cops + Robbers", canvas.width*3/4, 420);
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

function directionOne() { //Select Random Walk Type
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

function checkIfSurrounded() {
	for (let i = 0; i < 64; i++) {
		if (currentPos.x == 100) {
			if (currentPos.y == 125) { //Top left corner square
				if (arrayOfRects[i].x == 150 && arrayOfRects[i].y == 125 && arrayOfRects[i].walls == 1) {
					surroundedBy++;
				} else if (arrayOfRects[i].x == 100 && arrayOfRects[i].y == 175 && arrayOfRects[i].walls == 1) {
					surroundedBy++;
				} else if (arrayOfRects[i].x == 100 && arrayOfRects[i].y == 475 && arrayOfRects[i].walls == 1) {
					surroundedBy++;
				} else if (arrayOfRects[i].x == 450 && arrayOfRects[i].y == 125 && arrayOfRects[i].walls == 1) {
					surroundedBy++;
				}
			} else if (currentPos.y == 475) { //Bottom left corner square
				if (arrayOfRects[i].x == 150 && arrayOfRects[i].y == 475 && arrayOfRects[i].walls == 1) {
					surroundedBy++;
				} else if (arrayOfRects[i].x == 100 && arrayOfRects[i].y == 425 && arrayOfRects[i].walls == 1) {
					surroundedBy++;
				} else if (arrayOfRects[i].x == 100 && arrayOfRects[i].y == 125 && arrayOfRects[i].walls == 1) {
					surroundedBy++;
				} else if (arrayOfRects[i].x == 450 && arrayOfRects[i].y == 475 && arrayOfRects[i].walls == 1) {
					surroundedBy++;
				}
			} else {
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
		else if (currentPos.x == 450) {
			if (currentPos.y == 125) { //Top right corner square
				if (arrayOfRects[i].x == 400 && arrayOfRects[i].y == 125 && arrayOfRects[i].walls == 1) {
					surroundedBy++;
				} else if (arrayOfRects[i].x == 450 && arrayOfRects[i].y == 175 && arrayOfRects[i].walls == 1) {
					surroundedBy++;
				} else if (arrayOfRects[i].x == 450 && arrayOfRects[i].y == 475 && arrayOfRects[i].walls == 1) {
					surroundedBy++;
				} else if (arrayOfRects[i].x == 100 && arrayOfRects[i].y == 125 && arrayOfRects[i].walls == 1) {
					surroundedBy++;
				}
			} else if (currentPos.y == 475) { //Bottom right corner square
				if (arrayOfRects[i].x ==  400 && arrayOfRects[i].y == 475 && arrayOfRects[i].walls == 1) {
					surroundedBy++;
				} else if (arrayOfRects[i].x == 450 && arrayOfRects[i].y == 425 && arrayOfRects[i].walls == 1) {
					surroundedBy++;
				} else if (arrayOfRects[i].x == 450 && arrayOfRects[i].y == 125 && arrayOfRects[i].walls == 1) {
					surroundedBy++;
				} else if (arrayOfRects[i].x == 100 && arrayOfRects[i].y == 475 && arrayOfRects[i].walls == 1) {
					surroundedBy++;
				}
			} else { //Non corner border squares
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
		} else if (currentPos.y == 125) {
			if (currentPos.x - 50 == arrayOfRects[i].x && currentPos.y == arrayOfRects[i].y && arrayOfRects[i].walls == 1) {
				surroundedBy++;
			} else if (currentPos.x + 50 == arrayOfRects[i].x && currentPos.y == arrayOfRects[i].y && arrayOfRects[i].walls == 1) {
				surroundedBy++;
			} else if (currentPos.x == arrayOfRects[i].x && currentPos.y + 50 == arrayOfRects[i].y && arrayOfRects[i].walls == 1) {
				surroundedBy++;
			} else if (currentPos.x == arrayOfRects[i].x && arrayOfRects[i].y == 475  && arrayOfRects[i].walls == 1) {
				surroundedBy++;
			}
		} else if (currentPos.y == 475) {
			if (currentPos.x - 50 == arrayOfRects[i].x && currentPos.y == arrayOfRects[i].y && arrayOfRects[i].walls == 1) {
				surroundedBy++;
			} else if (currentPos.x + 50 == arrayOfRects[i].x && currentPos.y == arrayOfRects[i].y && arrayOfRects[i].walls == 1) {
				surroundedBy++;
			} else if (currentPos.x == arrayOfRects[i].x && currentPos.y - 50 == arrayOfRects[i].y && arrayOfRects[i].walls == 1) {
				surroundedBy++;
			} else if (currentPos.x == arrayOfRects[i].x && arrayOfRects[i].y == 125  && arrayOfRects[i].walls == 1) {
				surroundedBy++;
			}
		} else {
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
	if (surroundedBy == 4) {
		surroundedBy = 0;
		return true;
	} else {
		surroundedBy = 0;
		return false;
	}
}



function pageThreeDirectionTwo() {
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

function drawSecondDirection() {
	ctx.textAlign = "center";
	ctx.fillStyle = 'black';
	ctx.font = "25px Arial";
	ctx.fillText("Please Place Some Obstacles in the Grid", canvas.width/2, 45);
 	ctx.fillRect(startSimulation.x, startSimulation.y, startSimulation.w, startSimulation.h);
 	ctx.fillStyle = 'white';
 	ctx.fillRect(startSimulation.x+5, startSimulation.y+5, startSimulation.w-10, startSimulation.h-10);
 	ctx.fillStyle = 'black';
	ctx.fillText("Done", canvas.width/2, 90)
}

function drawThirdDirection() {
	ctx.textAlign = "center";
	ctx.fillStyle = 'black';
	ctx.font = "25px Arial";
	ctx.fillText("Please Select a Target", canvas.width/2, 70);
}

function drawFourthDirection() {
	ctx.textAlign = "center";
	ctx.fillStyle = 'black';
	ctx.font = "25px Arial";
	ctx.fillText("Enjoy the Simulation!", canvas.width/2, 70);
}

function clearWalls() {
	for (let i = 0; i < 64; i++) {
		arrayOfRects[i].walls = 0;
		arrayOfRects[i].hit = 0;
	}
}

function checkWallHit(x, y) {
	for (let i = 0; i < 64; i++) {
		if (arrayOfRects[i].x == x && arrayOfRects[i].y == y && arrayOfRects[i].walls == 1) {
			return true;
		}
	}
	return false;
}

function noBackTracking(x, y) {
	for (let i = 0; i < 64; i++) {
		if (arrayOfRects[i].x == x && arrayOfRects[i].y == y) {
			arrayOfRects[i].walls = 1;
		}
	}
}

function checkGridFilled() {
	for (let i = 0; i < 64; i++) {
		if (arrayOfRects[i].hit == 0) {
			return false;
		}
	}
	return true;
}

function checkGridFilledMulti() {
	for (let i = 0; i < 54; i++) {
		if (arrayOfRectsMulti[i].hit == 0) {
			return false;
		}
	}
	return true;
}


function checkCollisionOnTarget() {
	return (currentPos.x == targetPos.x) && (currentPos.y == targetPos.y);
}

function reset() {
	clearWalls();
	directions = 1;
	page = 2;
	count = 0;
}

function resetMulti() {
	for (let i = 0; i < 54; i++) {
		arrayOfRectsMulti[i].hit = 0;
	}
	directions = 1;
	page = 2;
	count = 0;
}

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

var currentPos = {
	x: 0,
	y: 0,
	w: 50,
	h: 50
};

var targetPos = {
	x: 0,
	y: 0,
	w: 50,
	h: 50
};

function drawTargetPos() {
	ctx.fillStyle = 'orange';
	ctx.fillRect(targetPos.x + 2, targetPos.y + 2, 46, 46);
}

function drawMultiTargetPos() {
	ctx.fillStyle = 'orange';
	ctx.fillRect(targetPos.x + 1, targetPos.y + 1, 18, 18);
}

function drawCurrentPosition(x, y) {
	ctx.fillStyle = 'rgb(56, 152, 236)';
	ctx.fillRect(x + 2, y + 2, 46, 46);
}

function drawCurrentMultiPosition(x, y) {
	ctx.fillStyle = 'rgb(56, 152, 236)';
	ctx.fillRect(x + 1, y + 1, 18, 18);
}

function drawStartingPosition() {
	ctx.fillStyle = 'rgb(56, 152, 236)';
	ctx.fillRect(currentPos.x + 2, currentPos.y + 2, 46, 46);
}

function drawMultiStartingPosition() {
	ctx.fillStyle = 'rgb(56, 152, 236)';
	ctx.fillRect(currentPos.x + 1, currentPos.y + 1, 18, 18);
}

function drawWalls() {
	for (let i = 0; i < 64; i++) {
		if (arrayOfRects[i].walls == 1) {
			ctx.fillStyle = 'black';
			ctx.fillRect(arrayOfRects[i].x + 2, arrayOfRects[i].y + 2, 46, 46);
		}
	}
}

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

var rect = {
    x: 0,
    y: 0,
    w: 50,
    h: 50,
    walls: 0,
    hit: 0
};

function tracePath(x, y) {
	for (let i = 0; i < 54; i++) {
		if (arrayOfRectsMulti[i].x == x && arrayOfRectsMulti[i].y == y) {
			arrayOfRectsMulti[i].hit = 1;
			return;
		}
	}
}

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
	//left
	else if (x >= (start-165) && x <= (start-165) + 60 && y >= 200 && y <= 260) {
		return 4;
	}
	//right
	else if (x >= (start+165) && x <= (start+165) + 60 && y >= 200 && y <= 260) {
		return 5;
	}
}


function changePos() {
	var movement = (Math.floor(Math.random() * 4));
	if (page == 3) {
		if (movement == 0 || movement == 1) {
			var movement = headedMovement();
		}
	}
	if (page == 5) {
		if (checkIfSurrounded()) {
			alert("Object collided with itself before finding the target after " + count + " moves");
			reset();
		}
	}
	if (movement == 0) { //move left
		if (currentPos.x == 100) {
			currentPos.x = 450;
			if (!checkWallHit(currentPos.x, currentPos.y)) {
				count++;
			} else {
				currentPos.x = 100;
				changePos();
			}
		} else {
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
		if (currentPos.x == 450) {
			currentPos.x = 100;
			if (!checkWallHit(currentPos.x, currentPos.y)) {
				count++;
			} else {
				currentPos.x = 450;
				changePos();
			}
		} else {
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
		if (currentPos.y == 475) {
			currentPos.y = 125;
			if (!checkWallHit(currentPos.x, currentPos.y)) {
				count++;
			} else {
				currentPos.y = 475;
				changePos();
			}
		} else {
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
		if (currentPos.y == 125) {
			currentPos.y = 475;
			if (!checkWallHit(currentPos.x, currentPos.y)) {
				count++;
			} else {
				currentPos.y = 125;
				changePos();
			}
		} else {
			currentPos.y -= 50;
			if (!checkWallHit(currentPos.x, currentPos.y)) {
				count++;
			} else {
				currentPos.y += 50;
				changePos();
			}
		}
	}
	if (page == 6) {
		for (let i = 0; i < 64; i++) {
			if (currentPos.x == arrayOfRects[i].x && currentPos.y == arrayOfRects[i].y) {
				arrayOfRects[i].hit = 1;
			}
		}
	}
}

function changePosMulti() {
	var movement = (Math.floor(Math.random() * 4));
	
	if (findSide(currentPos.x, currentPos.y) == 0) { //top
		if (movement == 0) { //move left
			if (currentPos.x == 270 && currentPos.y == 80) {
				currentPos.x = 105;
				currentPos.y = 200;
			} 
			else if (currentPos.x == 270 && currentPos.y == 100) {
				currentPos.x = 125;
				currentPos.y = 200;

			}
			else if (currentPos.x == 270 && currentPos.y == 120) {
				currentPos.x = 145;
				currentPos.y = 200;
			}
			else {
				currentPos.x -= 20;
			}
		}
		else if (movement == 1) { //move right
			if (currentPos.x == 310 && currentPos.y == 80) {
				currentPos.x = 475;
				currentPos.y = 200;
			} 
			else if (currentPos.x == 310 && currentPos.y == 100) {
				currentPos.x = 455;
				currentPos.y = 200;

			}
			else if (currentPos.x == 310 && currentPos.y == 120) {
				currentPos.x = 435;
				currentPos.y = 200;
			}
			else {
				currentPos.x += 20;
			}
		}
		else if (movement == 2) { //move down
			if (currentPos.y == 120) {
				currentPos.y = 200;
			} else {
				currentPos.y += 20;
			}
		}
		else  { //move up
			if (currentPos.y == 80) {
				currentPos.y = 480;
			} else {
				currentPos.y -= 20;
			}
		}
	}

	else if (findSide(currentPos.x, currentPos.y) == 1) { //face 
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
	else if (findSide(currentPos.x, currentPos.y) == 2) { //bottom 
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
	else if (findSide(currentPos.x, currentPos.y) == 3) { //back
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
	else if (findSide(currentPos.x, currentPos.y) == 4) { //left 
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
	else { //right 
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
	count++;
	tracePath(currentPos.x, currentPos.y);
		
}

var rectMulti = {
    x: canvas.width/2 - 40,
    y: 80,
    w: 20,
    h: 20,
    hit: 0
};

function fillMultiRect() {
	for (let i = 0; i < 54; i++) {
	//top, first row
	if (i <= 2) {
		rectMulti.x = start + i*20;
		rectMulti.y = 80;
	}
	//top, second row
	else if (i <= 5) {
		rectMulti.x = start + (i - 3) * 20;
		rectMulti.y = 100;
	}
	//top, third row
	else if(i <= 8) {
		rectMulti.x = start + (i - 6) * 20;
		rectMulti.y = 120;
	}

	//front, first row
	else if (i <= 11) {
		rectMulti.x = start + (i - 9) * 20;
		rectMulti.y = 200;
	}
	//front, second row
	else if (i <= 14) {
		rectMulti.x = start + (i - 12) * 20;
		rectMulti.y = 220;
	}
	//front, third row
	else if(i <= 17) {
		rectMulti.x = start + (i - 15) * 20;
		rectMulti.y = 240;
	}
	//bottom, first row
	else if (i <= 20) {
		rectMulti.x = start + (i - 18) * 20;
		rectMulti.y = 320;
	}
	//bottom, second row
	else if (i <= 23) {
		rectMulti.x = start + (i - 21) * 20;
		rectMulti.y = 340;
	}
	//bottom, third row
	else if(i <= 26) {
		rectMulti.x = start + (i - 24) * 20;
		rectMulti.y = 360;
	}
	//back, first row
	else if (i <= 29) {
		rectMulti.x = start + (i - 27) *20;
		rectMulti.y = 440;
	}
	//back, second row
	else if (i <= 32) {
		rectMulti.x = start + (i - 30) * 20;
		rectMulti.y = 460;
	}
	//back, third row
	else if(i <= 35) {
		rectMulti.x = start + (i - 33) * 20;
		rectMulti.y = 480;
	}
	//left, first row
	else if (i <= 38) {
		rectMulti.x = (start - 165)+ (i - 36) * 20;
		rectMulti.y = 200;
	}
	//left, second row
	else if (i <= 41) {
		rectMulti.x = (start - 165) + (i - 39) * 20;
		rectMulti.y = 220;
	}
	//left, third row
	else if(i <= 44) {
		rectMulti.x = (start - 165) + (i - 42) * 20;
		rectMulti.y = 240;
	}
	//right, first row
	else if (i <= 47) {
		rectMulti.x = (start + 165) + (i - 45) *20;
		rectMulti.y = 200;
	}
	//right, second row
	else if (i <= 50) {
		rectMulti.x = (start + 165) + (i - 48) * 20;
		rectMulti.y = 220;
	}
	//right, third row
	else if(i <= 53) {
		rectMulti.x = (start + 165) + (i - 51) * 20;
		rectMulti.y = 240;
	}
	arrayOfRectsMulti[i] = {
		x: rectMulti.x,
		y: rectMulti.y,
		w: 20,
		h: 20,
		hit: 0
	};
	}
}

fillMultiRect();
	
var arrayOfRects = [];

function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

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

fillRectArray();


function isInside(pos, rect){
    return pos.x > rect.x && pos.x < rect.x+rect.w && pos.y < rect.y + rect.h && pos.y > rect.y;
}

canvas.addEventListener('click', function(evt) {
    var mousePos = getMousePos(canvas, evt);

    if (page == 1 && isInside(mousePos, begin)) {
    	page = 2;
    }
    else if (page == 2 && isInside(mousePos, headed)) {
    	page = 3;
    }
    else if (page == 2 && isInside(mousePos, obstacles)) {
    	page = 4;
    }
    else if (page == 2 && isInside(mousePos, backtracking)) {
    	page = 5;
    }
    else if (page == 2 && isInside(mousePos, gridFilling)) {
    	reset();
    	page = 6;
    }
    else if (page == 2 && isInside(mousePos, targetFinding)) {
    	page = 7;
    }
    else if (page == 2 && isInside(mousePos, gridFillingMulti)) {
    	page = 8;
    }
    else if (page == 2 && isInside(mousePos, copsAndRobbers)) {
    	page = 9;
    }
    else if (page == 3) {
    	for (let i = 0; i < 64; i++) {
    		if (directions == 1 && isInside(mousePos,arrayOfRects[i])) {
     				currentPos.x = arrayOfRects[i].x;
     				currentPos.y = arrayOfRects[i].y;
     				directions = 2;
     		} else if (directions == 2 && isInside(mousePos,arrayOfRects[i])) {
     				targetPos.x = arrayOfRects[i].x;
     				targetPos.y = arrayOfRects[i].y;
     				directions = 3;
     		}
     	}
    }

    else if (page == 4) {
    	for (let i = 0; i < 64; i++) {
    		if (directions == 1 && isInside(mousePos,arrayOfRects[i])) {
     				currentPos.x = arrayOfRects[i].x;
     				currentPos.y = arrayOfRects[i].y;
     				directions = 2;
     		} 
     		else if (directions == 2 && isInside(mousePos, arrayOfRects[i])) {
   	 				arrayOfRects[i].walls = 1;
    		}
    		else if (directions == 2 && isInside(mousePos, startSimulation)) {
    				directions = 3;
    		}
     		else if (directions == 3 && isInside(mousePos,arrayOfRects[i])) {
     				targetPos.x = arrayOfRects[i].x;
     				targetPos.y = arrayOfRects[i].y;
     				directions = 4;
     		}
     	}
    }
    else if (page == 5) {
    	for (let i = 0; i < 64; i++) {
    		if (directions == 1 && isInside(mousePos,arrayOfRects[i])) {
     				currentPos.x = arrayOfRects[i].x;
     				currentPos.y = arrayOfRects[i].y;
     				directions = 2;
     		} 
     		else if (directions == 2 && isInside(mousePos,arrayOfRects[i])) {
     				targetPos.x = arrayOfRects[i].x;
     				targetPos.y = arrayOfRects[i].y;
     				directions = 3;
     		}
     	}
    }

    else if(page == 6) {
    	for (let i = 0; i < 64; i++) {
    		if (directions == 1 && isInside(mousePos,arrayOfRects[i])) {
     				currentPos.x = arrayOfRects[i].x;
     				currentPos.y = arrayOfRects[i].y;
     				directions = 2;
     		} 
     		else if (directions == 2 && isInside(mousePos, arrayOfRects[i])) {
   	 				arrayOfRects[i].walls = 1;
   	 				arrayOfRects[i].hit = 1;
    		}
    		else if (directions == 2 && isInside(mousePos, startSimulation)) {
    					directions = 3;
    		}
     	}
    }
    else if (page == 7) {
    	for (let i = 0; i < 54; i++) {
    		if (isInside(mousePos, arrayOfRectsMulti[i]) && directions == 1) {
    				startIndex = i;
    				currentPos.x = arrayOfRectsMulti[i].x;
    				currentPos.y = arrayOfRectsMulti[i].y;
        			directions = 2;
    		}
    		else if (isInside(mousePos, arrayOfRectsMulti[i]) && directions == 2) {
    		 	targetPos.x = arrayOfRectsMulti[i].x;
    		 	targetPos.y = arrayOfRectsMulti[i].y;
    		 	directions = 3;
    	 	}
    	}
    }
    else if (page == 8) {
    	for (let i = 0; i < 54; i++) {
    		if (isInside(mousePos, arrayOfRectsMulti[i]) && directions == 1) {
    				startIndex = i;
    				currentPos.x = arrayOfRectsMulti[i].x;
    				currentPos.y = arrayOfRectsMulti[i].y;
        			directions = 2;
    		}
    	}
    }

}, false);

drawBox();


function update() {
	
	//Page 1: Welcome and Begin button
	if (page == 1) {
		ctx.clearRect(0, 0, 600, 600);
		drawPageOne();
	}

	//Page 2: Select Random Walk Type
	else if (page == 2) {
		ctx.clearRect(0, 0, 600, 600);
		drawPageTwo();
	}

	//Select Starting Position for all Pages
	else if ((page == 3 && directions == 1) || 
		(page == 4 && directions == 1) || 
		(page == 5 && directions == 1) || 
		(page == 6 && directions == 1)) {
			ctx.clearRect(0, 0, 600, 600);
			drawBox();
			directionOne();
	}

	//Page 3: Starting position
	else if (page == 3 && directions == 2) {
		ctx.clearRect(0, 0, 600, 120);
		drawStartingPosition();
		pageThreeDirectionTwo();
	}

	else if (page == 3 && directions == 3) {
		ctx.clearRect(0, 0, 600, 120);
		ctx.clearRect(currentPos.x + 1, currentPos.y + 1, 48, 48);
		if (checkCollisionOnTarget() == true) {
			alert("Target hit after " + count + " moves");
			reset();
		}
		enjoySimulation();
		drawTargetPos();
		changePos();
		drawCurrentPosition(currentPos.x, currentPos.y);
	}

	//Page 4: Starting Position/Ask user to draw obstacles
	else if (page == 4 && directions == 2) {
		ctx.clearRect(0, 0, 600, 120);
		drawStartingPosition();
		pageFourDirectionTwo();
		drawWalls();
	}

	else if (page == 4 && directions == 3) {
		ctx.clearRect(0, 0, 600, 120);
		selectTarget();
		drawStartingPosition();
	}

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

	//Page 5: Startiing Position

	else if (page == 5 && directions == 2) {
		ctx.clearRect(0, 0, 600, 120);
		selectTarget();
		drawStartingPosition();
	}

	else if (page == 5 && directions == 3) {
		ctx.clearRect(0, 0, 600, 120);
		enjoySimulation();
		drawTargetPos();
		if (checkCollisionOnTarget() == true) {
			alert("Target hit after " + count + " moves");
			reset();
		}
		changePos();
		noBackTracking(currentPos.x, currentPos.y);
		drawCurrentPosition(currentPos.x, currentPos.y);
	}



	//Page 6: Starting Position/Ask user to draw obstacles
	else if (page == 6 && directions == 2) {
		ctx.clearRect(0, 0, 600, 120);
		drawStartingPosition();
		pageFourDirectionTwo();
		drawWalls();
	}

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

	//Page 7: Basic target finding on multiple surface 
	else if (page == 5 && directions == 2) {
		ctx.clearRect(0, 0, 600, 120);
		selectTarget();
		drawStartingPosition();
	}
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
	else if (page == 7 && directions == 2) {
		ctx.clearRect(0, 0, 600, 50);
		multiDirectionTwo();
		drawMultiStartingPosition();
	}
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
	else if (page == 7 && directions == 5) {
		alert("This Was the Path Taken");
		resetMulti();
	}

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

	 else if (page == 9 && directions == 1) {
	 	ctx.clearRect(0, 0, 600, 600);
	 	drawBox();
	 	copsRobbersDirection();
	 	drawStationaryCops();
	 }

	requestAnimationFrame(update);
}

update();















