// Palindrome String
function isPalindrome(S) {
  let stack = [];
  for (let i = 0; i < S.length; i++) {
    stack.push(S[i]);
  }
  for (let i = 0; i < S.length; i++) {
    if (S[i] != stack.pop()) {
      return false;
    }
  }
  return true;
}

// Sample test cases
function testIsPalindrome() {
  let tests = [
    { S: "abba", expected: true },
    { S: "learnersbucket", expected: false },
    { S: "ABCDCBA", expected: true },
    { S: "a", expected: true },
    { S: "", expected: true },
  ];
  for (let { S, expected } of tests) {
    let result = isPalindrome(S);
    let pass = result === expected;
    console.log(`Test S='${S}': ${pass ? "Success" : "Fail"}`);
  }
}
testIsPalindrome();

module.exports = isPalindrome;
