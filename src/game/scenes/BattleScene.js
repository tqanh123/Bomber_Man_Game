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

export class BattleScene extends Scene {
  players = [];
  enemies = [];
  isPause = false;

  constructor(time, camera, state, onEnd) {
    super();

    this.state = state;
    this.onEnd = onEnd;
    this.stage = new Stage();
    this.hud = new BattleHud(time, this.state);
    this.powerupSystem = new PowerupSystem(time, this.players);
    this.blockSystem = new BlockSystem(this.stage.updateMapAt, this.stage.getCollisionTileAt, this.powerupSystem.add);
    this.bombSystem = new BombSystem(this.stage.collisionMap, this.blockSystem.add);

    for (let id = 0; id < NO_PLAYERS; id++) {
      this.addPlayer(id, time);
    }

    for (let id = 0; id < NO_ENEMY; id++) {
      this.addEnemy(id, time);
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
    ));
  }

  removeEnemy = (id) => {
    const index = this.enemies.findIndex((player) => player.id === id);
    if (index < 0) return;

    this.enemies.splice(index, 1);
  };

  addEnemy(id, time) {
    this.enemies.push(new Enemies(
      id, time,
      this.stage.getCollisionTileAt,
      this.removeEnemy,
    ));
  }

  checkEndGame() {

    for (const player of this.players) {
      if (player.checkEndGame()) {
        const PlayerWin = this.players.length > 0 && player.currentState.type !== BombermanStateType.DEATH;

        this.onEnd(PlayerWin ? player.id : 20);
        return;
      }
    }

    if (this.players.length > 1) return;

    const isLastPlayerAlive = this.players.length > 0 && this.players[0].currentState.type !== BombermanStateType.DEATH;

    this.onEnd(isLastPlayerAlive ? this.players[0].id : 1);
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

    if (this.enemies.length != 0) {
      if (this.enemies[0].IsPause() != this.players[0].IsPause())
        this.enemies[0].setIsPause();
    }
  }

  update(time) {
    if (this.players.length != 0)
      this.updateIsPause(this.players[0].IsPause());
    // if ()
    // this.updateIsPause(this.enemies[0].IsPause());

    if (!this.isPause) {
      this.hud.update(time, !this.isPause);
      this.powerupSystem.update(time);
      this.blockSystem.update(time);
      this.bombSystem.update(time);
      for (const enemy of this.enemies) {
        enemy.update(time);
      }
    }

    this.players.sort((playerA, playerB) => playerA.position.y - playerB.position.y);

    for (const player of this.players) {
      player.update(time);
    }

    this.checkEndGame();
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

    for (const enemy of this.enemies) {
      enemy.draw(context, camera);
    }

  }
}
