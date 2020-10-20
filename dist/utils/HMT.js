"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// module builds Huffman and returns encoded string and dictionary
const MinHeap_1 = require("../utils/MinHeap");
const Queue_1 = __importDefault(require("./Queue"));
class HMT {
    constructor(text, heap) {
        this.heap = heap;
        this.text = text;
        this.root = this.buildHMT();
        this.dict = this.buildDict();
    }
    getDict() {
        return this.dict;
    }
    // build Huffman Tree
    buildHMT() {
        while (this.heap.getSize() !== 1) {
            // Extract two smallest nodes from the heap
            const lt_node = this.heap.extractMin();
            const rt_node = this.heap.extractMin();
            const newNodeData = {
                nodeType: MinHeap_1.parentNode,
                freq: lt_node.freq + rt_node.freq,
            };
            const newNode = new MinHeap_1.HeapNode(newNodeData);
            newNode.left = lt_node;
            newNode.right = rt_node;
            this.heap.push(newNode);
        }
        // this.root = this.heap.top();
        return this.heap.top();
    }
    buildDict_util(dct, root, str = "") {
        if (root.left) {
            const newStr = str + "0";
            this.buildDict_util(dct, root.left, newStr);
        }
        if (root.right) {
            const newStr = str + "1";
            this.buildDict_util(dct, root.right, newStr);
        }
        if (!(root.left && root.right)) {
            dct.set(root.char, str);
            return;
        }
        // Left -> 0
        // Right -> 1
    }
    buildDict() {
        const dct = new Map();
        this.buildDict_util(dct, this.root);
        console.log("dictonary built");
        console.log(dct);
        return dct;
    }
    display() {
        let q = new Queue_1.default();
        if (!this.root)
            return;
        let node = this.root;
        q.push(node);
        while (q.empty() === false) {
            const currNode = q.pop();
            if (currNode.char)
                process.stdout.write(`${currNode.char}: `);
            process.stdout.write(`${currNode.freq} || `);
            if (currNode.left)
                q.push(currNode.left);
            if (currNode.right)
                q.push(currNode.right);
        }
        // Display logic using queue
        console.log("");
    }
}
exports.default = HMT;
//# sourceMappingURL=HMT.js.map