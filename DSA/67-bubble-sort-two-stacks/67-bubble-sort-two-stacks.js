// Bubble sort using two stacks

class Stack {
  // Write your Stack implementation here (push, pop, peek, isEmpty)
}

function bubbleSortWithStack(arr) {
  // Write your solution here using two Stack instances
}

// Sample test cases
function testBubbleSortWithStack() {
  const tests = [
    { arr: [10, 2, 45, 22, -1, 0], expected: [-1, 0, 2, 10, 22, 45] },
    { arr: [5, 4, 3, 2, 1],        expected: [1, 2, 3, 4, 5] },     // reverse sorted
    { arr: [1, 2, 3, 4, 5],        expected: [1, 2, 3, 4, 5] },     // already sorted
    { arr: [1],                     expected: [1] },                  // single element
    { arr: [2, 2, 2],               expected: [2, 2, 2] },            // all same
    { arr: [-3, 0, -1, 2, -5],     expected: [-5, -3, -1, 0, 2] },  // negatives
  ];

  for (let { arr, expected } of tests) {
    let input = [...arr];
    bubbleSortWithStack(input);
    let pass = JSON.stringify(input) === JSON.stringify(expected);
    console.log(
      `bubbleSortWithStack([${arr}]): ${pass ? "Success" : "Fail"} (got [${input}], expected [${expected}])`
    );
  }
}
testBubbleSortWithStack();

module.exports = { bubbleSortWithStack, Stack };
