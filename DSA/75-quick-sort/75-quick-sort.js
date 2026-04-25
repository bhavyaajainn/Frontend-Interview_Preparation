// Quick sort

function swap(arr, left, right) {
  // Write your swap helper here
}

function partitionHigh(arr, low, high) {
  // Last element as pivot (Lomuto)
  // Write your solution here
}

function partitionLow(arr, low, high) {
  // First element as pivot (Lomuto)
  // Write your solution here
}

function partitionMiddle(arr, low, high) {
  // Middle element as pivot (Hoare-style)
  // Write your solution here
}

function quicksort(arr, low = 0, high = arr.length - 1) {
  // Write your main quick sort here (use any partition strategy)
}

// Sample test cases
function testQuicksort() {
  const tests = [
    { arr: [10, 7, 8, 9, 1, 5],     expected: [1, 5, 7, 8, 9, 10] },
    { arr: [1, 2, 3, 4, 5],          expected: [1, 2, 3, 4, 5] },    // already sorted
    { arr: [5, 4, 3, 2, 1],          expected: [1, 2, 3, 4, 5] },    // reverse sorted
    { arr: [1],                       expected: [1] },                 // single element (base case)
    { arr: [2, 2, 2],                 expected: [2, 2, 2] },           // all same
    { arr: [-3, 0, -1, 2, -5],       expected: [-5, -3, -1, 0, 2] }, // negatives
    { arr: [30, 20, 10, 50, 22, 33], expected: [10, 20, 22, 30, 33, 50] },
  ];

  for (let { arr, expected } of tests) {
    let input = [...arr];
    quicksort(input);
    let pass = JSON.stringify(input) === JSON.stringify(expected);
    console.log(
      `quicksort([${arr}]): ${pass ? "Success" : "Fail"} (got [${input}], expected [${expected}])`
    );
  }
}
testQuicksort();

module.exports = { quicksort, partitionHigh, partitionLow, partitionMiddle, swap };
