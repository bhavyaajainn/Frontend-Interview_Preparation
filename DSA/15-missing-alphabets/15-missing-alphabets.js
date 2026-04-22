// Find missing alphabets to make a string panagram
function missingAlphabets(str) {
  let arr = new Array(26);
  arr.fill(0, 0, 25);
  str.toLowerCase();
  for (let i = 0; i < str.length; i++) {
    if (str[i] >= "a" && str[i] <= "z") {
      arr[str[i].charCodeAt(0) - "a".charCodeAt(0)] = true;
    }
  }
  let ans = "";
  for (let i = 0; i < 26; i++) {
    if (!arr[i]) {
      ans += String.fromCharCode(97 + i);
    }
  }
  return ans;
}

// Sample test cases
function testMissingAlphabets() {
  let tests = [
    { str: "Hi from learnersbucket", expected: "dghjpqvwxyz" },
    { str: "Learn just don't study", expected: "bcfghiklmpqvwxz" },
    { str: "abcdefghijklmnopqrstuvwxyz", expected: "" },
    { str: "", expected: "abcdefghijklmnopqrstuvwxyz" },
  ];
  for (let { str, expected } of tests) {
    let result = missingAlphabets(str);
    let pass = result === expected;
    console.log(`Test str='${str}': ${pass ? "Success" : "Fail"}`);
  }
}
testMissingAlphabets();

module.exports = missingAlphabets;
