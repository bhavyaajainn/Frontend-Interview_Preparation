// Sort string based on frequency of characters

function frequencySort(s) {
  // Write your solution here
  const frequency = s.split("").reduce((a, b) => {
    a[b] ? a[b]++ : (a[b] = 1);
    return a;
  }, {});
  const sortedCharactersArr = Object.keys(frequency).sort((a, b) => {
    if (frequency[a] > frequency[b]) {
      return -1;
    } else if (frequency[a] < frequency[b]) {
      return 1;
    } else {
      return 0;
    }
  });
  const ans = sortedCharactersArr.reduce((a, b) => {
    a += b.repeat(frequency[b]);
    return a;
  }, "");
  return ans;
}

// Helper: verify output is a valid frequency-sorted string
// (characters grouped, higher frequency first, all chars present)
function isValidFrequencySort(input, output) {
  if (input.length !== output.length) return false;

  // Check all characters match
  const sortStr = (s) => s.split("").sort().join("");
  if (sortStr(input) !== sortStr(output)) return false;

  // Check each character appears in one contiguous block
  let i = 0;
  while (i < output.length) {
    let char = output[i];
    let j = i;
    while (j < output.length && output[j] === char) j++;
    i = j;
  }

  // Check descending frequency order
  let freqMap = {};
  for (let c of input) freqMap[c] = (freqMap[c] || 0) + 1;

  let prevFreq = Infinity;
  let i2 = 0;
  while (i2 < output.length) {
    let char = output[i2];
    let freq = freqMap[char];
    if (freq > prevFreq) return false;
    prevFreq = freq;
    while (i2 < output.length && output[i2] === char) i2++;
  }

  return true;
}

function testFrequencySort() {
  const tests = [
    { s: "tree", desc: "e×2, t×1, r×1" },
    { s: "cccaaa", desc: "c×3, a×3 — any order valid" },
    { s: "Aabb", desc: "b×2, A×1, a×1 — case sensitive" },
    { s: "a", desc: "single char" },
    { s: "aabbcc", desc: "all freq equal" },
    { s: "aaabbb", desc: "a×3, b×3" },
    { s: "eeeebb", desc: "e×4, b×2" },
  ];

  for (let { s, desc } of tests) {
    let result = frequencySort(s);
    let pass = isValidFrequencySort(s, result);
    console.log(
      `frequencySort("${s}") [${desc}]: ${pass ? "Success" : "Fail"} (got "${result}")`,
    );
  }
}
testFrequencySort();

module.exports = { frequencySort };
