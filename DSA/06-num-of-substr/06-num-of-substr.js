// Count Number of Substring Occurrences in a String
function countSubstring(S, P, overlapping = true) {
  let string = S + "";
  let substring = P + "";
  if (substring.length <= 0) {
    return string.length + 1;
  }
  let count = 0,
    pos = 0,
    step = overlapping ? 1 : substring.length;
  while (true) {
    pos = string.indexOf(substring, pos);
    if (pos >= 0) {
      ++count;
      pos += step;
    } else {
      break;
    }
  }
  return count;
}

// Sample test cases
function testCountSubstring() {
  let tests = [
    { S: "aaa", P: "aa", overlapping: true, expected: 2 },
    { S: "aaa", P: "aa", overlapping: false, expected: 1 },
    { S: "abababa", P: "aba", overlapping: true, expected: 3 },
    { S: "abababa", P: "aba", overlapping: false, expected: 2 },
    { S: "aaaaa", P: "aa", overlapping: true, expected: 4 },
    { S: "aaaaa", P: "aa", overlapping: false, expected: 2 },
  ];
  for (let { S, P, overlapping, expected } of tests) {
    let result = countSubstring(S, P, overlapping);
    let pass = result === expected;
    console.log(
      `Test S='${S}', P='${P}', overlapping=${overlapping}: ${
        pass ? "Success" : "Fail"
      }`
    );
  }
}
testCountSubstring();

module.exports = countSubstring;
