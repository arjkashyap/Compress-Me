// function takes the compression string and returns a frequency map
export function createFrequencyMap(text: string): Map<string, number> {
  let freqMap: Map<string, number> = new Map();
  const n: number = text.length;
  for (let i = 0; i < n; i++) {
    const currChar: string = text[i];

    if (freqMap.has(currChar))
      freqMap.set(currChar, freqMap.get(currChar)! + 1);
    else freqMap.set(currChar, 1);
  }
  return freqMap;
}
