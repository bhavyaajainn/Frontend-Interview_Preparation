// Quick sort — iterative

function swap(arr, left, right) {
  // Write your swap helper here
}

function partitionHigh(arr, low, high) {
  // Last element as pivot
  // Write your partition helper here
}

function iterativeQuickSort(arr) {
  // Write your iterative quick sort here using an explicit stack
}

// Sample test cases
function testIterativeQuickSort() {
  const tests = [
    { arr: [10, 7, 8, 9, 1, 5],     expected: [1, 5, 7, 8, 9, 10] },
    { arr: [5, 4, 3, 2, 1],          expected: [1, 2, 3, 4, 5] },    // reverse sorted
    { arr: [1, 2, 3, 4, 5],          expected: [1, 2, 3, 4, 5] },    // already sorted
    { arr: [1],                       expected: [1] },                 // single element
    { arr: [3, 1, 2],                 expected: [1, 2, 3] },
    { arr: [2, 2, 2],                 expected: [2, 2, 2] },           // all same
    { arr: [-3, 0, -1, 2, -5],       expected: [-5, -3, -1, 0, 2] }, // negatives
  ];

  for (let { arr, expected } of tests) {
    let input = [...arr];
    iterativeQuickSort(input);
    let pass = JSON.stringify(input) === JSON.stringify(expected);
    console.log(
      `iterativeQuickSort([${arr}]): ${pass ? "Success" : "Fail"} (got [${input}], expected [${expected}])`
    );
  }
}
testIterativeQuickSort();

module.exports = { iterativeQuickSort, partitionHigh, swap };
