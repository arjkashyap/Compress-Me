import express, { Application, Request, Response } from "express";
import * as path from "path";

const app: Application = express();
const PORT: any = process.env.PORT || 5000;

app.get("/", (req: Request, res: Response) => {
  console.log("Get request recieved");
  //   res.sendFile(path.join(__dirname, "client", "index.html"));
  res.send("Compress ME !!");
});

app.listen(PORT, () => console.log(`Server Started on PORT ${PORT}`));
