// Minimum characters to delete to make two strings anagram

function makeAnagram(a, b) {
  let CountA = 0;
  let CountB = 0;
  let arr = new Array(26);
  arr.fill(0, 0, 26);

  for (let i = 0; i < a.length; i++) {
    arr[a[i].charCodeAt() - "a".charCodeAt()]++;
    CountA++;
  }

  for (let j = 0; j < b.length; j++) {
    if (arr[b[j].charCodeAt() - "a".charCodeAt()]) {
      arr[b[j].charCodeAt() - "a".charCodeAt()]--;
      CountA--;
    } else {
      CountB++;
    }
  }
  return CountA + CountB;
}

// Sample test cases
function testMakeAnagram() {
  let tests = [
    { a: "abc", b: "cde", expected: 4 },
    { a: "ghj", b: "jhk", expected: 2 },
    { a: "abc", b: "abc", expected: 0 },
    { a: "aab", b: "bbc", expected: 4 },
    { a: "a", b: "b", expected: 2 },
    { a: "abcd", b: "ab", expected: 2 },
  ];

  for (let { a, b, expected } of tests) {
    let result = makeAnagram(a, b);
    let pass = result === expected;
    console.log(
      `makeAnagram: a="${a}", b="${b}": ${pass ? "Success" : "Fail"} (got ${result}, expected ${expected})`,
    );
  }
}
testMakeAnagram();

module.exports = { makeAnagram };
