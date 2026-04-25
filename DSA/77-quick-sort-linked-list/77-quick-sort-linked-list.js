// Quick sort using linked list

class Node {
  constructor(element, next = null) {
    this.element = element;
    this.next = next;
  }
}

function partitionLast(start, end) {
  // Write your partition helper here
  // Uses last node as pivot, swaps values (not nodes)
  // Returns pivot_prev (last node in the "< pivot" region)
}

function sort(start, end) {
  // Write your recursive quick sort here
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

// Helper: get tail node
function getTail(head) {
  while (head && head.next) head = head.next;
  return head;
}

// Helper: convert linked list to array
function listToArray(head) {
  let result = [];
  while (head !== null) {
    result.push(head.element);
    head = head.next;
  }
  return result;
}

// Sample test cases
function testQuickSortLL() {
  const tests = [
    { arr: [30, 3, 4, 20, 5],  expected: [3, 4, 5, 20, 30] },
    { arr: [10, 1, 8],          expected: [1, 8, 10] },
    { arr: [5],                  expected: [5] },                   // single node
    { arr: [4, 3, 2, 1],        expected: [1, 2, 3, 4] },           // reverse sorted
    { arr: [1, 2, 3, 4],        expected: [1, 2, 3, 4] },           // already sorted
    { arr: [-3, 0, -1, 2, -5], expected: [-5, -3, -1, 0, 2] },    // negatives
    { arr: [5, 5, 5],           expected: [5, 5, 5] },              // all same
  ];

  for (let { arr, expected } of tests) {
    let head = buildList(arr);
    let end = getTail(head);
    sort(head, end);
    let result = listToArray(head);
    let pass = JSON.stringify(result) === JSON.stringify(expected);
    console.log(
      `quickSortLL([${arr}]): ${pass ? "Success" : "Fail"} (got [${result}], expected [${expected}])`
    );
  }
}
testQuickSortLL();

module.exports = { sort, partitionLast, Node };
