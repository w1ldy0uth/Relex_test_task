let mod = require("../player/human.js");

let human = new mod.Human();

if (human === undefined) {
    throw new Error("Player (human) haven't created properly");
}

let previousState = human.state;
human.changeState();
if (human.state === previousState) {
    throw new Error("Human's state isn't changing");
}

console.log("All human tests passed");