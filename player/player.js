import {Queue} from "../queue/queue.js"

/**
 * Fisher-Yates algorithm for shuffling the array.
 *
 * @param {array} arr - an array that should be shuffled.
 */
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // random index from [0, i] range
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

/**
 * Finds minimal existing card in array of cards.
 *
 * The main purpose of this function is to find minimal card that is not equal to -1 (beaten card).
 *
 * @param {array} arr - an array with defence cards.
 *
 * @return {number}  minimal existing defence card.
 */
export function findMinCard(arr) {
    let min = arr.find(item => item !== -1);
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < min && arr[i] !== -1)
            min = arr[i];
    }
    return min;
}

export class Player {
    constructor() {
        this.state = "Defender";
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