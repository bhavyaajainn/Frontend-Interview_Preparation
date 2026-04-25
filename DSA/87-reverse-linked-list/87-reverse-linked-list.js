// Reverse a Linked List

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

// Iterative reversal — O(n) time, O(1) space
function reverse(head) {
  // Write your solution here
  // Hint: use three pointers — prev = null, current = head, next = null
  // In each iteration: save next, flip current.next to prev, advance both pointers
  // Return prev after the loop (new head)
}

// Sample test cases
function testReverse() {
  const tests = [
    { input: [20, 5, 30, 7, 3],  expected: [3, 7, 30, 5, 20] },
    { input: [1, 2],              expected: [2, 1] },
    { input: [42],                expected: [42] },             // single node
    { input: [5, 4, 3, 2, 1],    expected: [1, 2, 3, 4, 5] },
    { input: [],                  expected: [] },               // empty list
  ];

  for (let { input, expected } of tests) {
    const ll = new LinkedList();
    input.forEach(v => ll.append(v));
    const newHead = reverse(ll.head);
    const result = [];
    let curr = newHead;
    while (curr) { result.push(curr.val); curr = curr.next; }
    const pass = JSON.stringify(result) === JSON.stringify(expected);
    console.log(`reverse([${input}]): ${pass ? "Success" : "Fail"} (got [${result}], expected [${expected}])`);
  }
}
testReverse();

module.exports = { reverse, LinkedList, Node };
