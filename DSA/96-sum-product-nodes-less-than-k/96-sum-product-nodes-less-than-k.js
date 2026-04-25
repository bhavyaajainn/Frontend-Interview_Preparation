// Sum and Product of All Nodes in Linked List Less Than K

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

// O(n) time, O(1) space
function sumAndProduct(head, k) {
  // Write your solution here
  // Hint: sum = 0, product = 1
  // Traverse list: if elm < k → sum += elm, product *= elm
  // Return { sum, product }
}

// Sample test cases
function testSumAndProduct() {
  const tests = [
    {
      input: [5, 15, 17, 3, 22, 9, 2, 13], k: 15,
      expected: { sum: 32, product: 3510 },
      label: 'general case'
    },
    {
      input: [10, 20, 30],                  k: 5,
      expected: { sum: 0, product: 1 },
      label: 'no qualifying nodes'
    },
    {
      input: [1, 2, 3],                     k: 10,
      expected: { sum: 6, product: 6 },
      label: 'all nodes qualify'
    },
    {
      input: [5, 10, 15],                   k: 10,
      expected: { sum: 5, product: 5 },
      label: 'strict less than (exclude equal)'
    },
    {
      input: [7],                           k: 10,
      expected: { sum: 7, product: 7 },
      label: 'single node qualifies'
    },
  ];

  for (let { input, k, expected, label } of tests) {
    const ll = new LinkedList();
    input.forEach(v => ll.append(v));
    const result = sumAndProduct(ll.getHead(), k);
    const pass = result && result.sum === expected.sum && result.product === expected.product;
    console.log(`[${label}] k=${k}: ${pass ? "Success" : "Fail"} (got sum=${result?.sum}, product=${result?.product} | expected sum=${expected.sum}, product=${expected.product})`);
  }
}
testSumAndProduct();

module.exports = { sumAndProduct, LinkedList, Node };
