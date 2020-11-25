// Route for text compression

import express, { Router, Request, Response } from "express";
import { createFrequencyMap } from "../../utils/FrequencyMap";
import MinHeap, { NodeData, leafNode, HeapNode } from "../../utils/MinHeap";
import HMT from "../../utils/HMT";
import { textEncode, readBits } from "../../utils/Encoder";
import { EncoderResponse } from "../../types";
import * as path from "path";

export const encodeTextRouter: Router = express.Router();
export let orignalTex: string;
interface ResponseMsg {
  status: number;
  msg: string;
}

// @post
// Compress string
encodeTextRouter.post("/", (req: Request, res: Response) => {
  const text: string = req.body.compressionString; // Text to be compressed
  orignalTex = text;
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

  const orignalTextSize = text.length;
  const encodedTextSize = encodedArray.length * 4;

  console.log(
    `Size of orignal text: ${orignalTextSize} bytes. Size of Encoded text: ${encodedTextSize} bytes.`
  );
  const compressionPercent: number =
    ((encodedArray.length * 4) / text.length) * 100;

  const eff = ((text.length - encodedArray.length * 4) / text.length) * 100;
  console.log(`Text compressed by ${eff.toFixed(3)} %`);
  console.log("Size of dictionary is : ", hmt.dictSize(), " bytes");

  const response: EncoderResponse = {
    status: 200,
    orignalSize: orignalTextSize,
    text: encodedArray,
    textSize: encodedTextSize,
    dict: Array.from(dict),
    eff: compressionPercent,
  };

  const resultFile = path.join(__dirname, "tmp", "result.txt");
  return res.status(200).json(response);
  // return res.status(200).download(resultFile);
});
