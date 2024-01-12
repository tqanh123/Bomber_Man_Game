import { Scene } from "engine/Scene.js";
import { HALF_TILE_SIZE, SCREEN_HEIGHT, SCREEN_WIDTH, STAGE_OFFSET_Y, TILE_SIZE } from "game/constants/game.js";
import { Bomberman } from "game/entities/Bomberman.js";
import { drawFrameOrigin } from "engine/context.js";

export class WinnerScence extends Scene {
  image = document.querySelector('img#winner');

  constructor(camera, idGame, life, maxScore, id) {
    super();
    camera.position = { x: HALF_TILE_SIZE, y: -STAGE_OFFSET_Y };
    this.level = idGame;
    this.life = life;
    this.maxScore = maxScore;
    this.id = id;
  }

  draw(context) {
    context.drawImage(
      this.image,
      150, 0, 650, 540,
      0, 0, SCREEN_WIDTH, SCREEN_HEIGHT,
    );

    context.drawImage(
      this.image,
      30, 40 + (this.id * 70), 60, 70,
      SCREEN_WIDTH / 2 - HALF_TILE_SIZE, SCREEN_HEIGHT / 2 + TILE_SIZE, 30, 40,
    );
  }
}
