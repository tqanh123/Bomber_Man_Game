import { NO_PLAYERS, MAX_WINS } from "../constants/game.js";

let n_player = 0;
let n_win = 0;

function setPlayer(num) {
  n_player = num;
}
function setWin(num) {
  n_win = num;
}

let form = document.forms["my-form"];
if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    setPlayer(this.player.value);
    setWin(this.win.value);
    console.log(n_win);
    console.log(n_player);
    // NO_PLAYERS = this.player.value;
    // MAX_WINS = n_win;
    // console.log(NO_PLAYERS);
    // console.log(MAX_WINS);
    // alert(n_player);
    // alert(n_player);
  });
}

// export let player = n_player;
// export let win = n_win;
// console.log(n_player)
// console.log(n_win)

