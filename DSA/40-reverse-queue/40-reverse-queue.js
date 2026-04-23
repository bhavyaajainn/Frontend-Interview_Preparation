// Program to reverse a queue using a stack

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

class Queue {
  constructor() {
    this.data = [];
  }
  enqueue(val) {
    this.data.push(val);
  }
  dequeue() {
    return this.data.shift();
  }
  peek() {
    return this.data[0];
  }
  isEmpty() {
    return this.data.length === 0;
  }
  toArray() {
    return [...this.data];
  }
}

function reverseQueue(queue) {
  let stack = new Stack();
  while (!queue.isEmpty()) {
    stack.push(queue.dequeue());
  }
  while (!stack.isEmpty()) {
    queue.enqueue(stack.pop());
  }
  return queue;
}

// Sample test cases
function testReverseQueue() {
  let tests = [
    { input: [1, 2, 3, 4, 5], expected: [5, 4, 3, 2, 1] },
    {
      input: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      expected: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    { input: [42], expected: [42] },
    { input: [1, 2], expected: [2, 1] },
  ];

  for (let { input, expected } of tests) {
    let queue = new Queue();
    for (let val of input) queue.enqueue(val);

    let reversed = reverseQueue(queue);
    let result = reversed.toArray();
    let pass = JSON.stringify(result) === JSON.stringify(expected);
    console.log(
      `reverseQueue: input=[${input}]: ${pass ? "Success" : "Fail"} (got [${result}], expected [${expected}])`,
    );
  }
}
testReverseQueue();

module.exports = { reverseQueue, Stack, Queue };
