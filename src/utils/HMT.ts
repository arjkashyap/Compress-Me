// module builds Huffman and returns encoded string and dictionary
import Minheap, { HeapNode, NodeData, parentNode } from "../utils/MinHeap";
import Queue from "./Queue";

export default class HMT {
  root: HeapNode | null;
  dict: Map<string, string> | null;
  heap: Minheap;
  constructor(heap: Minheap) {
    this.root = null;
    this.dict = null;
    this.heap = heap;

    this.buildHMT();
  }

  // build Huffman Tree
  buildHMT() {
    console.log("Building HMT");
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
    this.root = this.heap.top();
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
