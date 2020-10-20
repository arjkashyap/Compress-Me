// Route for text compression

import express, { Router, Request, Response, json } from "express";
import { createFrequencyMap } from "../../utils/FrequencyMap";
import MinHeap, { NodeData, leafNode, HeapNode } from "../../utils/MinHeap";
import HMT from "../../utils/HMT";
import { textEncode, readBits } from "../../utils/Encoder";
export const encodeTextRouter: Router = express.Router();

interface ResponseMsg {
  status: number;
  msg: string;
}

interface ResponseText {
  status: number;
  text: Array<number>;
  dict: Array<Array<string>>;
}

// @get
// renders client service
encodeTextRouter.get("/", (req: Request, res: Response) => {
  console.log("Get Request on text compression");
  const responseMsg: ResponseMsg = {
    status: 200,
    msg: "Get Request recieved. Now what ?",
  };
  res.json(responseMsg);
});

// @post
// Compress string
encodeTextRouter.post("/", (req: Request, res: Response) => {
  const text: string = req.body.compressionString; // Text to be compressed
  let responseMsg: ResponseMsg;

  if (text.length === 0) {
    responseMsg = {
      status: 400,
      msg: "Request Message cannot be empty string",
    };
    return res.status(400).json(responseMsg);
  }

  const mp: Map<string, number> = createFrequencyMap(text);
  const heap: MinHeap = new MinHeap(); // Creating a min heap for nodes

  // Push Frequency Nodes in the Min heap
  for (let e of mp.entries()) {
    const NodeObj: NodeData = {
      nodeType: leafNode,
      char: e[0],
      freq: e[1],
    };
    const heapNode: HeapNode = new HeapNode(NodeObj);
    heap.push(heapNode);
  }

  // Create HMT from the heap of the request text
  const hmt = new HMT(text, heap);
  const dict = hmt.getDict(); // dictonary
  hmt.display();
  const encodedArray = textEncode(text, dict);
  readBits(encodedArray);

  const response: ResponseText = {
    status: 200,
    text: encodedArray,
    dict: Array.from(dict),
  };

  return res.status(200).json(response);
});
