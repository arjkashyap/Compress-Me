import express, { Router, Request, Response } from "express";
import { convertArrayToDict, decodeText } from "../../utils/Decoder";
import { orignalTex } from "./encode-text";
import { DecoderResponse } from "../../types";
import { bufferUpload } from "../../app";

export const decodeTextRouter: Router = express.Router();

/*
"text": [777806, 2144547616, 65535]

"dict": [["c","00"],[" ","010"],[ "d", "0110"],["a","01110"],["b","01111"],["e", "1"]]

   // "dict": [["c","00"],[" ","010"],[ "d", "0110"],["a","01110"],["b","01111",["e", "1"]]
    // "dict": [["c", "00"]]
*/

// decodeTextRouter.post("/", (req: Request, res: Response) => {
//   const text: Array<number> = req.body.text;
//   const dict: Map<string, string> = convertArrayToDict(req.body.dict);
//   // console.log("Orignal text is : ", orignalTex);
//   // console.log(text);
//   console.log("Decodding text");

//   const decodedText: string = decodeText(text, dict);

//   const response: DecoderResponse = {
//     status: 200,
//     text: decodedText,
//   };

//   return res.status(200).json(response);
// });

decodeTextRouter.post("/", (req: Request, res: Response) => {
  console.log("req ");
  if (req.files) {
    console.log(req.files);
    // const file = req.files.filename;
    // console.log(file);
    const file = req.files.myFile;
    // console.log("f _> ");
    // console.log(f);
    // const filename = file.name;

    file.mv("./src/utils/buffer-store" + "/compressed-upload", (err) => {
      if (err) {
        console.log(err);
        return res.send("error occured");
      }

      return res.status(200).send("done");
    });
  }
});
