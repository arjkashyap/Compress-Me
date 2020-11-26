// Module for creating buffer output from encoded text array

import * as fs from "fs";
import * as path from "path";
import { bufferCompressed } from "../app";

// const outFile: string = path.join(__dirname, "buffer-store", "out");

// create a buffer file from the 32 bit UnInt Array
export function createeBufferFile(arr: Array<number>): void {
  const n: number = arr.length;
  const uint32 = new Uint32Array(n);

  for (let i = 0; i < n; i++) uint32[i] = arr[i];

  // Create and write buffer file
  const buffer = uint32.buffer;
  fs.writeFileSync(bufferCompressed, Buffer.from(buffer));
  console.log("Buffer file written");
}

export function readBufferFile() {
  fs.readFile(bufferCompressed, (err, buff: Buffer) => {
    let restoredData = new Uint32Array(
      buff.buffer,
      buff.byteOffset,
      buff.byteLength / 4
    );
    restoredData.forEach((e) => console.log(e));
  });
}
