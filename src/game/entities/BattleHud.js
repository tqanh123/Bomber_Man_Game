import { Entity } from 'engine/Entity.js';
import { SCREEN_WIDTH, STAGE_OFFSET_Y } from 'game/constants/game.js';
import { drawText } from 'game/utils/drawText.js';

export class BattleHud extends Entity {
  image = document.querySelector('img#hud');

  clock = [3, 0];

  constructor(time, state, level, life, max) {
    super({ x: 0, y: 0 });

    this.max = max;
    this.life = life;
    this.level = level;
    this.state = state;
    this.score = 0;
    this.clockTimer = time.previous + 1000;
    if (this.level !== 0) this.clock[0] = 0;
    console.log(this.level);
  }

  updateClock(time, onClock) {
    if (time.previous < this.clockTimer) return;

    this.clockTimer = time.previous + 1000;

    if (onClock) {
      if (this.level === 0) {
        this.clock[1] -= 1;
        if (this.clock[1] < 0 && this.clock[0] > 0) {
          this.clock[0] -= 1;
          this.clock[1] = 59;
        }
      }
      else {
        this.clock[1] += 1;
        if (this.clock[1] > 59) {
          this.clock[0] += 1;
          this.clock[1] = 0;
        }
      }
    }
  }

  update(time, onClock, life, score) {
    this.updateClock(time, onClock);
    this.life = life;
    this.score = score;
  }

  draw(context) {
    if (this.level === 0) {
      context.drawImage(
        this.image,
        8, 40, SCREEN_WIDTH, STAGE_OFFSET_Y,
        0, 0, SCREEN_WIDTH, STAGE_OFFSET_Y,
      );

      drawText(
        context,
        `${String(this.clock[0])}:${String(this.clock[1]).padStart(2, '0')}`,
        32, 8,
      );

      for (const id in this.state.wins) {
        drawText(context, String(this.state.wins[id]), 104 + (id * 32), 8);
      }
    }
    else {
      context.drawImage(
        this.image,
        8, 8, SCREEN_WIDTH, STAGE_OFFSET_Y,
        0, 0, SCREEN_WIDTH, STAGE_OFFSET_Y,
      );

      drawText(
        context,
        `${String(this.clock[0])}:${String(this.clock[1]).padStart(2, '0')}`,
        104, 8,
      );


      drawText(context, `${String(this.life)}`, 152, 8);

      drawText(context, `${String(this.max)}`, 177, 8);

      drawText(context, `${String(this.score)}`, 17, 8);
    }
  }
}
