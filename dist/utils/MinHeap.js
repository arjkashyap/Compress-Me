"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeapNode = exports.parentNode = exports.leafNode = void 0;
const Queue_1 = __importDefault(require("./Queue"));
////////////////////////////////////////////////////////////////////
///////////////////////// Type Definations /////////////////////////
////////////////////////////////////////////////////////////////////
exports.leafNode = "leafnode"; // Node carrying the char frequency
exports.parentNode = "parentNode"; // Node carrying sum of char freq of leaf nodes
////////////////////////////////////////////////////////////////////
///////////////////////// HMT Node structure////////////////////////
////////////////////////////////////////////////////////////////////
class HeapNode {
    constructor(node) {
        this.nodeType = node.nodeType;
        this.char = node.char;
        this.freq = node.freq;
        this.left = null;
        this.right = null;
    }
}
exports.HeapNode = HeapNode;
////////////////////////////////////////////////////////////////////
///////////////////////// MinHeap //////////////////////////////////
////////////////////////////////////////////////////////////////////
class MinHeap {
    constructor() {
        this.cap = 1000; // max capacity of heap
        this.arr = new Array();
        this.size = 0;
    }
    top() {
        return this.arr[0];
    }
    getSize() {
        return this.arr.length;
    }
    // retuns true if n1 is smaller than n2
    compareNodes(n1, n2) {
        return n1.freq < n2.freq;
    }
    // get index of left child
    leftChildIndex(pi) {
        const lt = 2 * pi + 1;
        if (lt >= this.cap)
            return 0;
        return lt;
    }
    // get index of right child
    rightChildIndex(pi) {
        const rt = 2 * pi + 2;
        if (rt >= this.cap)
            return 0;
        return rt;
    }
    // get parent index
    parentIndex(ci) {
        if (ci == 0)
            return -1;
        return Math.floor((ci - 1) / 2);
    }
    // 0 1 2 3 4 5
    // x - - - - -
    // x x x - - -
    // x x x x x -
    push(node) {
        if (this.size === this.cap) {
            throw "Heap Capacity exceed";
        }
        this.size++;
        this.arr.push(node);
        for (let i = this.size - 1; i !== 0;) {
            if (this.compareNodes(this.arr[i], this.arr[this.parentIndex(i)]) === false)
                break;
            // swapping nodes
            let tmp = this.arr[i];
            this.arr[i] = this.arr[this.parentIndex(i)];
            this.arr[this.parentIndex(i)] = tmp;
            i = this.parentIndex(i);
        }
    }
    extractMin() {
        const i = 0;
        const min = this.arr[i];
        // swapping
        const tmp = this.arr[i];
        this.arr[i] = this.arr[this.arr.length - 1];
        this.arr[this.arr.length - 1] = tmp;
        // delete node
        this.arr.pop();
        this.size--;
        this.heapify(i);
        return min;
    }
    heapify(index) {
        let smallest = index;
        let lt = this.leftChildIndex(index);
        let rt = this.rightChildIndex(index);
        if (lt < this.arr.length && this.arr[lt].freq < this.arr[smallest].freq)
            smallest = lt;
        if (rt < this.arr.length && this.arr[rt].freq < this.arr[smallest].freq)
            smallest = rt;
        if (smallest != index) {
            let tmp = this.arr[smallest];
            this.arr[smallest] = this.arr[index];
            this.arr[index] = tmp;
            this.heapify(smallest);
        }
    }
    show() {
        console.log(this.arr);
    }
    // Display heap content (level order) for testing
    display() {
        var _a, _b;
        let q = new Queue_1.default();
        q.push(0);
        while (q.empty() === false) {
            const currIndex = q.pop();
            if (currIndex > 12)
                break;
            const curr = (_a = this.arr[currIndex]) === null || _a === void 0 ? void 0 : _a.char;
            const print = `${curr === undefined ? "" : curr} : ${(_b = this.arr[currIndex]) === null || _b === void 0 ? void 0 : _b.freq} || `;
            process.stdout.write(print + " ");
            if (this.leftChildIndex(currIndex) < this.arr.length)
                q.push(this.leftChildIndex(currIndex));
            if (this.rightChildIndex(currIndex) < this.arr.length)
                q.push(this.rightChildIndex(currIndex));
        }
        console.log("");
    }
}
exports.default = MinHeap;
//# sourceMappingURL=MinHeap.js.map