let mod = require("../player/player.js");

class Computer extends mod.Player {
    /**
     * Method that triggers attack event (computer on human).
     * Attack works by principle of beating card with minimal value (or 4 with 0, if possible).
     *
     * @param {Player} human - a real player
     */
    attack(human) {
        // handles battle results
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

            // gets minimal card and compares it to current first card in queue
            let minCard = mod.findMinCard(human.defence);
            if (currentAttackCard < minCard && !(currentAttackCard === 0 && human.defence.indexOf(4, 0) !== -1)) {
                battleResults.toDefender = currentAttackCard;
                break;
            }
            else if (currentAttackCard === minCard) {
                this.cards.enqueue(currentAttackCard);
            }
            // possible attack "4 with 0"
            else if (currentAttackCard === 0 && human.defence.indexOf(4, 0) !== -1) {
                human.defence[human.defence.indexOf(4, 0)] = -1;
                battleResults.toAttacker.push(4);
                i++;
            }
            else if (currentAttackCard > minCard) {
                human.defence[human.defence.indexOf(minCard, 0)] = -1;
                battleResults.toAttacker.push(minCard);
                i++;
            }
        }

        console.log("\nEnd of turn");
        if (human.defence.every(item => item === -1)) {
            human.penalties++;
            console.log("You got plus one penalty score. Your current penalties:", human.penalties);
        }

        if (battleResults.toDefender !== -1) {
            console.log("You got new card:", battleResults.toDefender);
            human.cards.enqueue(battleResults.toDefender);
        }
        if (battleResults.toAttacker.length === 0) {
            console.log("Computer haven't beat any card of yours");
        }
        else {
            console.log("Computer beat this your cards:", battleResults.toAttacker.join(" "));
        }
        for (let i = 0; i < battleResults.toAttacker.length; i++) {
            this.cards.enqueue(battleResults.toAttacker[i]);
        }
        console.log("-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-\n");
    }
}

module.exports = {
    Computer
};