import { Entity } from 'engine/Entity.js';
import { drawFrameOrigin } from 'engine/context.js';
import * as control from 'engine/inputHandler.js'

import {
  EnemiesData,
  EnemyStateType,
  WALK_SPEED,
  animations,
  getEnemiesFrames,
} from 'game/constants/Enemies.js';
import { CollisionTile } from 'game/constants/LevelData.js';
import { Control } from 'game/constants/controls.js';
import { CounterDirectionsLookup, CounterDirections, Direction, MovementLookup } from 'game/constants/entities.js';
import { DEBUG, FRAME_TIME, HALF_TILE_SIZE, TILE_SIZE } from 'game/constants/game.js';
import { drawBox, drawCross } from 'game/utils/debug.js';
import { isZero } from 'game/utils/utils.js';

let isPause = 0;

export class Enemies extends Entity {
  image = document.querySelector('img#enemies');
  timeMove = 0
  id = 0;
  direction = Direction.DOWN;
  baseSpeedTime = WALK_SPEED;
  speedMultiplier = 1.2;
  animation = animations.moveAnimations[this.direction];

  constructor(id, time, getStageCollisionTileAt, onEnd) {
    super({
      x: (EnemiesData[id].column * TILE_SIZE) + HALF_TILE_SIZE,
      y: (EnemiesData[id].row * TILE_SIZE) + HALF_TILE_SIZE
    });

    this.states = {
      [EnemyStateType.MOVING]: {
        type: EnemyStateType.MOVING,
        init: this.handleMovingInit,
        update: this.handleMovingState,
      },

      [EnemyStateType.DEATH]: {
        type: EnemyStateType.DEATH,
        init: this.handleDeathInit,
        update: this.handleDeathState,
      },
    };

    this.id = id;
    this.name = EnemiesData[id].name;
    this.frames = getEnemiesFrames(this.name);
    this.startPosition = { ...this.position };
    this.getStageCollisionTileAt = getStageCollisionTileAt;
    this.onEnd = onEnd;

    this.changeState(EnemyStateType.MOVING, time);
  }

  IsPause() {
    return isPause;
  }

  setIsPause() {
    isPause++;
  }

  changeState(newState, time) {
    this.currentState = this.states[newState];
    this.animationFrame = 0;
    this.animationTimer = time.previous + this.animation[this.animationFrame][1] * FRAME_TIME;

    this.currentState.init(time);
  }

  resetVelocity = () => {
    this.velocity.x = 0;
    this.velocity.y = 0;
  }

  getCollisionRect = () => ({
    x: this.position.x - (HALF_TILE_SIZE / 2), y: this.position.y - (HALF_TILE_SIZE / 2),
    width: HALF_TILE_SIZE, height: HALF_TILE_SIZE,
  });

  reset(time) {
    this.animationFrame = 0;
    this.direction = Direction.DOWN;
    this.position = { ...this.startPosition };
    this.resetVelocity();
    this.changeState(EnemyStateType.IDLE, time);
  }

  getCollisionTile(cell) {
    if (
      this.lastBombCell && cell.row === this.lastBombCell.row
      && cell.column === this.lastBombCell.column
    ) return CollisionTile.EMPTY;

    return this.getStageCollisionTileAt(cell);
  }

  getCollisionCoords(direction) {
    switch (direction) {
      case Direction.UP:
        return [
          { row: Math.floor((this.position.y - 9) / TILE_SIZE), column: Math.floor((this.position.x - 8) / TILE_SIZE) },
          { row: Math.floor((this.position.y - 9) / TILE_SIZE), column: Math.floor((this.position.x + 7) / TILE_SIZE) },
        ];

      case Direction.LEFT:
        return [
          { row: Math.floor((this.position.y - 8) / TILE_SIZE), column: Math.floor((this.position.x - 9) / TILE_SIZE) },
          { row: Math.floor((this.position.y + 7) / TILE_SIZE), column: Math.floor((this.position.x - 9) / TILE_SIZE) },
        ];

      case Direction.RIGHT:
        return [
          { row: Math.floor((this.position.y - 8) / TILE_SIZE), column: Math.floor((this.position.x + 8) / TILE_SIZE) },
          { row: Math.floor((this.position.y + 7) / TILE_SIZE), column: Math.floor((this.position.x + 8) / TILE_SIZE) },
        ];

      case Direction.DOWN:
        return [
          { row: Math.floor((this.position.y + 8) / TILE_SIZE), column: Math.floor((this.position.x - 8) / TILE_SIZE) },
          { row: Math.floor((this.position.y + 8) / TILE_SIZE), column: Math.floor((this.position.x + 7) / TILE_SIZE) },
        ];
    }
  }

  shouldBlockMovement(tileCoords) {
    const tileCoordsMatch = tileCoords[0].column === tileCoords[1].column && tileCoords[0].row === tileCoords[1].row;
    const collisionTiles = [this.getCollisionTile(tileCoords[0]), this.getCollisionTile(tileCoords[1])];

    if ((tileCoordsMatch && collisionTiles[0] >= CollisionTile.WALL)
      || (collisionTiles[0] >= CollisionTile.WALL && collisionTiles[1] >= CollisionTile.WALL)) {
      return true;
    }

    return false;
  }

  performWallCheck(direction) {
    const collisionCoords = this.getCollisionCoords(direction);

    if (this.shouldBlockMovement(collisionCoords)) return [this.direction, { x: 0, y: 0 }]

    const counterDirections = CounterDirectionsLookup[direction];
    if (this.getCollisionTile(collisionCoords[0]) >= CollisionTile.WALL) {
      return [counterDirections[0], { ...MovementLookup[counterDirections[0]] }];
    }
    if (this.getCollisionTile(collisionCoords[1]) >= CollisionTile.WALL) {
      return [counterDirections[1], { ...MovementLookup[counterDirections[1]] }];
    }

    return [direction, { ...MovementLookup[direction] }];
  }

  WallCheck1(direction) {
    const collisionCoords = this.getCollisionCoords(direction);

    // if (this.shouldBlockMovement(collisionCoords)) return [this.direction, { x: 0, y: 0 }]
    const newDirections = CounterDirections[direction];
    if (this.getCollisionTile(collisionCoords[0]) >= CollisionTile.WALL) {
      return [newDirections[0], { ...MovementLookup[newDirections[0]] }];
    }

    return [direction, { ...MovementLookup[direction] }];
  }

  getMovement() {
    // if (isPause % 2 != 0) return [this.direction, { x: 0, y: 0 }];

    return this.WallCheck1(this.direction);
  }

  handleMovingInit = () => {
    this.animationFrame = 1;
  };

  handleDeathInit = () => {
    this.resetVelocity();
    this.animation = animations.deathAnimation;
  };

  handleGeneralState = (time) => {
    if (control.isControlPressed(this.id, Control.ESCAPE)) this.setIsPause();
    const [direction, velocity] = this.getMovement();
    // if (control.isControlPressed(this.id, Control.ACTION)) this.handleBombPlacement(time);

    this.animation = animations.moveAnimations[direction];
    this.direction = direction;

    return velocity;
  };

  handleMovingState = (time) => {
    this.velocity = this.handleGeneralState(time);
  };

  handleDeathState = (time) => {
    if (animations.deathAnimation[this.animationFrame][1] !== - 1) return;

    this.onEnd(this.id);
  }

  updatePosition(time) {
    this.position.x += (this.velocity.x * this.baseSpeedTime * this.speedMultiplier) * time.secondsPassed;
    this.position.y += (this.velocity.y * this.baseSpeedTime * this.speedMultiplier) * time.secondsPassed;
  }

  updateAnimation(time) {
    if (time.previous < this.animationTimer || this.currentState.type === EnemyStateType.IDLE) return;

    this.animationFrame += 1;
    if (this.animationFrame >= this.animation.length) this.animationFrame = 0;

    this.animationTimer = time.previous + (this.animation[this.animationFrame][1] * FRAME_TIME);
  }

  checkFlameTileCollision(enemyCell, time) {
    if (
      this.getCollisionTile(enemyCell) !== CollisionTile.FLAME
      || this.currentState.type === EnemyStateType.DEATH
    ) return;

    this.changeState(EnemyStateType.DEATH, time);
  }

  updateCellUnderdeath(time) {
    const enemyCell = {
      row: Math.floor(this.position.y / TILE_SIZE),
      column: Math.floor(this.position.x / TILE_SIZE),
    };

    this.checkFlameTileCollision(enemyCell, time);
  }

  update(time) {
    this.updatePosition(time);
    if (isPause % 2 == 0) {
      this.currentState.update(time);
      this.updateAnimation(time);
      this.updateCellUnderdeath(time);
    }
  }

  draw(context, camera) {
    const [frameKey] = this.animation[this.animationFrame];
    const frame = this.frames.get(frameKey);

    drawFrameOrigin(
      context, this.image, frame,
      Math.floor(this.position.x - camera.position.x),
      Math.floor(this.position.y - camera.position.y),
      [this.direction === Direction.RIGHT ? -1 : 1, 1],
    );

    if (!DEBUG) return;

    drawBox(context, camera, [this.position.x - HALF_TILE_SIZE, this.position.y - HALF_TILE_SIZE,
    TILE_SIZE - 1, TILE_SIZE - 1,], '#FFFF00');

    const collisionBox = this.getCollisionRect();
    drawBox(context, camera,
      [collisionBox.x, collisionBox.y, collisionBox.width, collisionBox.height,],
      '#FFFF00'
    );
    drawCross(context, camera, { x: this.position.x, y: this.position.y }, '#FFF');

  }
}
