import { FRAME_TIME } from "./game.js";

export const BASE_FRAME = 187;
export const BASE_HORIZONTAL_FRAME = BASE_FRAME + 88;
export const BASE_VERTICAL_FRAME = BASE_FRAME + 60;
export const BASE_RIGHT_LAST_FRAME = BASE_FRAME + 56;
export const BASE_LEFT_LAST_FRAME = BASE_FRAME + 84;
export const BASE_TOP_LAST_FRAME = BASE_FRAME + 4;
export const BASE_BOTTOM_LAST_FRAME = BASE_FRAME + 32;
export const FUSE_TIMER = 3000;

export const BOMB_FRAME_DELAY = 16 * FRAME_TIME;
export const BOMB_EXPLODE_DELAY = 8 * FRAME_TIME;
export const BOMB_ANIMATION = [0, 1, 2, 1];

export const EXPLOSION_FRAME_DELAY = 4 * FRAME_TIME;
export const EXPLOSION_ANIMATION = [3, 29, 30, 31, 30, 29, 28];

export const FLAME_ANIMATION = [0, 1, 2, 3, 2, 1, 0];

export const FlameDirectionLookup = [[0, -1], [1, 0], [0, 1], [-1, 0]];
