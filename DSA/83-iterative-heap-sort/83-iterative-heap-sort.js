// Iterative Heap Sort

// Iteratively build Min-Heap (used for descending sort)
function minHeapify(arr, n) {
  // Write your solution here
  // Hint: loop i from 1 to n-1
  // If arr[i] < parent (arr[Math.floor((i-1)/2)]), bubble up using a while loop
  // Parent index: Math.floor((j - 1) / 2)
}

// Descending order using iterative Min-Heap
function heapSortDesc(arr, n = arr.length) {
  // Write your solution here
  // Step 1: minHeapify(arr, n)
  // Step 2: loop i from n-1 down to 1
  //   swap arr[0] with arr[i]
  //   re-heapify from root iteratively (do-while with left/right child index tracking)
}

// Iteratively build Max-Heap (used for ascending sort)
function maxHeapify(arr, n) {
  // Write your solution here
  // Hint: same as minHeapify but bubble up if arr[i] > parent
}

// Ascending order using iterative Max-Heap
function heapSortAsc(arr, n = arr.length) {
  // Write your solution here — same structure as heapSortDesc but uses maxHeapify
}

// Sample test cases
function testIterativeHeapSort() {
  console.log("--- heapSortDesc (descending) ---");
  const descTests = [
    { arr: [10, 20, 15, 17, 9, 21],  expected: [21, 20, 17, 15, 10, 9] },
    { arr: [5, 4, 3, 2, 1],           expected: [5, 4, 3, 2, 1] },   // already desc
    { arr: [1, 2, 3, 4, 5],           expected: [5, 4, 3, 2, 1] },   // ascending input
    { arr: [3, 3, 3],                 expected: [3, 3, 3] },          // all same
    { arr: [42],                      expected: [42] },               // single element
  ];
  for (let { arr, expected } of descTests) {
    let input = [...arr];
    heapSortDesc(input);
    let pass = JSON.stringify(input) === JSON.stringify(expected);
    console.log(`heapSortDesc([${arr}]): ${pass ? "Success" : "Fail"} (got [${input}], expected [${expected}])`);
  }

  console.log("--- heapSortAsc (ascending) ---");
  const ascTests = [
    { arr: [10, 20, 15, 17, 9, 21],  expected: [9, 10, 15, 17, 20, 21] },
    { arr: [1, 2, 3, 4, 5],           expected: [1, 2, 3, 4, 5] },   // already asc
    { arr: [5, 4, 3, 2, 1],           expected: [1, 2, 3, 4, 5] },   // descending input
    { arr: [3, 1, 3, 2, 3],           expected: [1, 2, 3, 3, 3] },   // duplicates
  ];
  for (let { arr, expected } of ascTests) {
    let input = [...arr];
    heapSortAsc(input);
    let pass = JSON.stringify(input) === JSON.stringify(expected);
    console.log(`heapSortAsc([${arr}]): ${pass ? "Success" : "Fail"} (got [${input}], expected [${expected}])`);
  }
}
testIterativeHeapSort();

module.exports = { heapSortDesc, heapSortAsc };
