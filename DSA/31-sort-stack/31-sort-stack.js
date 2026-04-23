// Sort a stack using another stack

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
}

function sortStack(stack) {
  let tmpStack = new Stack();
  while (!stack.isEmpty()) {
    let ele = stack.pop();
    while (!tmpStack.isEmpty() && tmpStack.peek() > ele) {
      stack.push(tmpStack.pop());
    }
    tmpStack.push(ele);
  }
  return tmpStack;
}

// Sample test cases
function testSortStack() {
  let tests = [
    { input: [5, 10, 17, 11, 2, 23], expected: [2, 5, 10, 11, 17, 23] },
    { input: [3, 1, 4, 1, 5], expected: [1, 1, 3, 4, 5] },
    { input: [7], expected: [7] },
    { input: [1, 2, 3, 4, 5], expected: [1, 2, 3, 4, 5] },
    { input: [9, 3, 6, 1], expected: [1, 3, 6, 9] },
  ];

  for (let { input, expected } of tests) {
    let stack = new Stack();
    for (let val of input) stack.push(val);

    let sorted = sortStack(stack);
    let result = [];
    while (!sorted.isEmpty()) result.unshift(sorted.pop());

    let pass = JSON.stringify(result) === JSON.stringify(expected);
    console.log(
      `sortStack: input=[${input}]: ${pass ? "Success" : "Fail"} (got [${result}], expected [${expected}])`,
    );
  }
}
testSortStack();

module.exports = { sortStack, Stack };
