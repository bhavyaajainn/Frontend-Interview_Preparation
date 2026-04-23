// Reverse a stack using recursion

class Stack {
  constructor() {
    this.data = [];
  }
  push(val) {
    this.data.push(val);
  }
  pop() {
    return this.data.pop();
  }
  peek() {
    return this.data[this.data.length - 1];
  }
  isEmpty() {
    return this.data.length === 0;
  }
  toArray() {
    return [...this.data];
  }
}

// Helper: insert element at the bottom of the stack
function insertAtBottom(temp, stack) {
  if (stack.isEmpty()) {
    stack.push(temp);
  } else {
    let x = stack.pop();
    insertAtBottom(temp, stack);
    stack.push(x);
  }
}

// Main: reverse the stack using insertAtBottom
function reverseStack(stack) {
  if (!stack.isEmpty()) {
    let temp = stack.pop();
    reverseStack(stack);
    insertAtBottom(temp, stack);
  }
}

// Sample test cases
function testReverseStack() {
  let tests = [
    { input: [1, 2, 3, 4, 5], expected: [5, 4, 3, 2, 1] },
    { input: [10, 20, 30], expected: [30, 20, 10] },
    { input: [7], expected: [7] },
    { input: [1, 2], expected: [2, 1] },
  ];

  for (let { input, expected } of tests) {
    let stack = new Stack();
    for (let val of input) stack.push(val);

    reverseStack(stack);
    let result = stack.toArray();
    let pass = JSON.stringify(result) === JSON.stringify(expected);
    console.log(
      `reverseStack: input=[${input}]: ${pass ? "Success" : "Fail"} (got [${result}], expected [${expected}])`,
    );
  }
}
testReverseStack();

module.exports = { reverseStack, insertAtBottom, Stack };
