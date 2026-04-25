// Count all substrings having character k
function calc(str) {
  n = str.length;
  return Math.floor((n * (n + 1)) / 2);
}

function countSubstrings(str, char) {
  let ans = "";
  let total = calc(str);
  for (let i = 0; i < str.length; i++) {
    if (str[i] != char) {
      ans += str[i];
    } else {
      let tempTotal = calc(ans);
      total -= tempTotal;
      ans = "";
    }
  }
  if (ans) {
    let tempTotal = calc(ans);
    total -= tempTotal;
  }
  return total;
}

// Sample test cases
function testCountSubstrings() {
  let tests = [
    { str: "abb", char: "b", expected: 5 }, // basic case
    { str: "abcabc", char: "c", expected: 15 }, // multiple occurrences
    { str: "aaa", char: "a", expected: 6 }, // all chars match
    { str: "abc", char: "z", expected: 0 }, // char not present
    { str: "a", char: "a", expected: 1 }, // single char match
    { str: "a", char: "b", expected: 0 }, // single char no match
    { str: "bbbbb", char: "b", expected: 15 }, // all same chars
    { str: "abcde", char: "c", expected: 9 }, // char in middle
  ];

  for (let { str, char, expected } of tests) {
    let result = countSubstrings(str, char);
    let pass = result === expected;
    console.log(
      `countSubstrings("${str}", "${char}"): ${pass ? "Success" : "Fail"} (got ${result}, expected ${expected})`,
    );
  }
}
testCountSubstrings();

module.exports = { countSubstrings };
