// Program to Find the Duplicate Element in the Linked List

class Node {
  constructor(val) {
    this.element = val;
    this.next = null;
  }
}

class LinkedList {
  constructor() { this.head = null; }
  append(val) {
    const node = new Node(val);
    if (!this.head) { this.head = node; return; }
    let curr = this.head;
    while (curr.next) curr = curr.next;
    curr.next = node;
  }
  getHead() { return this.head; }
}

// Method 1: Nested Loops — O(n²) time, O(1) space
function findDuplicate(head) {
  // Write your solution here
  // Outer loop: pick each element (elm = head.element)
  // Inner loop: traverse subList = head.next, check if elm === subList.element
  // If match found → return elm
  // After full traversal → return -1
}

// Method 2: Set — O(n) time, O(n) space
function findDuplicateSet(head) {
  // Write your solution here
  // Hint: create a Set, traverse the list
  // If set.has(elm) → return elm (first duplicate found)
  // Else set.add(elm) and continue
  // After loop → return -1
}

// Sample test cases
function testFindDuplicate() {
  const tests = [
    { input: [10, 2, 5, 7, 9, 1, 2],  expected: 2,  label: 'duplicate at end' },
    { input: [1, 2, 3, 4, 5],          expected: -1, label: 'no duplicate' },
    { input: [1, 2, 2, 3, 4],          expected: 2,  label: 'adjacent duplicate' },
    { input: [3, 1, 4, 1, 5, 3],       expected: 1,  label: 'multiple duplicates, return first' },
    { input: [7],                       expected: -1, label: 'single node' },
  ];

  const methods = [
    { fn: findDuplicate,    name: 'Nested Loops' },
    { fn: findDuplicateSet, name: 'Set' },
  ];

  for (let { fn, name } of methods) {
    console.log(`\n--- ${name} ---`);
    for (let { input, expected, label } of tests) {
      const ll = new LinkedList();
      input.forEach(v => ll.append(v));
      const result = fn(ll.getHead());
      const pass = result === expected;
      console.log(`[${label}]: ${pass ? "Success" : "Fail"} (got ${result}, expected ${expected})`);
    }
  }
}
testFindDuplicate();

module.exports = { findDuplicate, findDuplicateSet, LinkedList, Node };
