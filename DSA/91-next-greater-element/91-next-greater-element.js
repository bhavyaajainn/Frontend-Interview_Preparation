// Program to Print the Next Greater Element in the Array

// Approach 1: Brute Force — O(n²) time, O(1) space
function nextGreater(arr, n = arr.length) {
  // Write your solution here
  // Hint: outer loop picks each element, inner loop finds first greater to the right
  // If none found, print -1
  // Print: `${arr[i]} ---> ${next}`
}

// Approach 2: Stack — O(n) time, O(n) space
function nextGreaterWithStack(arr, n = arr.length) {
  // Write your solution here
  // Hint:
  //   push arr[0] onto stack
  //   for each element (next = arr[i]):
  //     while stack not empty and top < next → pop and print `top ---> next`
  //     if top > next → push top back
  //     push next
  //   after loop: pop remaining elements and print `element ---> -1`
}

// Helper to capture output as array of strings for testing
function captureNextGreater(fn, arr) {
  const results = [];
  const orig = console.log;
  console.log = (...args) => results.push(args.join(' '));
  fn(arr);
  console.log = orig;
  return results;
}

// Sample test cases
function testNextGreater() {
  const tests = [
    { input: [4, 5, 2, 25],   label: 'general case' },
    { input: [11, 13, 21, 3], label: 'mixed' },
    { input: [5, 4, 3, 2, 1], label: 'all descending' },
    { input: [7],              label: 'single element' },
  ];

  for (let { input, label } of tests) {
    console.log(`\n[${label}] arr = [${input}]`);
    console.log('-- Brute Force --');
    nextGreater([...input]);
    console.log('-- Stack --');
    nextGreaterWithStack([...input]);
  }
}
testNextGreater();

module.exports = { nextGreater, nextGreaterWithStack };
