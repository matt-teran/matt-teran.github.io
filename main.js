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
let board;
let direction;
let memory = [];
let snakeHead;
let foodLocation;
let foodTime;
let score = 0;
let timeoutID;
let foodTimeoutID;
let highscore = 0;
let difficulty = normalDifficulty;

// 
//  Element References
// 
const units = Array.from($('.unit').addClass());
const scoreElement = document.querySelector('.score')
const easy = document.querySelector('.easy')
const normal = document.querySelector('.normal')
const hard = document.querySelector('.hard')

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

function init (){
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
	if (index > 400){alert('You Lose!'); reset(); return};
	if (index < 0){alert('You Lose!'); reset(); return};
	if (!(index%40)){alert('You Lose!'); reset(); return};
	if (memory.includes(index)){alert('You Lose!'); reset(); return};
	snakeLength++;

	snakeHead = index;
	memory.push(index);
	if (snakeHead === foodLocation){ scoreIncrease(); generateFood(); snakeMaxLength++}
	$(units[index]).addClass("snake")
	if (snakeLength > snakeMaxLength){
		$(units[memory[0]]).removeClass('snake');
		snakeLength--; 
		memory.shift()
	};
	difficulty(index);
};

function reset () {
	if (score > highscore)document.querySelector('.highscore').textContent = score; highscore = score;
	units.forEach(unit => {
		$(unit).removeClass('snake food');
	});
	clearTimeout(foodTimeoutID);
	score = 0;
	scoreElement.textContent = `${score}`;
	memory = [];
	snakeLength = 0;
	snakeHead = 0;
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
		default:
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
		default:
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
		default:
			break;
	};
};

function generateFood(){
	$(units[foodLocation]).removeClass('food');
	function getRandomInt(max) {
  		foodLocation = Math.floor(Math.random() * Math.floor(max));
	};
	getRandomInt(400);
	if (memory.includes(foodLocation) || !(foodLocation % 40)) {generateFood()};
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
	console.log(score);
	scoreElement.textContent = `${score}`
};

function scoreDecay (){
	console.log(foodTime);
	foodTime--;
	foodTimeoutID = setTimeout(scoreDecay, 1000);
};