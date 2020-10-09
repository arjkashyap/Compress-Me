import express, { Application, Request, Response } from "express";
import * as path from "path";

const app: Application = express();
const PORT: number = 5000;

app.get("/", (req: Request, res: Response) => {
  console.log(__dirname);
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

app.listen(PORT, () => console.log(`Server Started on PORT ${PORT}`));
