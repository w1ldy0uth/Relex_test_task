import {Queue} from "../queue/queue.js"

let queue = new Queue();

if (queue === undefined) {
    throw new Error("Queue isn't creating right");
}

if (queue.tail !== 0 || queue.head !== 0) {
    throw new Error("Queue has wrong boundaries after creating");
}

console.log("All queue tests passed");