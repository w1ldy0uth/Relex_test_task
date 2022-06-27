let mod = require("../player/player.js");

// to get input from user's CLI
const readline = require("prompt-sync")();

class Human extends mod.Player {
    /**
     * Method that triggers attack event (human on computer).
     * Attack works by principle of choosing the card that real player wants to try to beat.
     *
     * @param {Player} computer - an AI player
     */
    attack(computer) {
        // handles battle results
        let battleResults = {
            toAttacker: [],
            toDefender: -1
        };

        let i = 0;
        while (i < 3) {
            console.log("Computer's defence cards:", computer.defence.join(" "));

            let currentAttackCard = this.cards.peak();
            console.log("Your attacking card is", currentAttackCard);

            let cardToBeat = readline("Choose a computer's card to beat: ");
            cardToBeat = parseInt(cardToBeat);

            // if attack choice of user is not presented in defence of AI
            if (cardToBeat === -1 || computer.defence.indexOf(cardToBeat, 0) === -1) {
                console.log("Wrong card picked, try one again");
            }
            else if (currentAttackCard < cardToBeat && !(currentAttackCard === 0 && cardToBeat === 4)) {
                console.log(currentAttackCard, "isn't strong enough to beat computer's defence");
                battleResults.toDefender = currentAttackCard;
                this.cards.dequeue();
                break;
            }
            else if (cardToBeat === currentAttackCard) {
                console.log("Card are equal, choosing next from queue");
                this.cards.dequeue();
                this.cards.enqueue(currentAttackCard);
            }
            else if (currentAttackCard > cardToBeat || (cardToBeat === 4 && currentAttackCard === 0)) {
                computer.defence[computer.defence.indexOf(cardToBeat, 0)] = -1;
                battleResults.toAttacker.push(cardToBeat);
                this.cards.dequeue();
                i++;
            }
        }

        console.log("\nEnd of turn");
        if (computer.defence.every(item => item === -1)) {
            computer.penalties++;
            console.log("Computer got plus one penalty score. Its current penalties:", computer.penalties);
        }

        if (battleResults.toDefender !== -1) {
            console.log("Computer got new card:", battleResults.toDefender);
            computer.cards.enqueue(battleResults.toDefender);
        }
        if (battleResults.toAttacker.length === 0) {
            console.log("You haven't beat any card of computer");
        }
        else {
            console.log("You beat this computer's cards:", battleResults.toAttacker.join(" "));
        }
        for (let i = 0; i < battleResults.toAttacker.length; i++) {
            this.cards.enqueue(battleResults.toAttacker[i]);
        }
        console.log("-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-\n");
    }
}

module.exports = {
    Human
};