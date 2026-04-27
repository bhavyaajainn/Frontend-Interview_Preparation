// Iterative Merge Sort (Bottom-Up)
// Recursive solution only is fine
function merge(left, right, leftLimit, rightLimit, sorted, buffer) {
  // Write your in-place merge helper here
  // Merges sorted[left..leftLimit) and sorted[right..rightLimit) into buffer
}

function mergeSort(arr) {
  // Write your iterative (bottom-up) merge sort here
}

// Sample test cases
function testMergeSort() {
  const tests = [
    {
      arr: [30, 20, 10, 50, 22, 33, 55],
      expected: [10, 20, 22, 30, 33, 50, 55],
    },
    { arr: [10, 7, 8, 9, 1, 5], expected: [1, 5, 7, 8, 9, 10] },
    { arr: [5, 4, 3, 2, 1], expected: [1, 2, 3, 4, 5] }, // reverse sorted
    { arr: [1, 2, 3, 4, 5], expected: [1, 2, 3, 4, 5] }, // already sorted
    { arr: [1], expected: [1] }, // single element
    { arr: [2, 2, 2], expected: [2, 2, 2] }, // all same
    { arr: [-3, 0, -1, 2, -5], expected: [-5, -3, -1, 0, 2] }, // negatives
  ];

  for (let { arr, expected } of tests) {
    let result = mergeSort([...arr]);
    let pass = JSON.stringify(result) === JSON.stringify(expected);
    console.log(
      `mergeSort([${arr}]): ${pass ? "Success" : "Fail"} (got [${result}], expected [${expected}])`,
    );
  }
}
testMergeSort();

module.exports = { mergeSort, merge };
