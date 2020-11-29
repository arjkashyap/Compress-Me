"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// This queue will mainly be used for holding array indeces during level order traversal:
class Queue {
    constructor() {
        this.arr = new Array();
    }
    push(x) {
        this.arr.push(x);
    }
    pop() {
        if (this.arr.length === 0)
            return -1;
        const front = this.arr[0];
        this.arr = this.arr.slice(1);
        return front;
    }
    size() {
        return this.arr.length;
    }
    empty() {
        return this.arr.length === 0;
    }
}
exports.default = Queue;
//# sourceMappingURL=Queue.js.map