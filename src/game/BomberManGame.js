import { MAX_WINS, NO_PLAYERS, SCREEN_HEIGHT, SCREEN_WIDTH } from 'game/constants/game.js';
import { Game } from 'engine/Game.js';
import { BattleScene } from './scenes/BattleScene.js';
import { clamp } from 'engine/utils/maths.js';
import { WinnerScence } from './scenes/WinnerScence.js';
// import { inGame } from 'game/constants/game.js';

let maxScore = 0;

export class BomberManGame extends Game {
	gameState = {
		wins: new Array(clamp(NO_PLAYERS, 1, 3)).fill(0),
		maxWins: MAX_WINS,
		winner: false,
		gameover: false,
	};
	idGame = 0;
	life = 0;

	// scene = new BattleScene(this.frameTime, this.camera);
	// inGame = true;
	checkPause = () => {
		if (this.scene.IsPause()) {
			this.stop();
			this.scene.setIsPause();
		}
	}


	constructor(id, life) {
		super('body', SCREEN_WIDTH, SCREEN_HEIGHT);
		this.life = life;
		this.idGame = id;
		this.scene = new BattleScene(this.frameTime, this.camera, this.gameState, this.resetGame, id, life, maxScore, 0);
		// this.scene = new WinnerScence(this.camera, this.idGame, maxScore, 0)
	}

	setIDGame(id) {
		this.idGame = id;
	}

	resetGame = (winnerId, point) => {
		if (this.idGame === 0) {
			if (winnerId > -1 && winnerId <= NO_PLAYERS) this.gameState.wins[winnerId] += 1;
			else winnerId = 0;

			if (this.gameState.wins[winnerId] < this.gameState.maxWins) {
				this.scene = new BattleScene(this.frameTime, this.camera, this.gameState, this.resetGame, this.idGame, this.life, maxScore, point);

			}
			else {
				console.log(winnerId);
				this.scene = new WinnerScence(this.camera, this.idGame, 0, winnerId);
			}
		}
		else {
			if (winnerId === 0) {
				if (this.idGame < this.gameState.maxWins) {
					this.idGame += 1;
					this.scene = new BattleScene(this.frameTime, this.camera, this.gameState, this.resetGame, this.idGame, this.life, maxScore, point);
				}
				else {
					if (point > maxScore) maxScore = point;
					this.scene = new WinnerScence(this.camera, this.idGame, point, 0);
				}
			}
			else {
				this.life -= 1;
				if (this.life !== 0) {
					this.scene = new BattleScene(this.frameTime, this.camera, this.gameState, this.resetGame, this.idGame, this.life, maxScore, point - 100);
				}
			}
		}
	}
}

