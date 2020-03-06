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
let snakeHead;
let board;
let direction = 'down';
let memory = [];

// 
//  Element References
// 
const units = Array.from($('.unit').addClass());


// 
//  Event Listeners
// 
window.addEventListener('keydown', function(event){
	switch (event.code) {
		case "ArrowUp":
			if (direction === 'down')break;
			direction = 'up';
			break;
		case "ArrowDown":
			if (direction === 'up')break;
			direction = 'down';
			break;
		case "ArrowLeft":
			if (direction === 'right')break;
			direction = 'left';
			break;
		case "ArrowRight":
			if (direction === 'left')break;
			direction = 'right';
			break;
		case "Space":
			console.log('space');
			init();
			break;
		case "KeyR":
			reset();
			break;
	}
});

// 
// Functions 
// 
function init (){
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
	direction = 'down';
	move(219);
};

function move (index){
	console.log(index);
	if (index > 400){alert('death'); reset(); return};
	if (index < 0){alert('death'); reset(); return};
	if (!(index%40)){alert('death'); reset(); return};
	snakeLength++;


	memory.push(index);
	$(units[index]).html("<img src='circle.png'>")
	if (snakeLength > 3){
		units[memory[0]].textContent = '';
		snakeLength--; 
		memory.shift()
	};

	switch (direction) {
		case 'down':
			setTimeout(move, 150, index + 40);
			break;
		case 'up':
			setTimeout(move, 150, index - 40);
			break;
		case 'left':
			setTimeout(move, 150, index - 1);
			break;
		case 'right':
			setTimeout(move, 150, index + 1);
			break;
		default:
			break;
	};
};
function reset () {
	units.forEach(unit => {
		unit.textContent = '';
	});
	memory = [];
	snakeLength = 0;
	direction = '';
};