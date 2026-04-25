// Recursively Reverse a Doubly Linked List

class Node {
  constructor(val) {
    this.element = val;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() { this.head = null; }
  append(val) {
    const node = new Node(val);
    if (!this.head) { this.head = node; return; }
    let curr = this.head;
    while (curr.next) curr = curr.next;
    curr.next = node;
    node.prev = curr;
  }
  toArray(head) {
    const result = [];
    let curr = head;
    while (curr) { result.push(curr.element); curr = curr.next; }
    return result;
  }
}

// Recursive reversal — O(n) time, O(n) call stack space
function reverseDLL(node) {
  // Write your solution here
  // Base case: if node === null → return null
  // Swap node.next and node.prev (use temp variable)
  // If node.prev === null (old next was null, i.e., we've reached original tail)
  //   → return node (this is the new head)
  // Recurse: return reverseDLL(node.prev)  ← node.prev is now the old node.next
}

// Sample test cases
function testRecursiveReverseDLL() {
  const tests = [
    { input: [10, 20, 30, 40, 50], expected: [50, 40, 30, 20, 10], label: 'general case' },
    { input: [1, 2],               expected: [2, 1],               label: 'two nodes' },
    { input: [42],                 expected: [42],                 label: 'single node' },
    { input: [5, 4, 3, 2, 1],     expected: [1, 2, 3, 4, 5],     label: 'already reversed input' },
  ];

  for (let { input, expected, label } of tests) {
    const dll = new DoublyLinkedList();
    input.forEach(v => dll.append(v));
    const newHead = reverseDLL(dll.head);
    const result = dll.toArray(newHead);
    const pass = JSON.stringify(result) === JSON.stringify(expected);
    console.log(`[${label}]: ${pass ? "Success" : "Fail"} (got [${result}], expected [${expected}])`);
  }
}
testRecursiveReverseDLL();

module.exports = { reverseDLL, DoublyLinkedList, Node };
