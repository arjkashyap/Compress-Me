// A utility function that converts the decoder request array to the Dictonary map
// Dict format:
// code -> text

import { FORMERR } from "dns";

const MAX_BIT = 32;

export function convertArrayToDict(
  arr: Array<Array<string>>
): Map<string, string> {
  const dict: Map<string, string> = new Map<string, string>();

  for (let i = 0; i < arr.length; i++) {
    dict.set(arr[i][1], arr[i][0]);
  }
  return dict;
}

/*
"text": [777806, 2144547616, 65535]

"dict": [["c","00"],[" ","010"],[ "d", "0110"],["a","01110"],["b","01111"],["e", "1"]]

   // "dict": [["c","00"],[" ","010"],[ "d", "0110"],["a","01110"],["b","01111",["e", "1"]]
    // "dict": [["c", "00"]]
*/

// Functino takes the encoded text and the dictionary and decompresses the text
export function decodeText(
  encodedArray: Array<number>,
  dict: Map<string, string>
): string {
  let result: string = "";
  encodedArray.forEach((code: number, index: number) => {
    console.log("decoding: ", code);
    let local_code: string = "";
    let bitPtr = 0;
    for (let k = 0; k < MAX_BIT; k++) {
      // check if the bit at k index is set
      const isBitSet: boolean = (code & (1 << k)) !== 0 ? true : false;
      if (isBitSet) {
        local_code += "1";
      } else {
        local_code += "0";
      }

      if (dict.has(local_code)) {
        result += dict.get(local_code);
        local_code = "";
      }
    }
  });
  console.log(result);
  return result;
}
