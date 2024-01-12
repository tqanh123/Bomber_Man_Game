import { Scene } from 'engine/Scene.js';
import { BombermanStateType } from 'game/constants/Bomberman.js';
import { HALF_TILE_SIZE, NO_PLAYERS, STAGE_OFFSET_Y, NO_ENEMY } from 'game/constants/game.js';
import { BattleHud } from 'game/entities/BattleHud.js';
import { Bomberman } from 'game/entities/Bomberman.js';
import { Enemies } from 'game/entities/Enemies.js';
import { Stage } from 'game/entities/Stage.js';
import { BlockSystem } from 'game/systems/BlockSystem.js';
import { BombSystem } from 'game/systems/BombSystem.js';
import { PowerupSystem } from 'game/systems/PowerSystem.js';
import { getCollisionRect } from 'game/utils/utils.js';
import { rectanglesOverlap } from 'engine/utils/collisions.js';

export class BattleScene extends Scene {
  players = [];
  enemies = [];
  isPause = false;

  constructor(time, camera, state, onEnd, idGame, life, maxScore, score) {
    super();

    this.state = state;
    this.onEnd = onEnd;
    this.level = idGame;
    this.score = score;
    this.stage = new Stage();
    this.powerupSystem = new PowerupSystem(time, this.players);
    this.blockSystem = new BlockSystem(this.stage.updateMapAt, this.stage.getCollisionTileAt, this.powerupSystem.add);
    this.bombSystem = new BombSystem(this.stage.collisionMap, this.blockSystem.add);
    this.life = life;
    this.maxScore = maxScore;
    console.log(this.score);

    if (this.level !== 0) {

      this.hud = new BattleHud(time, this.state, this.level, this.life, this.maxScore);

      this.addPlayer(0, time);

      for (let id = 0; id < NO_ENEMY; id++) {
        this.addEnemy(id, time);
      }
    }
    else {
      this.hud = new BattleHud(time, this.state, this.level, this.life, this.maxScore);

      for (let id = 0; id < NO_PLAYERS; id++) {
        this.addPlayer(id, time);
      }

    }

    camera.position = { x: HALF_TILE_SIZE, y: -STAGE_OFFSET_Y }
  }

  removePlayer = (id) => {
    const index = this.players.findIndex((player) => player.id === id);
    if (index < 0) return;

    this.players.splice(index, 1);
  };

  addPlayer(id, time) {
    this.players.push(new Bomberman(
      id, time,
      this.stage.getCollisionTileAt,
      this.bombSystem.add,
      this.removePlayer,
      this.level,
    ));
  }

  removeEnemy = (id) => {
    const index = this.enemies.findIndex((enemy) => enemy.id === id);
    if (index < 0) return;

    this.score += this.enemies[index].point;

    this.enemies.splice(index, 1);
  };

  addEnemy(id, time) {
    this.enemies.push(new Enemies(
      id, time,
      this.stage.getCollisionTileAt,
      this.removeEnemy,
    ));
  }

  checkAlive() {
    if (this.players.length === 0) this.onEnd(1, this.score)
    else if (this.players[0].checkEndGame() === true) this.onEnd(0, this.score);
  }

  checkEndGame() {

    for (const player of this.players) {
      if (player.checkEndGame()) {
        const PlayerWin = this.players.length > 0 && player.currentState.type !== BombermanStateType.DEATH;

        this.onEnd(PlayerWin ? player.id : 20, 0);
        return;
      }
    }

    if (this.players.length > 1) return;

    const isLastPlayerAlive = this.players.length > 0 && this.players[0].currentState.type !== BombermanStateType.DEATH;

    this.onEnd(isLastPlayerAlive ? this.players[0].id : 20, 0);
  }

  IsPause() {
    return this.isPause;
  }

  setIsPause() {
    this.isPause = false;
  }

  updateIsPause(x) {
    if (x % 2 == 0) this.isPause = false;
    else this.isPause = true;

    if (this.enemies.length !== 0 && this.level !== 0) {
      if (this.enemies[0].IsPause() !== this.players[0].IsPause())
        this.enemies[0].setIsPause();
    }
  }

  checkContactEnemies(time) {
    for (const player of this.players) {
      let ok = true;
      let pRect = getCollisionRect(player);
      for (let enemy of this.enemies) {
        if (!rectanglesOverlap(pRect, getCollisionRect(enemy))) continue;

        player.changeState(BombermanStateType.DEATH, time);
      }
    }
  }

  update(time) {
    if (this.players.length !== 0)
      this.updateIsPause(this.players[0].IsPause());

    if (this.level !== 0) this.checkContactEnemies(time);

    if (!this.isPause) {

      if (this.level !== 0) {

        for (const enemy of this.enemies) {
          enemy.update(time);
        }
      }
      this.hud.update(time, !this.isPause, this.life, this.score);
      this.powerupSystem.update(time);
      this.blockSystem.update(time);
      this.bombSystem.update(time);
    }

    this.players.sort((playerA, playerB) => playerA.position.y - playerB.position.y);

    for (const player of this.players) {
      player.update(time);
    }

    if (this.level === 0)
      this.checkEndGame();
    else
      this.checkAlive();
  }

  draw(context, camera) {
    this.stage.draw(context, camera);
    this.hud.draw(context);

    this.powerupSystem.draw(context, camera);
    this.blockSystem.draw(context, camera);
    this.bombSystem.draw(context, camera);

    for (const player of this.players) {
      player.draw(context, camera);
    }

    if (this.level !== 0)
      for (const enemy of this.enemies) {
        enemy.draw(context, camera);
      }
  }
}
