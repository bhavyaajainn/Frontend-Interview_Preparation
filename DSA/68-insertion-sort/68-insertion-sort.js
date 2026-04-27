// Insertion sort

function insertionSort(arr) {
  let n = arr.length;
  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}

// Sample test cases
function testInsertionSort() {
  const tests = [
    { arr: [1, 8, 2, 4, 5], expected: [1, 2, 4, 5, 8] },
    { arr: [5, 4, 3, 2, 1], expected: [1, 2, 3, 4, 5] }, // reverse sorted (worst case)
    { arr: [1, 2, 3, 4, 5], expected: [1, 2, 3, 4, 5] }, // already sorted (best case)
    { arr: [3], expected: [3] }, // single element
    { arr: [2, 2, 2], expected: [2, 2, 2] }, // all same
    { arr: [-3, 0, -1, 2, -5], expected: [-5, -3, -1, 0, 2] }, // negatives
    { arr: [-5, 2, 33, 10, -7], expected: [-7, -5, 2, 10, 33] },
  ];

  for (let { arr, expected } of tests) {
    let result = insertionSort([...arr]);
    let pass = JSON.stringify(result) === JSON.stringify(expected);
    console.log(
      `insertionSort([${arr}]): ${pass ? "Success" : "Fail"} (got [${result}], expected [${expected}])`,
    );
  }
}
testInsertionSort();

module.exports = { insertionSort };
