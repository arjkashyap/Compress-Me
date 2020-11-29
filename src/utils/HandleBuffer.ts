// Module for creating buffer output from encoded text array

import * as fs from "fs";
import * as path from "path";
import { bufferCompressed, bufferUpload } from "../app";

// create a buffer file from the 32 bit UnInt Array
export function createeBufferFile(arr: Array<number>): void {
  const n: number = arr.length;
  const uint32 = new Uint32Array(n);

  for (let i = 0; i < n; i++) uint32[i] = arr[i];

  // Create and write buffer file
  const buffer = uint32.buffer;
  fs.writeFileSync(bufferCompressed, Buffer.from(buffer));
}

export async function readBufferFile(path: string): Promise<number[]> {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, buff: Buffer) => {
      let dataUint = new Uint32Array(
        buff.buffer,
        buff.byteOffset,
        buff.byteLength / 4
      );
      // const dataStandardArray: Array<number> = [];
      const restoredData: Array<number> = [];
      dataUint.forEach((e, i) => (restoredData[i] = e));
      if (err) {
        reject(err);
      }
      resolve(restoredData);
    });
  });
}
