import { Direction } from "./entities.js";

export const WALK_SPEED = 40;

export const BombermanStateType = {
  IDLE: 'idle',
  MOVING: 'moving',
  DEATH: 'death',
};

export const BombermanColor = {
  WHITE: 'white',
  BLACK: 'black',
  RED: 'red',
  BLUE: 'blue',
  GREEN: 'green',
};

export const BombermanPlayerData = [
  { color: BombermanColor.WHITE, row: 1, column: 2 },
  { color: BombermanColor.BLACK, row: 11, column: 14 },
  { color: BombermanColor.RED, row: 1, column: 14 },
  { color: BombermanColor.WHITE, row: 11, column: 2 },
  { color: BombermanColor.GREEN, row: 6, column: 8 },
];

const bombermanFrames = {
  [BombermanColor.WHITE]: [
    ['idle-down', [[4, 5, 17, 22], [8, 15]]],
    ['move-down-1', [[30, 5, 17, 22], [7, 15]]],
    ['move-down-2', [[61, 5, 17, 22], [9, 15]]],
    ['idle-side', [[79, 5, 18, 22], [7, 15]]],
    ['move-side-1', [[104, 5, 17, 21], [8, 15]]],
    ['move-side-2', [[129, 5, 18, 22], [8, 15]]],
    ['idle-up', [[154, 4, 17, 22], [8, 15]]],
    ['move-up-1', [[180, 4, 17, 22], [7, 15]]],
    ['move-up-2', [[211, 4, 17, 22], [9, 15]]],
    // ['idle-down-left', [[5, 55, 17, 20], [6, 15]]],
    // ['idle-up-left', [[30, 55, 17, 20], [6, 15]]],

    ['death-1', [[10, 30, 21, 20], [10, 15]]],
    ['death-2', [[44, 30, 19, 19], [9, 15]]],
    ['death-3', [[75, 30, 22, 20], [11, 15]]],
    ['death-4', [[108, 30, 22, 21], [11, 15]]],
    ['death-5', [[142, 31, 20, 20], [10, 15]]],
    ['death-6', [[175, 32, 20, 19], [10, 15]]],
    ['death-7', [[207, 33, 21, 19], [11, 15]]],
    ['death-8', [[240, 33, 22, 21], [11, 15]]],
    ['death-9', [[273, 33, 22, 21], [11, 15]]],
  ],

  [BombermanColor.BLACK]: [
    ['idle-down', [[4, 80, 17, 22], [8, 15]]],
    ['move-down-1', [[30, 80, 17, 22], [7, 15]]],
    ['move-down-2', [[61, 80, 17, 22], [9, 15]]],
    ['idle-side', [[79, 80, 18, 22], [7, 15]]],
    ['move-side-1', [[104, 80, 17, 21], [8, 15]]],
    ['move-side-2', [[129, 80, 18, 22], [8, 15]]],
    ['idle-up', [[154, 79, 17, 22], [8, 15]]],
    ['move-up-1', [[180, 79, 17, 22], [7, 15]]],
    ['move-up-2', [[211, 79, 17, 22], [9, 15]]],


    ['death-1', [[10, 105, 21, 22], [10, 15]]],
    ['death-2', [[44, 105, 19, 22], [9, 15]]],
    ['death-3', [[75, 105, 22, 22], [11, 15]]],
    ['death-4', [[108, 105, 22, 22], [11, 15]]],
    ['death-5', [[142, 106, 20, 21], [10, 15]]],
    ['death-6', [[175, 107, 20, 20], [10, 15]]],
    ['death-7', [[207, 108, 21, 19], [11, 15]]],
    ['death-8', [[240, 107, 22, 21], [11, 15]]],
    ['death-9', [[273, 107, 22, 21], [11, 15]]],
  ],
};

export const animations = {
  moveAnimations: {
    [Direction.LEFT]: [
      ['idle-side', 8], ['move-side-1', 8], ['idle-side', 8], ['move-side-2', 8],
    ],
    [Direction.RIGHT]: [
      ['idle-side', 8], ['move-side-1', 8], ['idle-side', 8], ['move-side-2', 8],
    ],
    [Direction.UP]: [
      ['idle-up', 8], ['move-up-1', 8], ['idle-up', 8], ['move-up-2', 8],
    ],
    [Direction.DOWN]: [
      ['idle-down', 8], ['move-down-1', 8], ['idle-down', 8], ['move-down-2', 8],
    ],
  },
  deathAnimation: [
    ['death-1', 8], ['death-2', 8], ['death-1', 8], ['death-2', 8], ['death-1', 8], ['death-2', 8], ['death-3', 8],
    ['death-4', 8], ['death-5', 8], ['death-6', 8], ['death-7', 8], ['death-8', 8], ['death-9', 8], ['death-9', -1],
  ],
};

export const getBombermanFrames = (color) => new Map([
  ...bombermanFrames[color],
]);
