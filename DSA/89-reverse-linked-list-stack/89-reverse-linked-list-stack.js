// Reverse a Linked List Using a Stack

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  append(val) {
    const node = new Node(val);
    if (!this.head) { this.head = node; return; }
    let curr = this.head;
    while (curr.next) curr = curr.next;
    curr.next = node;
  }

  toArray() {
    const result = [];
    let curr = this.head;
    while (curr) { result.push(curr.val); curr = curr.next; }
    return result;
  }
}

// Reverse using a stack — O(n) time, O(n) space
function reverseLL(list) {
  // Write your solution here
  // Step 1: traverse the list, push each node's value onto a stack []
  // Step 2: create a new LinkedList
  // Step 3: pop from stack one by one and append to new list (LIFO gives reverse order)
  // Return the new reversed LinkedList
}

// Sample test cases
function testReverseLL() {
  const tests = [
    { input: [20, 5, 30, 7, 3],  expected: [3, 7, 30, 5, 20] },
    { input: [1, 2],              expected: [2, 1] },
    { input: [42],                expected: [42] },             // single node
    { input: [5, 4, 3, 2, 1],    expected: [1, 2, 3, 4, 5] }, // already reversed
    { input: [],                  expected: [] },               // empty list
  ];

  for (let { input, expected } of tests) {
    const ll = new LinkedList();
    input.forEach(v => ll.append(v));
    const reversed = reverseLL(ll);
    const result = reversed ? reversed.toArray() : [];
    const pass = JSON.stringify(result) === JSON.stringify(expected);
    console.log(`reverseLL([${input}]): ${pass ? "Success" : "Fail"} (got [${result}], expected [${expected}])`);
  }

  // Verify original list is not mutated
  const original = new LinkedList();
  [1, 2, 3].forEach(v => original.append(v));
  reverseLL(original);
  const notMutated = JSON.stringify(original.toArray()) === JSON.stringify([1, 2, 3]);
  console.log(`Original list not mutated: ${notMutated ? "Pass" : "Fail"}`);
}
testReverseLL();

module.exports = { reverseLL, LinkedList, Node };
