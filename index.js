let modComputer = require("./player/computer.js");
let modHuman = require("./player/human.js");

function getRandom(arr) {
    return arr[Math.floor((Math.random() * arr.length))];
}

function checkLose(player) {
    const maxPenalties = 3;
    return player.hasNoCards() || player.penalties === maxPenalties;
}

function main() {
    let computer = new modComputer.Computer();
    let human = new modHuman.Human();

    console.log("Welcome to the card game \"Wall to wall\"!", "\n\nPicking first attacker by random...");
    let turn = getRandom(["human", "computer"]);

    if (turn === "human") {
        human.changeState();
        console.log("The first turn is up to human\n");

    }
    else {
        computer.changeState();
        console.log("The first turn is up to computer\n");
    }

    while (true) {
        if (human.state === "Attacker") {
            human.attack(computer);
        }
        else if (computer.state === "Attacker") {
            computer.attack(human);
        }
        computer.changeState();
        computer.refreshDefence();
        human.changeState();
        human.refreshDefence();

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