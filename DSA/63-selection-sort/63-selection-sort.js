// Selection sort

function selectionSort(arr) {
  // Write your solution here
}

// Sample test cases
function testSelectionSort() {
  let tests = [
    { arr: [1, 8, 2, 4, 5],     expected: [1, 2, 4, 5, 8] },     // basic
    { arr: [64, 25, 12, 22, 11], expected: [11, 12, 22, 25, 64] }, // standard
    { arr: [5, 4, 3, 2, 1],     expected: [1, 2, 3, 4, 5] },      // reverse sorted (worst case)
    { arr: [1, 2, 3, 4, 5],     expected: [1, 2, 3, 4, 5] },      // already sorted
    { arr: [1],                  expected: [1] },                   // single element
    { arr: [2, 2, 2],            expected: [2, 2, 2] },             // all same elements
    { arr: [-3, 0, -1, 2, -5],  expected: [-5, -3, -1, 0, 2] },   // negative numbers
  ];

  for (let { arr, expected } of tests) {
    let input = [...arr];
    let result = selectionSort(input);
    let pass = JSON.stringify(result) === JSON.stringify(expected);
    console.log(
      `selectionSort([${arr}]): ${pass ? "Success" : "Fail"} (got [${result}], expected [${expected}])`
    );
  }
}
testSelectionSort();

module.exports = { selectionSort };
