// 
//JQuery 
// 
$(document).ready(function(){
    $(".icon-bg").click(function () {
        $(".btn").toggleClass("active");
        $(".icon-bg").toggleClass("active");
        $(".container").toggleClass("active");
        $(".box-upload").toggleClass("active");
        $(".box-caption").toggleClass("active");
        $(".box-tags").toggleClass("active");
        $(".private").toggleClass("active");
        $(".set-time-limit").toggleClass("active");
        $(".button").toggleClass("active");
    });

    $(".button").click(function () {
        $(".button-overlay").toggleClass("active");
    });

    $(".iconmelon").click(function () {
        $(".box-upload-ing").toggleClass("active");
        $(".iconmelon-loaded").toggleClass("active");
    });

    $(".private").click(function () {
        $(".private-overlay").addClass("active");
        $(".private-overlay-wave").addClass("active");
    });
});

// 
//  Constants
// 

// 
//	Variables
// 

let snakeLength = 0;
let snakeMaxLength = 3;
let board, direction, snakeHead, foodLocation, foodTime, timeoutID, foodTimeoutID;
// let direction;
let memory = [];
// let snakeHead;
// let foodLocation;
// let foodTime;
let score = 0;
// let timeoutID;
// let foodTimeoutID;
let highscore = 0;
let difficulty = normalDifficulty;

// 
//  Element References
// 
const units = Array.from($('.unit').addClass());
const scoreElement = document.querySelector('.score');
const easy = document.querySelector('.easy');
const normal = document.querySelector('.normal');
const hard = document.querySelector('.hard');

// 
//  Event Listeners
// 

window.addEventListener('keydown', function(event){
	switch (event.code) {
		case "ArrowUp":
			if (direction === 'down' || !direction)break;
			clearTimeout(timeoutID);
			direction = 'up';
			move(snakeHead - 40);
			break;
		case "ArrowDown":
			if (direction === 'up' || !direction)break;
			clearTimeout(timeoutID);
			direction = 'down';
			move(snakeHead + 40);
			break;
		case "ArrowLeft":
			if (direction === 'right' || !direction)break;
			clearTimeout(timeoutID);
			direction = 'left';
			move(snakeHead - 1);
			break;
		case "ArrowRight":
			if (direction === 'left' || !direction)break;
			clearTimeout(timeoutID);
			direction = 'right';
			move(snakeHead + 1);
			break;
		case "Space":
			init();
			break;
		case "KeyR":
			reset();
			break;
	};
});

easy.addEventListener('click', function(){
	difficulty = easyDifficulty;
	document.querySelector('.difficulty').textContent = 'Easy';
});
normal.addEventListener('click', function (){
	difficulty = normalDifficulty;
	document.querySelector('.difficulty').textContent = 'Normal';
});
hard.addEventListener('click', function (){
	difficulty = hardDifficulty;
	document.querySelector('.difficulty').textContent = 'Hard';
});

// 
// Functions 
// 
// if (localStorage.getItem('highscore') ){highscore = localStorage.getItem('highscore'); document.querySelector('.highscore').textContent = localStorage.getItem('highscore')}
if (localStorage.highscore ){highscore = localStorage.highscore; document.querySelector('.highscore').textContent = localStorage.highscore}
function init (){
	clearTimeout(foodTimeoutID);
	if (direction) return;
	board = [
	'', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 
	'', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 
	'', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 
	'', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 
	'', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 
	'', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 
	'', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 
	'', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 
	'', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 
	'', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''
	];
	direction = 'right';
	generateFood();
	snakeHead = 219;
	move(219);
};

function move (index){
	if (!snakeHead)return;
	if (index > 400 || index < 0 || !(index%40) || memory.includes(index)) {loss(); return};

	snakeLength++;
	memory[memory.length] = snakeHead = index;

	snakeHead === foodLocation && (scoreIncrease(), generateFood(), snakeMaxLength++);

	$(units[index]).addClass("snake")
	snakeLength > snakeMaxLength && ($(units[memory[0]]).removeClass('snake'), snakeLength--, memory.shift());

	difficulty(index);
};

function reset () {
	if (score > highscore && score > 0){document.querySelector('.highscore').textContent = score; highscore = score; localStorage.setItem('highscore', score.toString())};

	units.forEach(unit => {
		$(unit).removeClass('snake food');
	});
	
	clearTimeout(foodTimeoutID);

	score = snakeLength = snakeHead = 0;
	scoreElement.textContent = `${score}`;
	memory = [];
	snakeMaxLength = 3;
	direction = undefined;
};

function easyDifficulty(index){
	switch (direction) {
		case 'down':
			timeoutID = setTimeout(move, 200, index + 40);
			break;
		case 'up':
			timeoutID = setTimeout(move, 200, index - 40);
			break;
		case 'left':
			timeoutID = setTimeout(move, 200, index - 1);
			break;
		case 'right':
			timeoutID = setTimeout(move, 200, index + 1);
			break;
	};
};

function normalDifficulty(index){
	switch (direction) {
		case 'down':
			timeoutID = setTimeout(move, 125, index + 40);
			break;
		case 'up':
			timeoutID = setTimeout(move, 125, index - 40);
			break;
		case 'left':
			timeoutID = setTimeout(move, 125, index - 1);
			break;
		case 'right':
			timeoutID = setTimeout(move, 125, index + 1);
			break;
	};
};

function hardDifficulty(index){
	switch (direction) {
		case 'down':
			timeoutID = setTimeout(move, 50, index + 40);
			break;
		case 'up':
			timeoutID = setTimeout(move, 50, index - 40);
			break;
		case 'left':
			timeoutID = setTimeout(move, 50, index - 1);
			break;
		case 'right':
			timeoutID = setTimeout(move, 50, index + 1);
			break;
	};
};

function generateFood(){
	$(units[foodLocation]).removeClass('food');

	setRandFoodLocation(400);

	if (memory.includes(foodLocation) || !(foodLocation % 40)) generateFood();

	$(units[foodLocation]).addClass('food');

	foodTime = 6;
	scoreDecay();
};

function scoreIncrease (){
	switch (foodTime){
		case 6:
		case 5:
			score += 150;
			break;
		case 4:
		case 3:
			score += 75;
			break;
		case 2:
			score += 25;
			break;
		default:
			score += 10;
			break;
	}
	clearTimeout(foodTimeoutID);
	scoreElement.textContent = `${score}`
};

function scoreDecay (){
	foodTime--;
	console.log(foodTime, score);
	foodTimeoutID = setTimeout(scoreDecay, 1000);
};
function loss(){
	alert('You Lose!');
	reset();
};
function setRandFoodLocation(max) {
  	foodLocation = Math.floor(Math.random() * Math.floor(max));
};