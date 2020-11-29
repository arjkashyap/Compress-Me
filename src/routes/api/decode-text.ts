import express, { Router, Request, Response } from "express";
import { decodeText } from "../../utils/Decoder";
import { DecoderResponse } from "../../types";
import { bufferUpload } from "../../app";
import { readBufferFile } from "../../utils/HandleBuffer";
import { convertJsonToMap } from "../../utils/HandleDictonary";

export const decodeTextRouter: Router = express.Router();

/*
"text": [777806, 2144547616, 65535]

"dict": [["c","00"],[" ","010"],[ "d", "0110"],["a","01110"],["b","01111"],["e", "1"]]

   // "dict": [["c","00"],[" ","010"],[ "d", "0110"],["a","01110"],["b","01111",["e", "1"]]
    // "dict": [["c", "00"]]
*/

decodeTextRouter.post("/", async (req: Request, res: Response) => {
  let compressedTxt: Array<number> = await readBufferFile(bufferUpload);

  const dict: Map<string, string> = convertJsonToMap();

  const decodedText: string = decodeText(compressedTxt, dict);

  const response: DecoderResponse = {
    status: 200,
    text: decodedText,
  };

  return res.status(200).json(response);
});

// Route for uploading buffer file during compression
decodeTextRouter.post("/upload-buffer", (req: Request, res: Response) => {
  if (req.files) {
    console.log(req.files);
    const file = req.files.myFile;

    file.mv("./src/routes/api/uploads" + "/compressed-upload", (err) => {
      if (err) {
        console.log(err);
        return res.send("error occured");
      }

      return res.status(200).send("done");
    });
  }
});

// route for uploading json file
decodeTextRouter.post("/upload-json", (req: Request, res: Response) => {
  console.log("Json file recieved");

  if (req.files) {
    console.log(req.files);
    const file = req.files.myFile;

    file.mv("./src/routes/api/uploads" + "/compressed-dict.json", (err) => {
      if (err) {
        console.log(err);
        return res.send("error occured");
      }

      return res.status(200).send("done");
    });
  }
});
