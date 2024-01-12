import { pollGamepads, registerGamepadEvents, registerKeyEvents } from './inputHandler.js';
import { getContext } from './context.js';
import { Camera } from './Camera.js';

/**
 * Game time object to hold previous frames time information.
 * @typedef {Object} GameTime
 * @property {number} previous holds the previous game time.
 * @property {number} secondsPassed holds the the amount of seconds passed between this frame and the last.
 */

/**
 * Base game class that sets up and configures "all the things" for your game project
 * @abstract
 */
export class Game {
	pauseState = 0;
	scene;
	camera = new Camera(0, 0);

	/**
	 * @type {GameTime}
	 */
	frameTime = {
		previous: 0,
		secondsPassed: 0,
	};

	/**
	 *
	 * @param {string} selector the parent element the canvas will be a child of
	 * @param {number} width desired width of the canvas
	 * @param {number} height desired height of the canvas
	 */
	constructor(selector, width, height) {
		this.context = getContext(selector, width, height);
		this.camera.setDimensions(width, height);
	}

	/**
	 * The main loop (used for each "frame" of your game)
	 * @param {DOMHighResTimeStamp} time
	*/

	checkPause = () => { }
	frame = (time) => {
		window.requestAnimationFrame(this.frame);

		this.frameTime.secondsPassed = (time - this.frameTime.previous) / 1000;
		this.frameTime.previous = time;

		pollGamepads();
		if (this.scene && typeof this.scene.update === 'function') {
			this.scene.update(this.frameTime, this.context, this.camera);
		}
		if (this.pauseState % 2 == 0) {
			this.scene.draw(this.context, this.camera);
		}
	};


	start() {
		registerKeyEvents();
		registerGamepadEvents();


		// if (this.scene.isPause()) {
		// 	this.pauseState++;
		// 	this.scene.setIsPause();
		// }

		window.requestAnimationFrame(this.frame);
	}

	stop() {
		this.pauseState++;
	}
}
