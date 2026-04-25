// Reverse a Doubly Linked List

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
  getHead() { return this.head; }
  toArray(head = this.head) {
    const result = [];
    let curr = head;
    while (curr) { result.push(curr.element); curr = curr.next; }
    return result;
  }
}

// Method 1: Swap Pointers — O(n) time, O(1) space
function reverseDLL(head) {
  // Write your solution here
  // temp = null, current = head
  // while current: swap current.prev and current.next
  //   current.prev was next, so advance: current = current.prev
  // if temp !== null → new head = temp.prev
  // return new head
}

// Method 2: Swap Nodes — O(n) time, O(n) space
function reverseByNodes(head) {
  // Write your solution here
  // Traverse original list, for each node:
  //   detach it and prepend to new_head (set node.next = new_head, new_head.prev = node, node.prev = null)
  // Return new_head
}

// Method 3: Swap Data — O(n) time, O(1) space
function reverseByData(head) {
  // Write your solution here
  // left = head, right = head → advance right to tail
  // while left !== right && left.prev !== right:
  //   swap left.element and right.element
  //   left = left.next, right = right.prev
  // return head (same head, data swapped)
}

// Sample test cases
function testReverseDLL() {
  const methods = [
    { name: 'Swap Pointers', fn: reverseDLL },
    { name: 'Swap Nodes',    fn: reverseByNodes },
    { name: 'Swap Data',     fn: reverseByData },
  ];

  const tests = [
    { input: [10, 20, 30, 40, 50], expected: [50, 40, 30, 20, 10], label: 'general case' },
    { input: [1, 2],               expected: [2, 1],               label: 'two nodes' },
    { input: [42],                 expected: [42],                 label: 'single node' },
    { input: [1, 2, 3, 4, 5],     expected: [5, 4, 3, 2, 1],     label: 'odd length' },
  ];

  for (let { name, fn } of methods) {
    console.log(`\n--- ${name} ---`);
    for (let { input, expected, label } of tests) {
      const dll = new DoublyLinkedList();
      input.forEach(v => dll.append(v));
      const newHead = fn(dll.getHead());
      const result = dll.toArray(newHead);
      const pass = JSON.stringify(result) === JSON.stringify(expected);
      console.log(`[${label}]: ${pass ? "Success" : "Fail"} (got [${result}], expected [${expected}])`);
    }
  }
}
testReverseDLL();

module.exports = { reverseDLL, reverseByNodes, reverseByData, DoublyLinkedList, Node };
