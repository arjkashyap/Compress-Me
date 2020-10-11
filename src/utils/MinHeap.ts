// Type specification for Tree node
// type 0 -> Node is sum node of two leaf nodes
// type 1 -> leaf node of type FreqNode
const sumNode = 0;
const freqNode = 1;

interface FreqNode {
  char: string;
  freq: number;
}

class HeapNode {
  nodeType: number;
  value: number | FreqNode;
  constructor(nodeType: number, value: number | FreqNode) {
    this.nodeType = nodeType;
    this.value = value;
  }
}
