// Count Number of Substrings Recursively

// O(n) time, O(n) call stack space
function countSubString(str, subStr, n1 = str.length, n2 = subStr.length) {
  // Write your solution here
  // Base case: if n1 === 0 || n1 < n2 → return 0
  // If str.substring(0, n2) === subStr:
  //   → return countSubString(str.substring(n2), subStr) + 1
  // Else:
  //   → return countSubString(str.substring(1), subStr)
}

// Sample test cases
function testCountSubString() {
  const tests = [
    { str: 'learnersbucket', sub: 'e',   expected: 3, label: 'single char substring' },
    { str: 'abcabcabc',      sub: 'abc', expected: 3, label: 'multi-char, consecutive' },
    { str: 'hello',          sub: 'xyz', expected: 0, label: 'no match' },
    { str: 'aXaYa',          sub: 'a',   expected: 3, label: 'matches at start and end' },
    { str: 'aaaa',           sub: 'aa',  expected: 2, label: 'non-overlapping — aa|aa' },
    { str: '',               sub: 'a',   expected: 0, label: 'empty string' },
    { str: 'abc',            sub: 'abcd',expected: 0, label: 'substring longer than string' },
  ];

  for (let { str, sub, expected, label } of tests) {
    const result = countSubString(str, sub);
    const pass = result === expected;
    console.log(`[${label}] countSubString('${str}', '${sub}'): ${pass ? "Success" : "Fail"} (got ${result}, expected ${expected})`);
  }
}
testCountSubString();

module.exports = { countSubString };
