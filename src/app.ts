import express, { Application, Request, Response } from "express";
import * as path from "path";
import * as bodyParser from "body-parser";
import { encodeTextRouter } from "./routes/api/encode-text";
import { decodeTextRouter } from "./routes/api/decode-text";

const upload = require("express-fileupload");

const app: Application = express();
const PORT: any = process.env.PORT || 5000;

export const bufferCompressed = path.join(
  __dirname,
  "utils",
  "buffer-store",
  "compressed-out"
);

// Compresse file uploaded by the user during decompress request
export const bufferUpload = path.join(
  __dirname,
  "utile",
  "buffer-store",
  "compressed-upload"
);

app.use(upload());

app.use(bodyParser.json());

// console.log(__dirname + "/client");
app.use(express.static(__dirname + "/client"));

// locahsot:500/
app.get("/", (req: Request, res: Response) => {
  console.log("Get request recieved");
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

// Download compressed file
app.get("/download-compressed", (req, res) => {
  console.log("Getting Compressed file");
  res.download(bufferCompressed);
});

// API Routes
app.use("/api/encode-text", encodeTextRouter);
app.use("/api/decode-text", decodeTextRouter);

app.listen(PORT, () => console.log(`Server Started on PORT ${PORT}`));
