// Decode a String (Encoded with Number Followed by String)

// Two-stack approach — O(n²) time, O(n) space
function decodeString(str) {
  // Write your solution here
  // Use numStack = [] and charStack = []
  // For each character:
  //   digit  → numStack.push(val)
  //   '['    → charStack.push('['); if prev char is NOT digit → numStack.push(1)
  //   ']'    → pop count from numStack
  //            collect chars from charStack until '[' is found
  //            repeat collected string `count` times
  //            push each char of result back onto charStack
  //   letter → charStack.push(val)
  // Return charStack.join('')
}

// Sample test cases
function testDecodeString() {
  const tests = [
    { input: '2[a2[b]]',    expected: 'abbabb',          label: 'nested encoding' },
    { input: '3[b2[ca]]',   expected: 'bcacabcacabcaca', label: 'nested multi-char' },
    { input: '3[abc]',      expected: 'abcabcabc',       label: 'simple no nesting' },
    { input: '2[ab]3[c]',   expected: 'ababccc',         label: 'sequential groups' },
    { input: '1[x]',        expected: 'x',               label: 'repeat once' },
    { input: 'abc',         expected: 'abc',             label: 'no encoding' },
  ];

  for (let { input, expected, label } of tests) {
    const result = decodeString(input);
    const pass = result === expected;
    console.log(`[${label}] '${input}': ${pass ? "Success" : "Fail"} (got '${result}', expected '${expected}')`);
  }
}
testDecodeString();

module.exports = { decodeString };
