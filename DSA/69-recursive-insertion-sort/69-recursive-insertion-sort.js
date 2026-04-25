// Recursive Insertion Sort

function recursiveInsertionSort(arr, i = arr.length) {
  // Write your solution here
  // Note: mutates arr in-place; no return value needed
}

// Sample test cases
function testRecursiveInsertionSort() {
  const tests = [
    { arr: [1, 8, 2, 4, 5],     expected: [1, 2, 4, 5, 8] },
    { arr: [5, 4, 3, 2, 1],     expected: [1, 2, 3, 4, 5] },    // reverse sorted (worst case)
    { arr: [1, 2, 3, 4, 5],     expected: [1, 2, 3, 4, 5] },    // already sorted (best case)
    { arr: [3],                  expected: [3] },                 // single element (base case)
    { arr: [2, 2, 2],            expected: [2, 2, 2] },           // all same
    { arr: [-3, 0, -1, 2, -5],  expected: [-5, -3, -1, 0, 2] }, // negatives
    { arr: [-5, 2, 33, 10, -7], expected: [-7, -5, 2, 10, 33] },
  ];

  for (let { arr, expected } of tests) {
    let input = [...arr];
    recursiveInsertionSort(input);
    let pass = JSON.stringify(input) === JSON.stringify(expected);
    console.log(
      `recursiveInsertionSort([${arr}]): ${pass ? "Success" : "Fail"} (got [${input}], expected [${expected}])`
    );
  }
}
testRecursiveInsertionSort();

module.exports = { recursiveInsertionSort };
