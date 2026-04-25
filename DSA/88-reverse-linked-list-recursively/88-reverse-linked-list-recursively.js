// Reverse a Linked List Recursively

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
}

// Recursive reversal — O(n) time, O(n) space
function reverseRecursively(head) {
  // Write your solution here
  // Base case 1: if head === null, return head
  // Base case 2: if head.next === null, return head (tail found — new head)
  // Recurse: let newHead = reverseRecursively(head.next)
  // Rewire: head.next.next = head  (point next node back to current)
  //         head.next = null       (break old forward link)
  // Return newHead (bubble it all the way up unchanged)
}

// Sample test cases
function testReverseRecursively() {
  const tests = [
    { input: [20, 5, 30, 7, 3],  expected: [3, 7, 30, 5, 20] },
    { input: [1, 2],              expected: [2, 1] },
    { input: [42],                expected: [42] },             // single node
    { input: [5, 5, 5],           expected: [5, 5, 5] },       // all same
    { input: [],                  expected: [] },               // empty list
  ];

  for (let { input, expected } of tests) {
    const ll = new LinkedList();
    input.forEach(v => ll.append(v));
    const newHead = reverseRecursively(ll.head);
    const result = [];
    let curr = newHead;
    while (curr) { result.push(curr.val); curr = curr.next; }
    const pass = JSON.stringify(result) === JSON.stringify(expected);
    console.log(`reverseRecursively([${input}]): ${pass ? "Success" : "Fail"} (got [${result}], expected [${expected}])`);
  }
}
testReverseRecursively();

module.exports = { reverseRecursively, LinkedList, Node };
