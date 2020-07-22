//select elements on page - canvas and shake button

const canvas = document.querySelector('#etch-a-sketch'); //selects canvas
const ctx = canvas.getContext('2d'); // context is where you draw, this selects it with the getContext method - can be 2d or 3d
const shakebutton = document.querySelector('.shake'); //select shake button
const MOVE_AMOUNT = 10;

//setup canvas for drawing
ctx.lineJoin = 'round'; //these will ensure that you get a smooth drawing.  default is squared off.
ctx.lineCap = 'round'; //these will ensure that you get a smooth drawing.  default is squared off.
ctx.lineWidth = 10; //default is 1px.
let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

// create random x and y starting points on the canvas
const width = canvas.width; //finding width and height to create x,y starting positions later
const height = canvas.height; //these two destructured is const { width, height} = canvas;
//console.log(width, height); // prints 1600  1000

let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

ctx.beginPath(); // starts the drawing - little dot that shows up
ctx.moveTo(x, y); //starting position  could be hardcoded with numbers if wanted
ctx.lineTo(x, y); //starting position
ctx.stroke();

//write a draw function
function draw({ key }) {
	//({key}) is a destructured version property of options (options.key)- which is an object that takes in a bunch of arguments, where order doesnt matter and some can be optional
	hue += 10;
	ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
	//start the path
	ctx.beginPath();
	ctx.moveTo(x, y);
	//move our x and y values depending on what the user did
	switch (key) {
		case 'ArrowUp':
			y = y - MOVE_AMOUNT;
			break;
		case 'ArrowRight':
			x = x + MOVE_AMOUNT;
			break;
		case 'ArrowDown':
			y = y + MOVE_AMOUNT;
			break;
		case 'ArrowLeft':
			x = x - MOVE_AMOUNT;
			break;
		default:
			break;
	}
	ctx.lineTo(x, y);
	ctx.stroke();
}

//write a handler for the keys
function handleKey(e) {
	if (e.key.includes('Arrow')) {
		// makes sure that we can use other keys for shortcuts insted of listening to them all
		e.preventDefault(); // default of key is to move page around
		draw({ key: e.key });
	}
}
//clear the shake function
function clearCanvas() {
	canvas.classList.add('shake');
	ctx.clearRect(0, 0, width, height);
	canvas.addEventListener(
		'animationend',
		function() {
			canvas.classList.remove('shake');
		},
		{ once: true }
	);
}
//listen for arrow keys
window.addEventListener('keydown', handleKey);
shakebutton.addEventListener('click', clearCanvas);
