import express, { Router, Request, Response } from "express";
import { convertArrayToDict, decodeText } from "../../utils/Decoder";

export const decodeTextRouter: Router = express.Router();

/*
"text": [777806, 2144547616, 65535]

"dict": [["c","00"],[" ","010"],[ "d", "0110"],["a","01110"],["b","01111"],["e", "1"]]

   // "dict": [["c","00"],[" ","010"],[ "d", "0110"],["a","01110"],["b","01111",["e", "1"]]
    // "dict": [["c", "00"]]
*/

decodeTextRouter.post("/", (req: Request, res: Response) => {
  const text: Array<number> = req.body.text;
  const dict: Map<string, string> = convertArrayToDict(req.body.dict);

  console.log(text);
  console.log(dict);
  console.log("Decodding text");

  const decodedText: string = decodeText(text, dict);

  res.send("Post request on decode text");
});
