// Bucket sort

// Positive floating values [0, 1)
function bucketSort(arr) {
  // Write your solution here — sorts arr in-place
}

// Mixed positive and negative floating values
function sortMixed(arr) {
  // Write your solution here — sorts arr in-place
  // Hint: separate negatives and positives, sort each group, merge back
}

// Sample test cases
function testBucketSort() {
  console.log("--- bucketSort (positive floats) ---");
  const posTests = [
    {
      arr: [0.42, 0.32, 0.33, 0.52, 0.37, 0.47, 0.51],
      expected: [0.32, 0.33, 0.37, 0.42, 0.47, 0.51, 0.52],
    },
    { arr: [0.5],              expected: [0.5] },
    { arr: [0.1, 0.2, 0.3],   expected: [0.1, 0.2, 0.3] },   // already sorted
    { arr: [0.9, 0.5, 0.1],   expected: [0.1, 0.5, 0.9] },
    { arr: [0.3, 0.3, 0.3],   expected: [0.3, 0.3, 0.3] },   // all same
  ];
  for (let { arr, expected } of posTests) {
    let input = [...arr];
    bucketSort(input);
    let pass = JSON.stringify(input) === JSON.stringify(expected);
    console.log(`bucketSort([${arr}]): ${pass ? "Success" : "Fail"} (got [${input}], expected [${expected}])`);
  }

  console.log("--- sortMixed (mixed floats) ---");
  const mixedTests = [
    {
      arr: [-0.897, 0.565, 0.656, -0.1234, 0, 0.3434],
      expected: [-0.897, -0.1234, 0, 0.3434, 0.565, 0.656],
    },
    { arr: [-0.5, 0.5],        expected: [-0.5, 0.5] },
    { arr: [0],                 expected: [0] },
    { arr: [-0.3, -0.1, -0.2], expected: [-0.3, -0.2, -0.1] },  // all negative
  ];
  for (let { arr, expected } of mixedTests) {
    let input = [...arr];
    sortMixed(input);
    let pass = JSON.stringify(input) === JSON.stringify(expected);
    console.log(`sortMixed([${arr}]): ${pass ? "Success" : "Fail"} (got [${input}], expected [${expected}])`);
  }
}
testBucketSort();

module.exports = { bucketSort, sortMixed };
