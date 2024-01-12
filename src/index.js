import { BomberManGame } from 'game/BomberManGame.js';

// window.addEventListener('load', () => {
// 	new BomberManGame().start();
// });

// let game = new BomberManGame();
const advanture = document.getElementById('adventure');
const battle = document.getElementById('battle');

battle.addEventListener('click', function () {
	document.querySelector('.menu').style.display = 'none';
	new BomberManGame(0).start();
	// game.start();
	// alert("ok 1");
});

advanture.addEventListener('click', function () {
	document.querySelector('.menu').style.display = 'none';
	new BomberManGame(1).start();
	// game.start();
	// alert("ok 2");
});



