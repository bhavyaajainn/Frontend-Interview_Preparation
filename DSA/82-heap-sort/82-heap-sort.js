// Heap Sort

// Heapify subtree rooted at index i (Max-Heap)
function maxHeapify(arr, n, i) {
  // Write your solution here
  // Hint: find largest among arr[i], left child (2i+1), right child (2i+2)
  // If largest !== i, swap and recursively heapify the affected subtree
}

// Ascending order using Max-Heap
function heapSortAsc(arr) {
  // Write your solution here
  // Step 1: Build max-heap — heapify from Math.floor(n/2 - 1) down to 0
  // Step 2: Extract root one by one — swap arr[0] with arr[i], reduce heap size, heapify root
}

// Heapify subtree rooted at index i (Min-Heap)
function minHeapify(arr, n, i) {
  // Write your solution here
  // Hint: find smallest among arr[i], left child, right child
  // If smallest !== i, swap and recursively heapify
}

// Descending order using Min-Heap
function heapSortDesc(arr) {
  // Write your solution here — same structure as heapSortAsc but uses minHeapify
}

// Sample test cases
function testHeapSort() {
  console.log("--- heapSortAsc (ascending) ---");
  const ascTests = [
    { arr: [4, 6, 3, 2, 9],    expected: [2, 3, 4, 6, 9] },
    { arr: [1, 2, 3, 4, 5],    expected: [1, 2, 3, 4, 5] },   // already sorted
    { arr: [5, 4, 3, 2, 1],    expected: [1, 2, 3, 4, 5] },   // reverse sorted
    { arr: [3, 1, 3, 2, 3],    expected: [1, 2, 3, 3, 3] },   // duplicates
    { arr: [1],                 expected: [1] },                // single element
  ];
  for (let { arr, expected } of ascTests) {
    let input = [...arr];
    heapSortAsc(input);
    let pass = JSON.stringify(input) === JSON.stringify(expected);
    console.log(`heapSortAsc([${arr}]): ${pass ? "Success" : "Fail"} (got [${input}], expected [${expected}])`);
  }

  console.log("--- heapSortDesc (descending) ---");
  const descTests = [
    { arr: [4, 6, 3, 2, 9],    expected: [9, 6, 4, 3, 2] },
    { arr: [1, 2, 3, 4, 5],    expected: [5, 4, 3, 2, 1] },
    { arr: [3, 1, 3, 2, 3],    expected: [3, 3, 3, 2, 1] },   // duplicates
  ];
  for (let { arr, expected } of descTests) {
    let input = [...arr];
    heapSortDesc(input);
    let pass = JSON.stringify(input) === JSON.stringify(expected);
    console.log(`heapSortDesc([${arr}]): ${pass ? "Success" : "Fail"} (got [${input}], expected [${expected}])`);
  }
}
testHeapSort();

module.exports = { heapSortAsc, heapSortDesc };
