import Queue from "./Queue";

////////////////////////////////////////////////////////////////////
///////////////////////// Type Definations /////////////////////////
////////////////////////////////////////////////////////////////////

export const leafNode = "leafnode"; // Node carrying the char frequency
export const parentNode = "parentNode"; // Node carrying sum of char freq of leaf nodes

export interface NodeData {
  nodeType: string;
  char?: string;
  freq: number;
}

////////////////////////////////////////////////////////////////////
///////////////////////// MinHeap //////////////////////////////////
////////////////////////////////////////////////////////////////////

export class HeapNode {
  nodeType: string;
  char?: string;
  freq: number;
  constructor(node: NodeData) {
    this.nodeType = node.nodeType;
    this.char = node.char;
    this.freq = node.freq;
  }
}

export default class MinHeap {
  arr: Array<HeapNode | null>;
  size: number;
  cap: number = 1000; // max capacity of heap
  constructor() {
    this.arr = new Array();
    this.size = 0;
  }

  getSize(): number {
    return this.size;
  }

  // retuns true if n1 is smaller than n2
  compareNodes(n1: HeapNode, n2: HeapNode): boolean {
    const v1: number = n1.freq;
    const v2: number = n2.freq;
    return v1 < v2;
  }

  // get index of left child
  leftChildIndex(pi: number): number {
    const lt = 2 * pi + 1;
    if (lt >= this.cap) return 0;

    return lt;
  }

  // get index of right child
  rightChildIndex(pi: number): number {
    const rt = 2 * pi + 2;
    if (rt >= this.cap) return 0;

    return rt;
  }

  // get parent index
  parentIndex(ci: number): number {
    if (ci == 0) return -1;
    return Math.floor((ci - 1) / 2);
  }

  push(node: HeapNode): void {
    if (this.size === this.cap) {
      throw "Heap Capacity exceed";
    }
    this.size++;
    this.arr[this.size - 1] = node;

    for (let i = this.size - 1; i !== 0; ) {
      if (
        this.compareNodes(this.arr[i]!, this.arr[this.parentIndex(i)]!) ===
        false
      )
        break;
      // swapping nodes
      let tmp = this.arr[i];
      this.arr[i] = this.arr[this.parentIndex(i)];
      this.arr[this.parentIndex(i)] = tmp;
      i = this.parentIndex(i);
    }
  }

  // Display heap content (level order) for testing
  display(): void {
    // this.arr.forEach((e, i) => (s += `${i} - ${e?.char} - ${e?.freq} || `));
    let q: Queue = new Queue();
    q.push(0);
    while (q.empty() === false) {
      const currIndex = q.pop();
      if (currIndex > 12) break;
      const curr: string | undefined = this.arr[currIndex]?.char;
      const print: string = `${curr === undefined ? "" : curr} : ${
        this.arr[currIndex]?.freq
      }`;
      console.log(print);
      if (this.leftChildIndex(currIndex) < this.arr.length)
        q.push(this.leftChildIndex(currIndex));
      if (this.rightChildIndex(currIndex) < this.arr.length)
        q.push(this.rightChildIndex(currIndex));
    }
  }
}
