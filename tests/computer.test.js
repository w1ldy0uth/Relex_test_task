let mod = require("../player/computer.js");

let computer = new mod.Computer();

if (computer === undefined) {
    throw new Error("Player (computer) haven't created properly");
}

let previousState = computer.state;
computer.changeState();
if (computer.state === previousState) {
    throw new Error("Computer's state isn't changing");
}

console.log("All computer tests passed");