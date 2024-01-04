import { BomberManGame } from 'game/BomberManGame.js';

window.addEventListener('load', () => {
	new BomberManGame().start();
});

// window.addEventListener('click',)
// (function () {

// })();

// let game = new BomberManGame();
// let disableButton = false;
// const button = document.getElementById('start');
// let hidden = button.getAttribute("hidden");

// function startGame() {
// 	game.start();
// 	alert("ok");
// 	disableButton = true;
// 	button.setAttribute("hidden", "hidden");
// 	var x = document.getElementById("myText").value;
// }

// button.addEventListener('click', startGame, true);

// if (!disableButton) button.removeAttribute("hidden");

