// Program to Check Palindrome Linked List

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

// Method 1: Stack — O(n) time, O(n) space
function isPalindromeStack(head) {
  // Write your solution here
  // Step 1: traverse list and push each element.val onto a stack []
  // Step 2: traverse again, pop from stack and compare with current element
  // If mismatch → return false; else return true
}

// Method 2: Reverse full list — O(n) time, O(n) space
function isPalindromeReverse(head) {
  // Write your solution here
  // Step 1: deep copy the list — JSON.parse(JSON.stringify(head))
  // Step 2: reverse the copy using three-pointer technique
  // Step 3: compare each element of original and reversed list
}

// Method 3: Reverse half — O(n) time, O(1) space (best)
function isPalindromeHalf(head) {
  // Write your solution here
  // Step 1: find middle using slow (1 step) / fast (2 steps) pointer
  // Step 2: reverse the second half starting from slow
  // Step 3: compare first half and reversed second half element by element
  // Hint: for odd-length list, skip the middle node before comparing
}

// Method 4: Recursive two pointers — O(n) time, O(n) space
let left;
function isPalindromeRecursive(head, right = head) {
  // Write your solution here
  // Base case: if right === null, return true
  // Recurse: check sublist with right.next
  // On unwind: compare right.element with left.element, advance left
  // Hint: left is a module-level variable to persist across recursive frames
}

// Sample test cases
function testPalindrome() {
  const tests = [
    { input: ['D','E','N','N','E','D'], expected: true,  label: 'even palindrome' },
    { input: ['P','R','A','S','H','A','N','T'], expected: false, label: 'not palindrome' },
    { input: [1, 2, 3, 2, 1],          expected: true,  label: 'odd palindrome' },
    { input: ['A'],                     expected: true,  label: 'single node' },
    { input: [1, 2],                    expected: false, label: 'two diff elements' },
  ];

  const methods = [
    { fn: isPalindromeStack,     name: 'Stack' },
    { fn: isPalindromeReverse,   name: 'Reverse Full' },
    { fn: isPalindromeHalf,      name: 'Reverse Half' },
    { fn: (h) => { left = h; return isPalindromeRecursive(h); }, name: 'Recursive' },
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
testPalindrome();

module.exports = { isPalindromeStack, isPalindromeReverse, isPalindromeHalf, isPalindromeRecursive, LinkedList, Node };
