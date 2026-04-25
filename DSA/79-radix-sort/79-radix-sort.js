// Radix sort

// Counting sort helper for a specific digit place (positive integers)
function countingSort(arr, size, place) {
  // Write your counting sort helper here
  // Extracts digit at 'place' using: Math.floor(arr[i] / place) % 10
  // Modifies arr in-place
}

// Main radix sort (positive integers)
function radixSort(arr) {
  // Write your radix sort here
  // Loop: place = 1; while place <= max; place *= 10
}

// Counting sort helper for negative integers
function countingSortNegative(arr, n, place) {
  // Write your range-shifted counting sort helper here
}

// Radix sort for negative integers
function radixSortNegative(arr) {
  // Write your radix sort here (handles negatives)
}

// Sample test cases
function testRadixSort() {
  console.log("--- radixSort (positive) ---");
  const posTests = [
    { arr: [121, 432, 564, 23, 1, 45, 788], expected: [1, 23, 45, 121, 432, 564, 788] },
    { arr: [1, 2, 3, 4, 5],                  expected: [1, 2, 3, 4, 5] },   // already sorted
    { arr: [5, 4, 3, 2, 1],                  expected: [1, 2, 3, 4, 5] },   // reverse sorted
    { arr: [42],                              expected: [42] },               // single element
    { arr: [10, 10, 10],                      expected: [10, 10, 10] },       // all same
  ];
  for (let { arr, expected } of posTests) {
    let input = [...arr];
    radixSort(input);
    let pass = JSON.stringify(input) === JSON.stringify(expected);
    console.log(`radixSort([${arr}]): ${pass ? "Success" : "Fail"} (got [${input}], expected [${expected}])`);
  }

  console.log("--- radixSortNegative ---");
  const negTests = [
    { arr: [121, -432, 564, 23, -1, 45, 788], expected: [-432, -1, 23, 45, 121, 564, 788] },
    { arr: [-3, -1, -2],                       expected: [-3, -2, -1] },
    { arr: [0],                                 expected: [0] },
  ];
  for (let { arr, expected } of negTests) {
    let input = [...arr];
    radixSortNegative(input);
    let pass = JSON.stringify(input) === JSON.stringify(expected);
    console.log(`radixSortNegative([${arr}]): ${pass ? "Success" : "Fail"} (got [${input}], expected [${expected}])`);
  }
}
testRadixSort();

module.exports = { radixSort, radixSortNegative, countingSort, countingSortNegative };
