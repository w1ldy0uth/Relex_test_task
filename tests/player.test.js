import {Player, findMinCard} from "../player/player.js";

let player = new Player();

if (player === undefined) {
    throw new Error("Player haven't created properly");
}

let previousState = player.state;
player.changeState();
if (player.state === previousState) {
    throw new Error("Player's state isn't changing");
}

let minCard = findMinCard(player.defence);
if (minCard === undefined || minCard === -1) {
    throw new Error("Function findMinCard isn't working");
}

console.log("All player tests passed");