// Check if two strings are anagram of each other

// Using sorting O(n log n)
function anagramStringsSort(str1, str2) {
  let sorted_str1 = str1.split("").sort().join("");
  let sorted_str2 = str2.split("").sort().join("");
  return sorted_str1 == sorted_str2;
}

// Using two frequency maps O(n)
function anagramStringsTwoMaps(str1, str2) {
  if (str1.length != str2.length) {
    return false;
  }
  let track1 = {};
  let track2 = {};

  for (let i = 0; i < str1.length; i++) {
    if (!track1[str1[i]]) {
      track1[str1[i]] = 1;
    } else {
      track1[str1[i]] += 1;
    }
  }

  for (let i = 0; i < str2.length; i++) {
    if (!track2[str2[i]]) {
      track2[str2[i]] = 1;
    } else {
      track2[str2[i]] += 1;
    }
  }

  for (let i = 0; i < str1.length; i++) {
    if (track1[str1[i]] !== track2[str1[i]]) {
      return false;
    }
  }
  return true;
}

// Sample test cases
function testAnagramStrings() {
  let tests = [
    { str1: "prashant", str2: "tnahsarp", expected: true },
    { str1: "learnersbucket", str2: "tekcubsrenraes", expected: false },
    { str1: "listen", str2: "silent", expected: true },
    { str1: "hello", str2: "world", expected: false },
    { str1: "abc", str2: "cab", expected: true },
    { str1: "abc", str2: "ab", expected: false },
  ];

  for (let { str1, str2, expected } of tests) {
    let r1 = anagramStringsSort(str1, str2);
    console.log(
      `sort:    "${str1}" & "${str2}": ${r1 === expected ? "Success" : "Fail"} (got ${r1}, expected ${expected})`,
    );

    let r2 = anagramStringsTwoMaps(str1, str2);
    console.log(
      `twoMaps: "${str1}" & "${str2}": ${r2 === expected ? "Success" : "Fail"} (got ${r2}, expected ${expected})`,
    );
  }
}
testAnagramStrings();

module.exports = { anagramStringsSort, anagramStringsTwoMaps };
