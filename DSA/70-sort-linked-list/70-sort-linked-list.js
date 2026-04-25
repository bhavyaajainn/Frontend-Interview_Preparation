// Sorting a linked list using insertion sort

class Node {
  constructor(element, next = null) {
    this.element = element;
    this.next = next;
  }
}

// Helper: build linked list from array
function buildList(arr) {
  if (!arr.length) return null;
  let head = new Node(arr[0]);
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = new Node(arr[i]);
    current = current.next;
  }
  return head;
}

// Helper: convert linked list to array for comparison
function listToArray(head) {
  let result = [];
  while (head !== null) {
    result.push(head.element);
    head = head.next;
  }
  return result;
}

function sortedInsert(sorted, newNode) {
  // Write your helper here — inserts newNode into correct position in sorted list
}

function insertionSort(head) {
  // Write your solution here
}

// Sample test cases
function testInsertionSort() {
  const tests = [
    { arr: [10, 5, 22, 3, 17, 10], expected: [3, 5, 10, 10, 17, 22] },
    { arr: [5, 3, 1],              expected: [1, 3, 5] },           // reverse sorted
    { arr: [1, 2, 3],              expected: [1, 2, 3] },           // already sorted
    { arr: [7],                    expected: [7] },                  // single node
    { arr: [2, 2, 2],              expected: [2, 2, 2] },            // all same
    { arr: [-3, 0, -1, 2, -5],    expected: [-5, -3, -1, 0, 2] },  // negatives
  ];

  for (let { arr, expected } of tests) {
    let head = buildList(arr);
    let sorted = insertionSort(head);
    let result = listToArray(sorted);
    let pass = JSON.stringify(result) === JSON.stringify(expected);
    console.log(
      `insertionSort([${arr}]): ${pass ? "Success" : "Fail"} (got [${result}], expected [${expected}])`
    );
  }
}
testInsertionSort();

module.exports = { insertionSort, sortedInsert, Node };
