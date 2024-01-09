/**
 * Set up you main game constant values here
 */
// import { player, win } from '../utils/htmlValue.js'
export const FPS = 60;
export const FRAME_TIME = 1000 / FPS;

export const SCREEN_WIDTH = 256;
export const SCREEN_HEIGHT = 224;

export const TILE_SIZE = 16;
export const HALF_TILE_SIZE = TILE_SIZE / 2;

export const STAGE_OFFSET_Y = 24;

export let NO_ENEMY = 2;
export let NO_PLAYERS = 2;
export let MAX_WINS = 2;
// if (player != 0) NO_PLAYERS = player;
// if (win != 0) MAX_WINS = win;
let form = document.forms["my-form"];
if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // setPlayer(this.player.value);
    // setWin(this.win.value);
    // console.log(n_win);
    // console.log(n_player);
    NO_PLAYERS = this.player.value;
    MAX_WINS = this.win.value;
    console.log(NO_PLAYERS);
    console.log(MAX_WINS);
  });
}
console.log(NO_PLAYERS)
// console.log(player)
export const DEBUG = false;
