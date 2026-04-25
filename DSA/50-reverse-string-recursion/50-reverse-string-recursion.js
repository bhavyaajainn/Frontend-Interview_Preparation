// Reverse a string using recursion

function reverseString(str, n = str.length) {
  if (n == 0) {
    return "";
  }
  return str[n - 1] + reverseString(str, n - 1);
}

// Sample test cases
function testReverseString() {
  let tests = [
    { str: "prashant", expected: "tnahsarp" }, // standard case
    { str: "hello", expected: "olleh" }, // even-length string
    { str: "abcd", expected: "dcba" }, // simple 4-char
    { str: "a", expected: "a" }, // single character
    { str: "", expected: "" }, // empty string (base case)
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
