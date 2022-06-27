let mod = require("../player/player.js");

class Computer extends mod.Player {
    attack(human) {
        let battleResults = {
            toAttacker: [],
            toDefender: -1
        };

        let i = 0;
        while (i < 3) {
            console.log("Human's defence cards:", human.defence.join(" "));
            let currentAttackCard = this.cards.peak();
            this.cards.dequeue();
            console.log("Computer's attacking card:", currentAttackCard);

            let minCard = mod.findMinCard(human.defence);
            if (currentAttackCard < minCard) {
                battleResults.toDefender = currentAttackCard;
                break;
            }
            else if (currentAttackCard === minCard) {
                this.cards.enqueue(currentAttackCard);
            }
            else if (currentAttackCard > minCard || (minCard === 4 && currentAttackCard === 0)) {
                human.defence[human.defence.indexOf(minCard, 0)] = -1;
                battleResults.toAttacker.push(minCard);
                i++;
            }
        }

        if (human.defence.every(item => item === -1)) {
            human.penalties++;
            console.log("You got plus one penalty score. Your current penalties:", human.penalties);
        }

        if (battleResults.toDefender !== -1) {
            console.log("You got new card:", battleResults.toDefender);
            human.cards.enqueue(battleResults.toDefender);
        }
        console.log("Computer beat this your cards", battleResults.toAttacker.join(" "));
        for (let i = 0; i < battleResults.toAttacker.length; i++) {
                this.cards.enqueue(battleResults.toAttacker[i]);
        }
    }
}

module.exports = {
    Computer
};