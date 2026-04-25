// Shell Sort

function shellSort(arr) {
  // Write your solution here — sorts arr in-place
  // Hint: use gap sequence N/2, N/4, ..., 1
  // At each gap, apply insertion sort logic across gap-separated elements
}

// Sample test cases
function testShellSort() {
  console.log("--- shellSort ---");
  const tests = [
    { arr: [9, 8, 3, 7, 5, 6, 4, 1],  expected: [1, 3, 4, 5, 6, 7, 8, 9] },
    { arr: [1, 2, 3, 4, 5],            expected: [1, 2, 3, 4, 5] },   // already sorted
    { arr: [5, 4, 3, 2, 1],            expected: [1, 2, 3, 4, 5] },   // reverse sorted
    { arr: [10, -1, 3, 0, -5],         expected: [-5, -1, 0, 3, 10] },
    { arr: [3, 3, 3],                  expected: [3, 3, 3] },          // all same
    { arr: [1],                        expected: [1] },                // single element
  ];
  for (let { arr, expected } of tests) {
    let input = [...arr];
    shellSort(input);
    let pass = JSON.stringify(input) === JSON.stringify(expected);
    console.log(`shellSort([${arr}]): ${pass ? "Success" : "Fail"} (got [${input}], expected [${expected}])`);
  }
}
testShellSort();

module.exports = { shellSort };
