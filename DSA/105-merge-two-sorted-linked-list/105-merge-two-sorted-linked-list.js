// Merge Two Sorted Linked Lists

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

// Method 1: Iterative — O(m+n) time, O(1) space
function mergeUtil(node1, node2) {
  // Write your solution here
  // If node1.next === null → node1.next = node2, return node1
  // curr1 = node1, next1 = node1.next, curr2 = node2
  // while next1 !== null && curr2 !== null:
  //   if curr2.element between curr1.element and next1.element:
  //     insert curr2 between curr1 and next1, advance curr1 = curr2, curr2 = next2
  //   else: advance curr1 and next1 forward; if next1.next === null, append rest of list2
}

function merge(node1, node2) {
  // Write your solution here
  // If node1 === null → return node2
  // If node2 === null → return node2 (note: original returns node2 here — should be node1)
  // Hint: start mergeUtil from the smaller head
  // if node1.element < node2.element → mergeUtil(node1, node2)
  // else → mergeUtil(node2, node1)
}

// Method 2: Recursive — O(m+n) time, O(m+n) call stack
function mergeRecursive(node1, node2) {
  // Write your solution here
  // Base cases: if node1 === null → return node2; if node2 === null → return node1
  // if node1.element < node2.element:
  //   node1.next = mergeRecursive(node1.next, node2); return node1
  // else:
  //   node2.next = mergeRecursive(node1, node2.next); return node2
}

function toArray(head) {
  const result = [];
  while (head) { result.push(head.element); head = head.next; }
  return result;
}

// Sample test cases
function testMerge() {
  const tests = [
    { l1: [1,3,5], l2: [0,2,4,6],  expected: [0,1,2,3,4,5,6], label: 'general case' },
    { l1: [1,2,3], l2: [],           expected: [1,2,3],          label: 'second list empty' },
    { l1: [],      l2: [4,5,6],      expected: [4,5,6],          label: 'first list empty' },
    { l1: [1,3,5], l2: [1,3,5],     expected: [1,1,3,3,5,5],    label: 'equal elements' },
    { l1: [1,2,3], l2: [7,8,9],     expected: [1,2,3,7,8,9],    label: 'non-overlapping ranges' },
  ];

  const methods = [
    { name: 'Iterative',  fn: merge },
    { name: 'Recursive',  fn: mergeRecursive },
  ];

  for (let { name, fn } of methods) {
    console.log(`\n--- ${name} ---`);
    for (let { l1, l2, expected, label } of tests) {
      const ll1 = new LinkedList(); l1.forEach(v => ll1.append(v));
      const ll2 = new LinkedList(); l2.forEach(v => ll2.append(v));
      const head = fn(ll1.getHead(), ll2.getHead());
      const result = toArray(head);
      const pass = JSON.stringify(result) === JSON.stringify(expected);
      console.log(`[${label}]: ${pass ? "Success" : "Fail"} (got [${result}], expected [${expected}])`);
    }
  }
}
testMerge();

module.exports = { merge, mergeRecursive, LinkedList, Node };
