// Find the Maximum Depth of Nested Parentheses in a String

// Approach 1: Brute Force — O(n) time, O(1) space
function maximumDepth(str) {
  // Write your solution here
  // Hint: use two counters — current depth (max) and total max (total_max)
  // '(' → max++, update total_max if max > total_max
  // ')' → if max > 0, max-- else return -1
  // After loop: if max !== 0, return -1, else return total_max
}

// Approach 2: Stack — O(n) time, O(n) space
function maximumDepthWithStack(str) {
  // Write your solution here
  // Hint: same logic but push '(' onto stack and pop on ')'
  // If stack is empty on ')' → unbalanced → return -1
  // After loop: if stack.length !== 0 → return -1
}

// Sample test cases
function testMaxDepth() {
  const tests = [
    { input: '( a(b) (c) (d(e(f)g)h) I (j(k)l)m)', expected: 4 },
    { input: '( p((q)) ((s)t) )',                   expected: 3 },
    { input: ' ',                                    expected: 0 },   // no parens
    { input: 'b) (c) ()',                            expected: -1 },  // unbalanced
    { input: '(((',                                  expected: -1 },  // unclosed
    { input: '()',                                   expected: 1 },   // single level
    { input: '',                                     expected: 0 },   // empty string
  ];

  console.log("--- maximumDepth (brute force) ---");
  for (let { input, expected } of tests) {
    const result = maximumDepth(input);
    const pass = result === expected;
    console.log(`maximumDepth('${input}'): ${pass ? "Success" : "Fail"} (got ${result}, expected ${expected})`);
  }

  console.log("--- maximumDepthWithStack ---");
  for (let { input, expected } of tests) {
    const result = maximumDepthWithStack(input);
    const pass = result === expected;
    console.log(`maximumDepthWithStack('${input}'): ${pass ? "Success" : "Fail"} (got ${result}, expected ${expected})`);
  }
}
testMaxDepth();

module.exports = { maximumDepth, maximumDepthWithStack };
