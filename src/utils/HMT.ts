// module builds Huffman and returns encoded string and dictionary
import Minheap, { HeapNode, NodeData, parentNode } from "../utils/MinHeap";
import Queue from "./Queue";

export default class HMT {
  root: HeapNode;
  dict: Map<string, string>; // text -> code
  heap: Minheap;
  text: string; // text to be encoded
  constructor(text: string, heap: Minheap) {
    this.heap = heap;
    this.text = text;
    this.root = this.buildHMT();
    this.dict = this.buildDict();
  }

  getDict(): Map<string, string> {
    return this.dict;
  }

  dictSize(): number {
    let size: number = 0;
    for (let [key, value] of this.dict) {
      size += key.length + value.length;
    }
    return size;
  }

  // build Huffman Tree
  buildHMT(): HeapNode {
    while (this.heap.getSize() !== 1) {
      // Extract two smallest nodes from the heap
      const lt_node: HeapNode = this.heap.extractMin();
      const rt_node: HeapNode = this.heap.extractMin();
      const newNodeData: NodeData = {
        nodeType: parentNode,
        freq: lt_node.freq + rt_node.freq,
      };

      const newNode = new HeapNode(newNodeData);
      newNode.left = lt_node;
      newNode.right = rt_node;

      this.heap.push(newNode);
    }
    // this.root = this.heap.top();
    return this.heap.top();
  }

  // function returns true if the string contains all 0s
  isAllZeros(str: String): boolean {
    for (let i = 0; i < str.length; i++) {
      if (str[i] === "1") return false;
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
  updateZeroValue(dict: Map<string, string>): Map<string, string> {
    for (let [key, value] of dict) {
      if (this.isAllZeros(value)) {
        dict.set(key, value + "1");
      }
    }
    return dict;
  }

  buildDict_util(dct: Map<string, string>, root: HeapNode, str: string = "") {
    if (root.left) {
      const newStr = str + "0";
      this.buildDict_util(dct, root.left, newStr);
    }

    if (root.right) {
      const newStr = str + "1";
      this.buildDict_util(dct, root.right, newStr);
    }

    if (!(root.left && root.right)) {
      dct.set(root.char!, str);
      return;
    }
    // Left -> 0
    // Right -> 1
  }

  buildDict(): Map<string, string> {
    let dct: Map<string, string> = new Map();
    this.buildDict_util(dct, this.root);

    // Changing the string with only zeros to handle corner case
    dct = this.updateZeroValue(dct);
    return dct;
  }

  display(): void {
    let q: Queue = new Queue();
    if (!this.root) return;
    let node: HeapNode = this.root;
    q.push(node);
    while (q.empty() === false) {
      const currNode: HeapNode = q.pop();
      if (currNode.char) process.stdout.write(`${currNode.char}: `);
      process.stdout.write(`${currNode.freq} || `);
      if (currNode.left) q.push(currNode.left);
      if (currNode.right) q.push(currNode.right);
    }
    // Display logic using queue
    console.log("");
  }
}
