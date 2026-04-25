// Sort a String Ignoring the Case

// Ascending order — case-insensitive (sensitivity: 'base')
function sortAscBase(strs) {
  // Write your solution here
  // Hint: return [...strs].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
}

// Ascending order — case-sensitive (sensitivity: 'case')
function sortAscCase(strs) {
  // Write your solution here
  // Hint: same as above but sensitivity: 'case' — lowercase comes before uppercase
}

// Descending order — case-insensitive (sensitivity: 'base')
function sortDescBase(strs) {
  // Write your solution here
  // Hint: reverse the comparison — b.localeCompare(a, ...)
}

// Sample test cases
function testSortString() {
  const strs = ['de', 'ec', 'ee', 'be', 'Ae', 'BE', 'ae'];

  console.log("--- sortAscBase (ascending, case-insensitive) ---");
  const ascBaseTests = [
    { input: ['de', 'ec', 'ee', 'be', 'Ae', 'BE', 'ae'], expected: ['Ae', 'ae', 'be', 'BE', 'de', 'ec', 'ee'] },
    { input: ['Z', 'a', 'M', 'b'],                        expected: ['a', 'b', 'M', 'Z'] },
    { input: ['apple', 'Apple', 'APPLE'],                  expected: ['apple', 'Apple', 'APPLE'] },
    { input: ['a'],                                        expected: ['a'] },    // single element
  ];
  for (let { input, expected } of ascBaseTests) {
    const result = sortAscBase(input);
    const pass = JSON.stringify(result) === JSON.stringify(expected);
    console.log(`sortAscBase([${input}]): ${pass ? "Success" : "Fail"} (got [${result}], expected [${expected}])`);
  }

  console.log("--- sortAscCase (ascending, case-sensitive) ---");
  const ascCaseTests = [
    { input: ['de', 'ec', 'ee', 'be', 'Ae', 'BE', 'ae'], expected: ['ae', 'Ae', 'be', 'BE', 'de', 'ec', 'ee'] },
    { input: ['B', 'a', 'A', 'b'],                        expected: ['a', 'A', 'b', 'B'] },
  ];
  for (let { input, expected } of ascCaseTests) {
    const result = sortAscCase(input);
    const pass = JSON.stringify(result) === JSON.stringify(expected);
    console.log(`sortAscCase([${input}]): ${pass ? "Success" : "Fail"} (got [${result}], expected [${expected}])`);
  }

  console.log("--- sortDescBase (descending, case-insensitive) ---");
  const descBaseTests = [
    { input: ['de', 'ec', 'ee', 'be', 'Ae', 'BE', 'ae'], expected: ['ee', 'ec', 'de', 'be', 'BE', 'Ae', 'ae'] },
    { input: ['a', 'B', 'c'],                             expected: ['c', 'B', 'a'] },
  ];
  for (let { input, expected } of descBaseTests) {
    const result = sortDescBase(input);
    const pass = JSON.stringify(result) === JSON.stringify(expected);
    console.log(`sortDescBase([${input}]): ${pass ? "Success" : "Fail"} (got [${result}], expected [${expected}])`);
  }

  // Verify original array is not mutated
  const original = ['de', 'ec', 'ee', 'be', 'Ae', 'BE', 'ae'];
  sortAscBase(original);
  const notMutated = JSON.stringify(original) === JSON.stringify(strs);
  console.log(`Original array not mutated: ${notMutated ? "Pass" : "Fail"}`);
}
testSortString();

module.exports = { sortAscBase, sortAscCase, sortDescBase };
