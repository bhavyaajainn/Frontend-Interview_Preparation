// Merge sort

function merge(leftArr, rightArr) {
  // Write your merge helper here
}

function mergeSortRec(arr) {
  // Write your recursive merge sort here
}

// Sample test cases
function testMergeSort() {
  const tests = [
    { arr: [10, 7, 8, 9, 1, 5],        expected: [1, 5, 7, 8, 9, 10] },
    { arr: [30, 20, 10, 50, 22, 33, 55], expected: [10, 20, 22, 30, 33, 50, 55] },
    { arr: [5, 4, 3, 2, 1],             expected: [1, 2, 3, 4, 5] },    // reverse sorted
    { arr: [1, 2, 3, 4, 5],             expected: [1, 2, 3, 4, 5] },    // already sorted
    { arr: [1],                          expected: [1] },                 // single element (base case)
    { arr: [2, 2, 2],                    expected: [2, 2, 2] },           // all same
    { arr: [-3, 0, -1, 2, -5],          expected: [-5, -3, -1, 0, 2] }, // negatives
  ];

  for (let { arr, expected } of tests) {
    let result = mergeSortRec([...arr]);
    let pass = JSON.stringify(result) === JSON.stringify(expected);
    console.log(
      `mergeSortRec([${arr}]): ${pass ? "Success" : "Fail"} (got [${result}], expected [${expected}])`
    );
  }
}
testMergeSort();

module.exports = { mergeSortRec, merge };
