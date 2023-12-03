import { BomberManGame } from 'game/BomberManGame.js';

// window.addEventListener('load', () => {
// 	new BomberManGame().start();
// });

// window.addEventListener('click',)
// (function () {

// })();

let game = new BomberManGame();
let disableButton = false;
const button = document.getElementById('start');
let hidden = button.getAttribute("hidden");

function startGame() {
	game.start();
	disableButton = true;
	button.setAttribute("hidden", "hidden");
}

button.addEventListener('click', startGame, true);

if (!disableButton) button.removeAttribute("hidden");

