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
///////////////////////// HMT Node structure////////////////////////
////////////////////////////////////////////////////////////////////

export class HeapNode {
  nodeType: string;
  char?: string;
  freq: number;

  left: HeapNode | null;
  right: HeapNode | null;

  constructor(node: NodeData) {
    this.nodeType = node.nodeType;
    this.char = node.char;
    this.freq = node.freq;

    this.left = null;
    this.right = null;
  }
}

////////////////////////////////////////////////////////////////////
///////////////////////// MinHeap //////////////////////////////////
////////////////////////////////////////////////////////////////////

export default class MinHeap {
  arr: Array<HeapNode>;
  size: number;
  cap: number = 1000; // max capacity of heap
  constructor() {
    this.arr = new Array();
    this.size = 0;
  }

  top(): HeapNode {
    return this.arr[0];
  }

  getSize(): number {
    return this.arr.length;
  }

  // retuns true if n1 is smaller than n2
  compareNodes(n1: HeapNode, n2: HeapNode): boolean {
    return n1.freq < n2.freq;
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

  // 0 1 2 3 4 5
  // x - - - - -
  // x x x - - -
  // x x x x x -

  push(node: HeapNode): void {
    if (this.size === this.cap) {
      throw "Heap Capacity exceed";
    }
    this.size++;
    this.arr.push(node);
    for (let i = this.size - 1; i !== 0; ) {
      if (
        this.compareNodes(this.arr[i], this.arr[this.parentIndex(i)]) === false
      )
        break;
      // swapping nodes
      let tmp = this.arr[i];
      this.arr[i] = this.arr[this.parentIndex(i)];
      this.arr[this.parentIndex(i)] = tmp;
      i = this.parentIndex(i);
    }
  }

  extractMin(): HeapNode {
    const i: number = 0;
    const min: HeapNode = this.arr[i];
    // swapping
    const tmp: HeapNode = this.arr[i];
    this.arr[i] = this.arr[this.arr.length - 1];
    this.arr[this.arr.length - 1] = tmp;

    // delete node
    this.arr.pop();
    this.size--;
    this.heapify(i);
    return min;
  }

  heapify(index: number): void {
    let smallest: number = index;
    let lt: number = this.leftChildIndex(index);
    let rt: number = this.rightChildIndex(index);

    if (lt < this.arr.length && this.arr[lt].freq < this.arr[smallest].freq)
      smallest = lt;
    if (rt < this.arr.length && this.arr[rt].freq < this.arr[smallest].freq)
      smallest = rt;
    if (smallest != index) {
      let tmp: HeapNode = this.arr[smallest];
      this.arr[smallest] = this.arr[index];
      this.arr[index] = tmp;
      this.heapify(smallest);
    }
  }

  show(): void {
    console.log(this.arr);
  }

  // Display heap content (level order) for testing
  display(): void {
    let q: Queue = new Queue();
    q.push(0);
    while (q.empty() === false) {
      const currIndex = q.pop();
      if (currIndex > 12) break;
      const curr: string | undefined = this.arr[currIndex]?.char;
      const print: string = `${curr === undefined ? "" : curr} : ${
        this.arr[currIndex]?.freq
      } || `;
      process.stdout.write(print + " ");
      if (this.leftChildIndex(currIndex) < this.arr.length)
        q.push(this.leftChildIndex(currIndex));
      if (this.rightChildIndex(currIndex) < this.arr.length)
        q.push(this.rightChildIndex(currIndex));
    }
    console.log("");
  }
}
