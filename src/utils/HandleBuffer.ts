// Module for creating buffer output from encoded text array

import * as fs from "fs";
import * as path from "path";
import { bufferCompressed, bufferUpload } from "../app";

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

// Function takes the path to a buffer file
// reads a standard typescript number array from buffer
// export async function readBufferFile(path: string): Promise<Array<number> {
//   // let restoredData: Array<number> = [];
//   const restoredData: Array<number> = [];
//   await fs.readFile(path, (err, buff: Buffer) => {
//     let dataUint = new Uint32Array(
//       buff.buffer,
//       buff.byteOffset,
//       buff.byteLength / 4
//     );
//     console.log("wha ?");
//     // data.forEach((e) => console.log(e));
//     dataUint.forEach((e, i) => (restoredData[i] = e));
//   });
//   console.log("buffer You are not suppoosed to comre her e");
//   // console.log(restoredData);
//   return restoredData;
// }

// export async function readBufferFile(path: string) {
//   const r: Array<number> = await fs.readFile(path, (err, buff: Buffer) => {
//     let dataUint = new Uint32Array(
//       buff.buffer,
//       buff.byteOffset,
//       buff.byteLength / 4
//     );
//     const dataStandardArray: Array<number> = [];
//     let restoredData: Array<number> = [];
//     dataUint.forEach((e, i) => (restoredData[i] = e));
//     console.log("restor");
//     console.log(restoredData);
//     return restoredData;
//   });
//   console.log("yeh bahar vaala restore hai !!");
//   return r;
// }

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
      // console.log("restor");
      // console.log(restoredData);
      if (err) {
        reject(err);
      }
      resolve(restoredData);
    });
  });
}
