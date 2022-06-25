import {Queue} from "../queue/queue.js"

/**
 * Fisher-Yates algorithm for shuffling the array.
 *
 * @param (array) - an array that should be shuffled.
 */
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // random index from [0, i] range
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export class Player {
    constructor() {
        this.state = "Attacker";
        this.penalties = 0;

        let deck = [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4];
        shuffle(deck);
        this.cards = new Queue();
        for (let item of deck) {
            this.cards.enqueue(item);
        }

        this.defence = [-1, -1, -1];
        this.refreshDefence();
    }

    /**
     * Changes state of player to opposite (Attacker to Defender and vice versa).
     */
    changeState() {
        this.state = this.state === "Attacker" ? "Defender" : "Attacker";
    }

    /**
     * Restores lost cards with new ones from card queue.
     */
    refreshDefence() {
        for (let i = 0; i < 3; i++) {
            if (this.defence[i] === -1) {
                this.defence[i] = this.cards.peak();
                this.cards.dequeue();
            }
        }
    }

    /**
     * Checks if player has no cards left.
     */
    hasNoCards() {
        return this.cards.isEmpty;
    }
}

// Tests

// let player = new Player();
// player.changeState();
// console.log("Debugged");