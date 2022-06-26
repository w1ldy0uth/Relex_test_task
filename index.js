import {Computer} from "./player/computer.js";
import {Human} from "./player/human.js";

function getRandom(arr) {
    return arr[Math.floor((Math.random() * arr.length))];
}

function checkLose(player) {
    const maxPenalties = 6;
    return player.hasNoCards() || player.penalties === maxPenalties;
}

function main() {
    let computer = new Computer();
    let human = new Human();

    console.log("Welcome to the card game \"Wall to wall\"!", "\nPicking first attacker by random...");
    let turn = getRandom(["human", "computer"]);

    if (turn === "human") {
        human.changeState();
    }
    else {
        computer.changeState();
    }

    while (true) {
        if (human.state === "Attacker") {
            human.attack(computer);
            human.changeState();
            computer.changeState();
        }
        else if (computer.state === "Attacker") {
            computer.attack(human);
            computer.changeState();
            human.changeState();
        }

        if (checkLose(human)) {
            console.log("You've lost. Try again.");
            break;
        }
        else if (checkLose(computer)) {
            console.log("Yow won! Congratulations!");
            break;
        }
    }
}

main();