// Bubble sort

function bubbleSort(arr) {
  // Write your basic bubble sort here
}

function optimizedBubbleSort(arr) {
  // Write your optimised bubble sort here (with swapped flag for early exit)
}

// Sample test cases
function testBubbleSort() {
  const tests = [
    { arr: [-5, 2, 33, 10, -7],  expected: [-7, -5, 2, 10, 33] },
    { arr: [1, 2, 3, 4, 5],      expected: [1, 2, 3, 4, 5] },    // already sorted
    { arr: [5, 4, 3, 2, 1],      expected: [1, 2, 3, 4, 5] },    // reverse sorted (worst case)
    { arr: [3],                   expected: [3] },                 // single element
    { arr: [2, 2, 2],             expected: [2, 2, 2] },           // all same
    { arr: [-3, 0, -1, 2, -5],   expected: [-5, -3, -1, 0, 2] }, // negatives
    { arr: [1, 8, 2, 4, 5],      expected: [1, 2, 4, 5, 8] },
  ];

  console.log("--- bubbleSort ---");
  for (let { arr, expected } of tests) {
    let result = bubbleSort([...arr]);
    let pass = JSON.stringify(result) === JSON.stringify(expected);
    console.log(`bubbleSort([${arr}]): ${pass ? "Success" : "Fail"} (got [${result}], expected [${expected}])`);
  }

  console.log("--- optimizedBubbleSort ---");
  for (let { arr, expected } of tests) {
    let result = optimizedBubbleSort([...arr]);
    let pass = JSON.stringify(result) === JSON.stringify(expected);
    console.log(`optimizedBubbleSort([${arr}]): ${pass ? "Success" : "Fail"} (got [${result}], expected [${expected}])`);
  }
}
testBubbleSort();

module.exports = { bubbleSort, optimizedBubbleSort };
