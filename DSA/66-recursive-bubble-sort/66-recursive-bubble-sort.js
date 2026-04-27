// Recursive Bubble Sort

function recursiveBubbleSort(arr, n = arr.length) {
  if (n == 1) {
    return arr;
  }
  for (let i = 0; i < n - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
    }
  }
  return recursiveBubbleSort(arr, n - 1);
}

// Sample test cases
function testRecursiveBubbleSort() {
  const tests = [
    { arr: [-5, 2, 33, 10, -7], expected: [-7, -5, 2, 10, 33] },
    { arr: [5, 4, 3, 2, 1], expected: [1, 2, 3, 4, 5] }, // reverse sorted
    { arr: [1, 2, 3, 4, 5], expected: [1, 2, 3, 4, 5] }, // already sorted
    { arr: [1], expected: [1] }, // single element (base case)
    { arr: [2, 2, 2], expected: [2, 2, 2] }, // all same
    { arr: [-3, 0, -1, 2, -5], expected: [-5, -3, -1, 0, 2] }, // negatives
    { arr: [1, 8, 2, 4, 5], expected: [1, 2, 4, 5, 8] },
  ];

  for (let { arr, expected } of tests) {
    let result = recursiveBubbleSort([...arr]);
    let pass = JSON.stringify(result) === JSON.stringify(expected);
    console.log(
      `recursiveBubbleSort([${arr}]): ${pass ? "Success" : "Fail"} (got [${result}], expected [${expected}])`,
    );
  }
}
testRecursiveBubbleSort();

module.exports = { recursiveBubbleSort };
