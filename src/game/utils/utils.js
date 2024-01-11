import { HALF_TILE_SIZE } from "game/constants/game.js";

export const isZero = (point) => point.x === 0 && point.y === 0;

export const getCollisionRect = (entity) => ({
  x: entity.position.x - (HALF_TILE_SIZE / 2), y: entity.position.y - (HALF_TILE_SIZE / 2),
  width: HALF_TILE_SIZE, height: HALF_TILE_SIZE,
});
