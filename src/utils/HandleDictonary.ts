import * as fs from "fs";
import * as path from "path";
import { bufferCompressedDict } from "../app";
// interface dictObjec = {

// }

// const dictPath = path.join(__dirname, "dict", "compressed-out-dict.json");

export function createDictJson(mp: Map<string, string>): void {
  const jsonObject: any = {};
  mp.forEach((value, key) => {
    jsonObject[key] = value;
  });

  const data = JSON.stringify(jsonObject);
  console.log(JSON.stringify(jsonObject));
  fs.writeFileSync(bufferCompressedDict, data);
  console.log("here err ?");
}
