// Print the Last K Nodes of the Linked List in Reverse

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

// Method 1: Recursive — O(n) time, O(n) call stack
let count = 0;
function printInReverse(head, k) {
  // Write your solution here
  // Base case: if head === null, return
  // Recurse: printInReverse(head.next, k)
  // On the way back: count++, if count <= k → console.log(head.element)
}

// Method 2: Stack — O(n) time, O(n) space
function printInReverseStack(head, k) {
  // Write your solution here
  // Step 1: traverse list and push each element onto a stack []
  // Step 2: while k-- > 0 and stack is not empty → console.log(stack.pop())
}

// Helper to capture output for testing
function capture(fn) {
  const out = [];
  const orig = console.log;
  console.log = v => out.push(v);
  fn();
  console.log = orig;
  return out;
}

// Sample test cases
function testPrintInReverse() {
  const tests = [
    { input: [1,2,3,4,5,6,7], k: 5, expected: [7,6,5,4,3],   label: 'general case' },
    { input: [1,2,3,4],       k: 4, expected: [4,3,2,1],      label: 'k equals length' },
    { input: [1,2,3],         k: 5, expected: [3,2,1],         label: 'k > length' },
    { input: [10,20,30,40],   k: 1, expected: [40],            label: 'k = 1' },
  ];

  const methods = [
    { name: 'Recursive', fn: (ll, k) => { count = 0; printInReverse(ll.getHead(), k); } },
    { name: 'Stack',     fn: (ll, k) => printInReverseStack(ll.getHead(), k) },
  ];

  for (let { fn, name } of methods) {
    console.log(`\n--- ${name} ---`);
    for (let { input, k, expected, label } of tests) {
      const ll = new LinkedList();
      input.forEach(v => ll.append(v));
      const result = capture(() => fn(ll, k));
      const pass = JSON.stringify(result) === JSON.stringify(expected);
      console.log(`[${label}] k=${k}: ${pass ? "Success" : "Fail"} (got [${result}], expected [${expected}])`);
    }
  }
}
testPrintInReverse();

module.exports = { printInReverse, printInReverseStack, LinkedList, Node };
