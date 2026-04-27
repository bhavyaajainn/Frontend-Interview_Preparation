// Bubble sort

function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) {
      break;
    }
  }
  return arr;
}

// Sample test cases
function testBubbleSort() {
  const tests = [
    { arr: [-5, 2, 33, 10, -7], expected: [-7, -5, 2, 10, 33] },
    { arr: [1, 2, 3, 4, 5], expected: [1, 2, 3, 4, 5] }, // already sorted
    { arr: [5, 4, 3, 2, 1], expected: [1, 2, 3, 4, 5] }, // reverse sorted (worst case)
    { arr: [3], expected: [3] }, // single element
    { arr: [2, 2, 2], expected: [2, 2, 2] }, // all same
    { arr: [-3, 0, -1, 2, -5], expected: [-5, -3, -1, 0, 2] }, // negatives
    { arr: [1, 8, 2, 4, 5], expected: [1, 2, 4, 5, 8] },
  ];

  console.log("--- bubbleSort ---");
  for (let { arr, expected } of tests) {
    let result = bubbleSort([...arr]);
    let pass = JSON.stringify(result) === JSON.stringify(expected);
    console.log(
      `bubbleSort([${arr}]): ${pass ? "Success" : "Fail"} (got [${result}], expected [${expected}])`,
    );
  }
}
testBubbleSort();

module.exports = { bubbleSort };
