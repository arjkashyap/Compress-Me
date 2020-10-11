// Route for text compression

import express, { Router, Request, Response } from "express";
import { createFrequencyMap } from "../../utils/FrequencyMap";

export const encodeTextRouter: Router = express.Router();

interface ResponseMsg {
  status: number;
  msg: string;
}

encodeTextRouter.get("/", (req: Request, res: Response) => {
  console.log("Get Request on text compression");
  const responseMsg: ResponseMsg = {
    status: 200,
    msg: "Get Request recieved. Now what ?",
  };
  res.json(responseMsg);
});

// @post api
// Compress string
encodeTextRouter.post("/", (req: Request, res: Response) => {
  const text: string = req.body.compressionString; // Text to be compressed
  console.log("Your string: ");
  console.log(text);
  const mp: Map<string, number> = createFrequencyMap(text);
  const responseMsg: ResponseMsg = {
    status: 200,
    msg: "Compressed",
  };
  res.json(responseMsg);
});
