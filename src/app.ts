import express, { Application, Request, Response } from "express";
import * as path from "path";
import * as bodyParser from "body-parser";
import { encodeTextRouter } from "./routes/api/encode-text";
import { decodeTextRouter } from "./routes/api/decode-text";

const app: Application = express();
const PORT: any = process.env.PORT || 5000;

app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  console.log("Get request recieved");
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

// API Routes
app.use("/api/encode-text", encodeTextRouter);
app.use("/api/decode-text", decodeTextRouter);

app.listen(PORT, () => console.log(`Server Started on PORT ${PORT}`));
