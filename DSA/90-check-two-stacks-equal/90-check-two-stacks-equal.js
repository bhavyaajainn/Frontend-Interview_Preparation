// Program to Check if Two Stacks are Equal

class Stack {
  constructor() {
    this.data = [];
  }
  push(val)   { this.data.push(val); }
  pop()       { return this.data.pop(); }
  peek()      { return this.data[this.data.length - 1]; }
  isEmpty()   { return this.data.length === 0; }
  size()      { return this.data.length; }
}

// Check equality — O(n) time, O(1) space
function equalStacks(stack1, stack2) {
  // Write your solution here
  // Step 1: if stack1.size() !== stack2.size(), return false
  // Step 2: while stack1 is not empty:
  //   if stack1.peek() === stack2.peek() → pop both
  //   else → return false
  // Step 3: return true
}

// Sample test cases
function testEqualStacks() {
  const tests = [
    {
      s1: [2, 9, 3, 7, 5], s2: [2, 9, 3, 7, 5],
      expected: true,   label: 'equal stacks'
    },
    {
      s1: [1, 2, 3],    s2: [1, 2, 4],
      expected: false,  label: 'different top values'
    },
    {
      s1: [1, 2, 3],    s2: [1, 2],
      expected: false,  label: 'different sizes'
    },
    {
      s1: [],           s2: [],
      expected: true,   label: 'both empty'
    },
    {
      s1: [1],          s2: [1],
      expected: true,   label: 'single equal element'
    },
    {
      s1: [1, 2],       s2: [2, 1],
      expected: false,  label: 'same elements different order'
    },
  ];

  for (let { s1, s2, expected, label } of tests) {
    const stack1 = new Stack();
    const stack2 = new Stack();
    s1.forEach(v => stack1.push(v));
    s2.forEach(v => stack2.push(v));
    const result = equalStacks(stack1, stack2);
    const pass = result === expected;
    console.log(`[${label}]: ${pass ? "Success" : "Fail"} (got ${result}, expected ${expected})`);
  }
}
testEqualStacks();

module.exports = { equalStacks, Stack };
