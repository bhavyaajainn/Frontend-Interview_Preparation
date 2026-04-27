// Bubble sort using two stacks

class Stack {
  constructor() {
    this.items = [];
  }
  push(val) {
    this.items.push(val);
  }
  pop() {
    return this.items.pop();
  }
  peek() {
    return this.items[this.items.length - 1];
  }
  isEmpty() {
    return this.items.length === 0;
  }
  size() {
    return this.items.length;
  }
}

function bubbleSortWithStack(arr) {
  let stack1 = new Stack();
  let stack2 = new Stack();
  let n = arr.length;
  for (const elm of arr) {
    stack1.push(elm);
  }
  for (let i = 0; i < n; i++) {
    if (i % 2 == 0) {
      while (!stack1.isEmpty()) {
        let temp = stack1.pop();
        if (stack2.isEmpty()) {
          stack2.push(temp);
        } else {
          if (stack2.peek() > temp) {
            let highValue = stack2.pop();
            stack2.push(temp);
            stack2.push(highValue);
          } else {
            stack2.push(temp);
          }
        }
      }
      arr[n - i - 1] = stack2.pop();
    } else {
      while (!stack2.isEmpty()) {
        let temp = stack2.pop();
        if (stack1.isEmpty()) {
          stack1.push(temp);
        } else {
          if (stack1.peek() > temp) {
            let highValue = stack1.pop();
            stack1.push(temp);
            stack1.push(highValue);
          } else {
            stack1.push(temp);
          }
        }
      }
      arr[n - i - 1] = stack1.pop();
    }
  }
  return arr;
}

// Sample test cases
function testBubbleSortWithStack() {
  const tests = [
    { arr: [10, 2, 45, 22, -1, 0], expected: [-1, 0, 2, 10, 22, 45] },
    { arr: [5, 4, 3, 2, 1], expected: [1, 2, 3, 4, 5] }, // reverse sorted
    { arr: [1, 2, 3, 4, 5], expected: [1, 2, 3, 4, 5] }, // already sorted
    { arr: [1], expected: [1] }, // single element
    { arr: [2, 2, 2], expected: [2, 2, 2] }, // all same
    { arr: [-3, 0, -1, 2, -5], expected: [-5, -3, -1, 0, 2] }, // negatives
  ];

  for (let { arr, expected } of tests) {
    let input = [...arr];
    bubbleSortWithStack(input);
    let pass = JSON.stringify(input) === JSON.stringify(expected);
    console.log(
      `bubbleSortWithStack([${arr}]): ${pass ? "Success" : "Fail"} (got [${input}], expected [${expected}])`,
    );
  }
}
testBubbleSortWithStack();

module.exports = { bubbleSortWithStack, Stack };
