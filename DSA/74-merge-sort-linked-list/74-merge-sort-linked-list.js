// Merge sort a linked list

class Node {
  constructor(element, next = null) {
    this.element = element;
    this.next = next;
  }
}

// Helper: find the middle node using slow/fast pointer
function llMiddle(head) {
  // Write your middle-finder here
  if (head == null) {
    return head;
  }
  let slow = head;
  let fast = head;
  while (fast.next != null && fast.next.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}

// Helper: merge two sorted linked lists
function sortedMerge(a, b) {
  let result = null;
  if (a === null) {
    return b;
  }
  if (b === null) {
    return a;
  }
  if (a.element <= b.element) {
    result = a;
    result.next = sortedMerge(a.next, b);
  } else {
    result = b;
    result.next = sortedMerge(a, b.next);
  }
  return result;
  // Write your recursive merge here
}

// Main: merge sort the linked list
function mergeSortWithLL(head) {
  if (head == null || head.next == null) {
    return head;
  }
  let middle = llMiddle(head);
  let middleNext = middle.next;
  middle.next = null;

  let left = mergeSortWithLL(head);
  let right = mergeSortWithLL(middleNext);
  return sortedMerge(left, right);
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
function testMergeSortWithLL() {
  const tests = [
    { arr: [40, 10, 35, 70, 22, 3, 5], expected: [3, 5, 10, 22, 35, 40, 70] },
    { arr: [5, 3, 1], expected: [1, 3, 5] }, // reverse sorted
    { arr: [1, 2, 3], expected: [1, 2, 3] }, // already sorted
    { arr: [7], expected: [7] }, // single node (base case)
    { arr: [10, 10, 5], expected: [5, 10, 10] }, // duplicates
    { arr: [-3, 0, -1, 2, -5], expected: [-5, -3, -1, 0, 2] }, // negatives
  ];

  for (let { arr, expected } of tests) {
    let head = buildList(arr);
    let sorted = mergeSortWithLL(head);
    let result = listToArray(sorted);
    let pass = JSON.stringify(result) === JSON.stringify(expected);
    console.log(
      `mergeSortWithLL([${arr}]): ${pass ? "Success" : "Fail"} (got [${result}], expected [${expected}])`,
    );
  }
}
testMergeSortWithLL();

module.exports = { mergeSortWithLL, sortedMerge, llMiddle, Node };
