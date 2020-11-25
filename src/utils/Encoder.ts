/*
    Takes a text, and a dictonary and a binary array encoded representation 

Map {        
  'e' => '0',
  'c' => '100',
  ' ' => '1010',
  'd' => '10110',
  'a' => '101110',
  'b' => '101111',
  'f' => '11'
}

 bits remaining ->  n - leftMost - 1
 7 6 5 4 3 2 1 0
*/

import { MAX_BIT } from "../constatns";

export function textEncode(
  txt: string,
  dict: Map<string, string>
): Array<number> {
  const encodedArr: Array<number> = [0]; // Array contains the number which have bit set for encoding text
  let currIndex = 0; // current array index of number whose bits are being set
  let bitPtr = 0; // position of the current bit in the number to be set
  let leftMostPos = 0;
  for (let i = 0; i < txt.length; i++) {
    const currChar: string = txt[i]; // char to be encoded
    if (!dict.get(currChar)) continue;

    const charCode: string = dict.get(currChar)!;

    const bitsRemaining = MAX_BIT - bitPtr - 1;

    if (bitsRemaining < charCode.length) {
      encodedArr.push(0);
      currIndex++;
      leftMostPos = 0;
      bitPtr = 0;
    }

    let charPtr = 0;
    while (charPtr < charCode.length) {
      if (charCode[charPtr] === "1") {
        encodedArr[currIndex] = encodedArr[currIndex] | (1 << bitPtr);
      }
      leftMostPos++;
      charPtr++;
      bitPtr++;
    }
  }
  return encodedArr;
}

// A helper function for reading and testing the set bits in encoded array
export function readBits(encodedArr: Array<number>) {
  encodedArr.forEach((e) => {
    let bin: string = e.toString(2);
    // console.log(bin, "--> ", bin.length, " bits");
  });
}
