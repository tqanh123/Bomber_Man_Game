/**
 * Set up you main game constant values here
 */
// let n_player = 2;
// let n_win = 3;
let form = document.forms["my-form"];
form.addEventListener("submit", getValues);
function getValues(event) {
  event.preventDefault();

  // n_player = this.player.value;
  // n_win = this.win.value;
  //   export const NO_PLAYERS = 2;
  //   export const MAX_WINS = 3;
}


export const FPS = 60;
export const FRAME_TIME = 1000 / FPS;

export const SCREEN_WIDTH = 256;
export const SCREEN_HEIGHT = 224;

export const TILE_SIZE = 16;
export const HALF_TILE_SIZE = TILE_SIZE / 2;

export const STAGE_OFFSET_Y = 24;

export const NO_PLAYERS = 2;
export const MAX_WINS = 3;

export const DEBUG = false;
