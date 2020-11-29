"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFrequencyMap = void 0;
// function takes the compression string and returns a frequency map
function createFrequencyMap(text) {
    let freqMap = new Map();
    const n = text.length;
    for (let i = 0; i < n; i++) {
        const currChar = text[i];
        if (freqMap.has(currChar))
            freqMap.set(currChar, freqMap.get(currChar) + 1);
        else
            freqMap.set(currChar, 1);
    }
    return freqMap;
}
exports.createFrequencyMap = createFrequencyMap;
//# sourceMappingURL=FrequencyMap.js.map