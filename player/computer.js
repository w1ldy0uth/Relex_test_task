let mod = require("../player/player.js");

class Computer extends mod.Player {
    attack(human) {
        let battleResults = {
            toAttacker: [],
            toDefender: -1
        };

        console.log("Computer's defence cards: ", human.defence.join(" "));

        let i = 0;
        while (i < 3) {
            let currentAttackCard = this.cards.peak();
            this.cards.dequeue();
            console.log("Computer's attacking card is ", currentAttackCard);

            let minCard = mod.findMinCard(human.defence);
            if (currentAttackCard < minCard) {
                battleResults.toDefender = currentAttackCard;
                break;
            }
            else if (currentAttackCard === minCard) {
                this.cards.enqueue(currentAttackCard);
            }
            else {
                human.defence[human.defence.indexOf(minCard, 0)] = -1;
                battleResults.toAttacker.push(minCard);
                i++;
            }
        }

        if (human.defence.every(item => item === -1)) {
            human.penalties++;
        }

        if (battleResults.toDefender !== -1) {
            human.cards.enqueue(battleResults.toDefender);
        }
        for (let i = 0; i < battleResults.toAttacker.length; i++) {
            if (battleResults.toAttacker[i] !== -1) {
                this.cards.enqueue(battleResults.toAttacker[i]);
            }
        }
    }
}

module.exports = {
    Computer
};