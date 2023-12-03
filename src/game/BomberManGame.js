import { MAX_WINS, NO_PLAYERS, SCREEN_HEIGHT, SCREEN_WIDTH } from 'game/constants/game.js';
import { Game } from 'engine/Game.js';
import { BattleScene } from './scenes/BattleScene.js';
import { clamp } from 'engine/utils/maths.js';

export class BomberManGame extends Game {
	gameState = {
		wins: new Array(clamp(NO_PLAYERS, 2, 3)).fill(0),
		maxWins: MAX_WINS,
	};

	scene = new BattleScene(this.frameTime, this.camera);

	checkPause = () => {
		if (this.scene.IsPause()) {
			this.stop();
			this.scene.setIsPause();
		}
	}

	constructor() {
		super('body', SCREEN_WIDTH, SCREEN_HEIGHT);

		this.scene = new BattleScene(this.frameTime, this.camera, this.gameState, this.resetGame);

	}

	resetGame = (winnerId) => {
		if (winnerId > -1) this.gameState.wins[winnerId] += 1;
		if (this.gameState.wins[winnerId] < this.gameState.maxWins)
			this.scene = new BattleScene(this.frameTime, this.camera, this.gameState, this.resetGame);
		else this.stop();
	}
}

