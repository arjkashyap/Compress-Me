"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.readBits = exports.textEncode = void 0;
const MAXBITS = 32;
function textEncode(txt, dict) {
    const encodedArr = [0]; // Array contains the number which have bit set for encoding text
    let currIndex = 0; // current array index of number whose bits are being set
    let bitPtr = 0; // position of the current bit in the number to be set
    let leftMostPos = 0;
    for (let i = 0; i < txt.length; i++) {
        const currChar = txt[i]; // char to be encoded
        if (!dict.get(currChar))
            continue;
        const charCode = dict.get(currChar);
        const bitsRemaining = MAXBITS - bitPtr - 1;
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
exports.textEncode = textEncode;
// A helper function for reading and testing the set bits in encoded array
function readBits(encodedArr) {
    encodedArr.forEach((e) => {
        let bin = e.toString(2);
        console.log(e, bin, bin.length);
    });
}
exports.readBits = readBits;
//# sourceMappingURL=Encoder.js.map