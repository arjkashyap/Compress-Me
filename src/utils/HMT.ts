// module builds Huffman and returns encoded string and dictionary
import Minheap, { HeapNode, NodeData, parentNode } from "../utils/MinHeap";
import Queue from "./Queue";

export default class HMT {
  root: HeapNode;
  dict: Map<string, string>;
  heap: Minheap;
  text: string; // text to be encoded
  constructor(text: string, heap: Minheap) {
    this.heap = heap;
    this.text = text;
    this.root = this.buildHMT();
    this.dict = this.buildDict();
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
    const dct: Map<string, string> = new Map();
    this.buildDict_util(dct, this.root);
    console.log("dictonary built");
    console.log(dct);
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
