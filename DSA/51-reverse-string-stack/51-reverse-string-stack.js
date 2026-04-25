// Reverse a string using stack

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
  isEmpty() {
    return this.data.length === 0;
  }
}

function reverseString(str) {
  let stack = new Stack();
  for (let i = 0; i < str.length; i++) {
    stack.push(str[i]);
  }
  let ans = "";
  while (!stack.isEmpty()) {
    ans += stack.pop();
  }
  return ans;
}

// Sample test cases
function testReverseString() {
  let tests = [
    { str: "prashant", expected: "tnahsarp" }, // standard case
    { str: "hello", expected: "olleh" }, // even-length string
    { str: "abcd", expected: "dcba" }, // simple 4-char
    { str: "a", expected: "a" }, // single character
    { str: "", expected: "" }, // empty string
    { str: "racecar", expected: "racecar" }, // palindrome
    { str: "ab", expected: "ba" }, // two characters
  ];

  for (let { str, expected } of tests) {
    let result = reverseString(str);
    let pass = result === expected;
    console.log(
      `reverseString("${str}"): ${pass ? "Success" : "Fail"} (got "${result}", expected "${expected}")`,
    );
  }
}
testReverseString();

module.exports = { reverseString };
