import * as fs from "fs";
import * as path from "path";
import { bufferCompressedDict } from "../app";
import * as jsonDict from "../routes/api/uploads/compressed-dict.json";
// interface dictObjec = {

// }

// const dictPath = path.join(__dirname, "dict", "compressed-out-dict.json");

// read uploaded json file and return a map
export function createDictJson(mp: Map<string, string>): void {
  const jsonObject: any = {};
  mp.forEach((value, key) => {
    // value = jsonObject[key];
    jsonObject[key] = value;
  });

  const data = JSON.stringify(jsonObject);
  console.log(JSON.stringify(jsonObject));
  fs.writeFileSync(bufferCompressedDict, data);
  console.log("here err ?");
}

// Function converts the uploaded json dictonary to map
export function convertJsonToMap(): Map<string, string> {
  const dict: Map<string, string> = new Map(Object.entries(jsonDict));
  console.log("map dict");
  return dict;
}
