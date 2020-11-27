import express, { Router, Request, Response } from "express";
import { convertArrayToDict, decodeText } from "../../utils/Decoder";
import { orignalTex } from "./encode-text";
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

decodeTextRouter.post("/", async (req: Request, res: Response) => {
  console.log("main cheez ");
  // Read the uploaded buffer file
  // const compressedTxt: Array<number> = await readBufferFile(bufferUpload);
  let compressedTxt: Array<number> = await readBufferFile(bufferUpload);

  // console.log("my compressed texr !!!!!!!!!!!!!!!!!!!!!!!! ");
  // console.log(compressedTxt);
  const dict: Map<string, string> = convertJsonToMap();
  console.log("dict");

  const decodedText: string = decodeText(compressedTxt, dict);

  const response: DecoderResponse = {
    status: 200,
    text: decodedText,
  };

  // console.log("decode text now");
  // console.log(decodedText);

  return res.status(200).json(response);

  // const dict: Map<string, string> = convertArrayToDict()
});

// Route for uploading buffer file during compression
decodeTextRouter.post("/upload-buffer", (req: Request, res: Response) => {
  console.log("Buffer file upload request");
  if (req.files) {
    console.log(req.files);
    // const file = req.files.filename;
    // console.log(file);
    const file = req.files.myFile;
    // console.log("f _> ");
    // console.log(f);
    // const filename = file.name;

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
    // const file = req.files.filename;
    // console.log(file);
    const file = req.files.myFile;
    // console.log("f _> ");
    // console.log(f);
    // const filename = file.name;

    file.mv("./src/routes/api/uploads" + "/compressed-dict.json", (err) => {
      if (err) {
        console.log(err);
        return res.send("error occured");
      }

      return res.status(200).send("done");
    });
  }
});
