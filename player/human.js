let mod = require("../player/player.js");

const readline = require("prompt-sync")();

class Human extends mod.Player {
    attack(computer) {
        let battleResults = {
            toAttacker: [],
            toDefender: -1
        };

        console.log("Computer's defence cards: ", computer.defence.join(" "));

        let i = 0;
        while (i < 3) {
            let currentAttackCard = this.cards.peak();
            this.cards.dequeue();
            console.log("Your attacking card is ", currentAttackCard);

            if (currentAttackCard < mod.findMinCard(computer.defence)) {
                console.log(currentAttackCard, " isn't strong enough to beat computer's defence, end of stroke.");
                battleResults.toDefender = currentAttackCard;
                break;
            }
            else {
                const cardToBeat = readline("Choose a computer's card to beat: ");
                if (cardToBeat === currentAttackCard) {
                    console.log("Card are equal, choosing next from queue");
                }
                else {
                    computer.defence[computer.defence.indexOf(cardToBeat, 0)] = -1;
                    battleResults.toAttacker.push(cardToBeat);
                    i++;
                }
            }
        }

        if (computer.defence.every(item => item === -1)) {
            computer.penalties++;
        }

        if (battleResults.toDefender !== -1) {
            computer.cards.enqueue(battleResults.toDefender);
        }
        for (let i = 0; i < battleResults.toAttacker.length; i++) {
            if (battleResults.toAttacker[i] !== -1) {
                this.cards.enqueue(battleResults.toAttacker[i]);
            }
        }
    }
}

module.exports = {
    Human
};