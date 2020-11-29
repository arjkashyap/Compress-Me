"use strict";
// A utility function that converts the decoder request array to the Dictonary map
// Dict format:
// code -> text
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeText = exports.convertArrayToDict = void 0;
const constatns_1 = require("../constatns");
// import { DecoderResponse } from "../types";
function convertArrayToDict(arr) {
    const dict = new Map();
    for (let i = 0; i < arr.length; i++) {
        dict.set(arr[i][1], arr[i][0]);
    }
    return dict;
}
exports.convertArrayToDict = convertArrayToDict;
/*
"text": [777806, 2144547616, 65535]

"dict": [["c","00"],[" ","010"],[ "d", "0110"],["a","01110"],["b","01111"],["e", "1"]]

   // "dict": [["c","00"],[" ","010"],[ "d", "0110"],["a","01110"],["b","01111",["e", "1"]]
    // "dict": [["c", "00"]]
*/
// Functino takes the encoded text and the dictionary and decompresses the text
function decodeText(encodedArray, mp) {
    // Inverting the map
    const dict = new Map(Array.from(mp, (entry) => [entry[1], entry[0]]));
    let result = "";
    encodedArray.forEach((code, index) => {
        let local_code = "";
        let bitPtr;
        for (bitPtr = 0; bitPtr < constatns_1.MAX_BIT; bitPtr++) {
            // check if the bit at k index is set
            const isBitSet = (code & (1 << bitPtr)) !== 0 ? true : false;
            if (isBitSet) {
                local_code += "1";
            }
            else {
                local_code += "0";
            }
            if (dict.has(local_code)) {
                result += dict.get(local_code);
                local_code = "";
            }
        }
    });
    return result;
}
exports.decodeText = decodeText;
//# sourceMappingURL=Decoder.js.map