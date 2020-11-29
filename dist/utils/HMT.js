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
    dictSize() {
        let size = 0;
        for (let [key, value] of this.dict) {
            size += key.length + value.length;
        }
        return size;
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
    // function returns true if the string contains all 0s
    isAllZeros(str) {
        for (let i = 0; i < str.length; i++) {
            if (str[i] === "1")
                return false;
        }
        return true;
    }
    /*
      After the dictonary is built, this function is responsible for handling the corner case bug.
      When we have a case where a dictonary key has a value: '000', this induces a bug when we are decoding.
      The right bits in the number are unset i;e 0's which can be mis intrepreted
  
      Therefore we take the value with all zeros and replace its last bit to a 1
      000 -> 001
    */
    updateZeroValue(dict) {
        for (let [key, value] of dict) {
            if (this.isAllZeros(value)) {
                dict.set(key, value + "1");
            }
        }
        return dict;
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
        let dct = new Map();
        this.buildDict_util(dct, this.root);
        // Changing the string with only zeros to handle corner case
        dct = this.updateZeroValue(dct);
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