import { Direction } from "./entities.js";

export const WALK_SPEED = 30;

export const EnemyStateType = {
  MOVING: 'moving',
  DEATH: 'death',
};

export const MonsterType = {
  BALLOON: 'balloon',
  WATER: 'water',
};

export const EnemiesData = [
  { name: MonsterType.BALLOON, row: 1, column: 3 },
  { name: MonsterType.WATER, row: 6, column: 8 },
];

const EnemyFrames = {
  [MonsterType.BALLOON]: [
    ['idle', [[4, 4, 16, 16], [8, 10]]],
    ['move-1', [[21, 4, 16, 16], [8, 11]]],
    ['move-2', [[38, 4, 16, 16], [8, 11]]],

    ['death-1', [[55, 4, 16, 16], [8, 11]]],
    ['death-2', [[72, 4, 16, 16], [8, 11]]],
    ['death-3', [[72, 4, 16, 16], [8, 11]]],
    ['death-4', [[72, 4, 16, 16], [8, 11]]],
    ['death-5', [[47, 412, 16, 16], [8, 10]]],
    ['death-6', [[64, 412, 16, 16], [8, 10]]],
    ['death-7', [[81, 412, 16, 16], [8, 10]]],

  ],

  [MonsterType.WATER]: [
    ['idle', [[4, 395, 16, 16], [8, 11]]],
    ['move-1', [[21, 395, 16, 16], [8, 11]]],
    ['move-2', [[38, 395, 16, 16], [8, 11]]],

    ['death-1', [[55, 395, 16, 16], [8, 11]]],
    ['death-2', [[55, 123, 16, 16], [8, 11]]],
    ['death-3', [[13, 412, 16, 16], [8, 11]]],
    ['death-4', [[30, 412, 16, 16], [8, 10]]],
    ['death-5', [[47, 412, 16, 16], [8, 10]]],
    ['death-6', [[64, 412, 16, 16], [8, 10]]],
    ['death-7', [[81, 412, 16, 16], [8, 10]]],


  ],
};

export const animations = {
  moveAnimations: {
    [Direction.LEFT]: [
      ['idle', 8], ['move-1', 8], ['idle', 8], ['move-2', 8],
    ],
    [Direction.RIGHT]: [
      ['idle', 8], ['move-1', 8], ['idle', 8], ['move-2', 8],
    ],
    [Direction.UP]: [
      ['idle', 8], ['move-1', 8], ['idle', 8], ['move-2', 8],
    ],
    [Direction.DOWN]: [
      ['idle', 8], ['move-1', 8], ['idle', 8], ['move-2', 8],
    ],
  },
  deathAnimation: [
    ['death-1', 8], ['death-2', 8], ['death-1', 8], ['death-2', 8], ['death-1', 8], ['death-2', 8],
    ['death-3', 8], ['death-4', 8], ['death-5', 8], ['death-6', 8], ['death-7', 8], ['death-7', -1],
  ],
};

export const getEnemiesFrames = (name) => new Map([
  ...EnemyFrames[name],
]);
