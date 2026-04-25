// Counting sort

function countingSort(arr) {
  // Positive integers only
  // Write your solution here
}

function countingSortNegative(arr) {
  // Handles negative integers using (arr[i] - min) as index
  // Write your solution here
}

function countingSortStr(str) {
  // Sort characters of a string using ASCII values (0-255)
  // Write your solution here
}

// Sample test cases
function testCountingSort() {
  // Positive integers
  const posTests = [
    { arr: [1, 3, 2, 8, 5, 1, 5, 1, 2, 7], expected: [1, 1, 1, 2, 2, 3, 5, 5, 7, 8] },
    { arr: [5],                              expected: [5] },
    { arr: [3, 3, 3],                        expected: [3, 3, 3] },
    { arr: [4, 2, 1, 3],                     expected: [1, 2, 3, 4] },
  ];
  console.log("--- countingSort (positive) ---");
  for (let { arr, expected } of posTests) {
    let result = countingSort([...arr]);
    let pass = JSON.stringify(result) === JSON.stringify(expected);
    console.log(`countingSort([${arr}]): ${pass ? "Success" : "Fail"} (got [${result}], expected [${expected}])`);
  }

  // Negative integers
  const negTests = [
    { arr: [-5, -10, 0, -3, 8, 5, -1, 10], expected: [-10, -5, -3, -1, 0, 5, 8, 10] },
    { arr: [-3, -1, -2],                    expected: [-3, -2, -1] },
    { arr: [0],                              expected: [0] },
  ];
  console.log("--- countingSortNegative ---");
  for (let { arr, expected } of negTests) {
    let result = countingSortNegative([...arr]);
    let pass = JSON.stringify(result) === JSON.stringify(expected);
    console.log(`countingSortNegative([${arr}]): ${pass ? "Success" : "Fail"} (got [${result}], expected [${expected}])`);
  }

  // String
  const strTests = [
    { str: "learnersbucket", expected: ["a","b","c","e","e","e","k","l","n","r","r","s","t","u"] },
    { str: "ba",             expected: ["a","b"] },
    { str: "a",              expected: ["a"] },
    { str: "zza",            expected: ["a","z","z"] },
  ];
  console.log("--- countingSortStr ---");
  for (let { str, expected } of strTests) {
    let result = countingSortStr(str);
    let pass = JSON.stringify(result) === JSON.stringify(expected);
    console.log(`countingSortStr("${str}"): ${pass ? "Success" : "Fail"} (got [${result}], expected [${expected}])`);
  }
}
testCountingSort();

module.exports = { countingSort, countingSortNegative, countingSortStr };
