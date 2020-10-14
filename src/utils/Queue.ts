import { HeapNode } from "./MinHeap";

// This queue will mainly be used for holding array indeces during level order traversal:
export default class Queue {
  arr: Array<number>;
  constructor() {
    this.arr = new Array();
  }

  push(x: number): void {
    this.arr.push(x);
  }

  pop(): number {
    if (this.arr.length === 0) return -1;
    const front: number = this.arr[0];
    this.arr = this.arr.slice(1);
    return front;
  }

  size(): number {
    return this.arr.length;
  }

  empty(): boolean {
    return this.arr.length === 0;
  }
}
