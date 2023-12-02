import { Scene } from 'engine/Scene.js';
import { HALF_TILE_SIZE, NO_PLAYERS, STAGE_OFFSET_Y } from 'game/constants/game.js';
import { BattleHud } from 'game/entities/BattleHud.js';
import { Bomberman } from 'game/entities/Bomberman.js';
import { Stage } from 'game/entities/Stage.js';
import { BlockSystem } from 'game/systems/BlockSystem.js';
import { BombSystem } from 'game/systems/BombSystem.js';
import { PowerupSystem } from 'game/systems/PowerSystem.js';

export class BattleScene extends Scene {
  players = [];

  constructor(time, camera, state) {
    super();

    this.state = state;
    this.stage = new Stage();
    this.hud = new BattleHud(time, this.state);
    this.powerupSystem = new PowerupSystem(time, this.players);
    this.blockSystem = new BlockSystem(this.stage.updateMapAt, this.stage.getCollisionTileAt, this.powerupSystem.add);
    this.bombSystem = new BombSystem(this.stage.collisionMap, this.blockSystem.add);

    for (let id = 0; id < NO_PLAYERS; id++) {
      this.addPlayer(id, time);
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
    ));
  }

  update(time) {
    this.hud.update(time);
    this.powerupSystem.update(time);
    this.blockSystem.update(time);
    this.bombSystem.update(time);

    for (const player of this.players) {
      player.update(time);
    }
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
  }
}
