import { GamepadThumbstick } from 'engine/constants/control.js';
import { Control } from 'game/constants/controls.js';

/**
 * Use this object to define the configured inputs for the available controls
 */
export const controls = [
	{
		gamePad: {
			[GamepadThumbstick.DEAD_ZONE]: 0.5,
			[GamepadThumbstick.HORIZONTAL_AXE_ID]: 0,
			[GamepadThumbstick.VERTICAL_AXE_ID]: 1,

			[Control.START]: 9,
			[Control.LEFT]: 14,
			[Control.RIGHT]: 15,
			[Control.UP]: 12,
			[Control.DOWN]: 13,
			[Control.ESCAPE]: 16,
		},
		keyboard: {
			[Control.LEFT]: 'ArrowLeft',
			[Control.RIGHT]: 'ArrowRight',
			[Control.UP]: 'ArrowUp',
			[Control.DOWN]: 'ArrowDown',
			[Control.ACTION]: 'ShiftRight',
			[Control.START]: 'Enter',
			[Control.ESCAPE]: 'Escape',
		},
	},
	{
		gamePad: {
			[GamepadThumbstick.DEAD_ZONE]: 0.5,
			[GamepadThumbstick.HORIZONTAL_AXE_ID]: 0,
			[GamepadThumbstick.VERTICAL_AXE_ID]: 1,

			[Control.START]: 9,
			[Control.LEFT]: 14,
			[Control.RIGHT]: 15,
			[Control.UP]: 12,
			[Control.DOWN]: 13,
		},
		keyboard: {
			[Control.LEFT]: 'KeyA',
			[Control.RIGHT]: 'KeyD',
			[Control.UP]: 'KeyW',
			[Control.DOWN]: 'KeyS',
			[Control.ACTION]: 'KeyE',
			[Control.START]: 'Enter',
		},
	},
	{
		gamePad: {
			[GamepadThumbstick.DEAD_ZONE]: 0.5,
			[GamepadThumbstick.HORIZONTAL_AXE_ID]: 0,
			[GamepadThumbstick.VERTICAL_AXE_ID]: 1,

			[Control.START]: 9,
			[Control.LEFT]: 14,
			[Control.RIGHT]: 15,
			[Control.UP]: 12,
			[Control.DOWN]: 13,
		},
		keyboard: {
			[Control.LEFT]: 'KeyG',
			[Control.RIGHT]: 'KeyJ',
			[Control.UP]: 'KeyY',
			[Control.DOWN]: 'KeyH',
			[Control.ACTION]: 'KeyT',
			[Control.START]: 'Enter',
		},
	},
	{
		gamePad: {
			[GamepadThumbstick.DEAD_ZONE]: 0.5,
			[GamepadThumbstick.HORIZONTAL_AXE_ID]: 0,
			[GamepadThumbstick.VERTICAL_AXE_ID]: 1,

			[Control.START]: 9,
			[Control.LEFT]: 14,
			[Control.RIGHT]: 15,
			[Control.UP]: 12,
			[Control.DOWN]: 13,
		},
		keyboard: {
			[Control.LEFT]: 'Numpad1',
			[Control.RIGHT]: 'Numpad3',
			[Control.UP]: 'Numpad5',
			[Control.DOWN]: 'Numpad2',
			[Control.ACTION]: 'Numpad4',
			[Control.START]: 'Enter',
		},
	},
	{
		gamePad: {
			[GamepadThumbstick.DEAD_ZONE]: 0.5,
			[GamepadThumbstick.HORIZONTAL_AXE_ID]: 0,
			[GamepadThumbstick.VERTICAL_AXE_ID]: 1,

			[Control.START]: 9,
			[Control.LEFT]: 14,
			[Control.RIGHT]: 15,
			[Control.UP]: 12,
			[Control.DOWN]: 13,
		},
		keyboard: {
			[Control.LEFT]: 'KeyL',
			[Control.RIGHT]: 'Quote',
			[Control.UP]: 'Semicolon',
			[Control.DOWN]: 'KeyP',
			[Control.ACTION]: 'KeyO',
			[Control.START]: 'Enter',
		},
	},
];
