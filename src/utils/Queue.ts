// This queue will mainly be used for holding array indeces during level order traversal:
export default class Queue {
  arr: Array<any>;
  constructor() {
    this.arr = new Array();
  }

  push(x: any): void {
    this.arr.push(x);
  }

  pop(): any {
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
