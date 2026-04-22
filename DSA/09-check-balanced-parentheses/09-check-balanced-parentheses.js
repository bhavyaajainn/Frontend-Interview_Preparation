// Check if given expression has balanced parentheses
function checkBalancedParentheses(str) {
  const stack = [];

  for (let i = 0; i < str.length; i++) {
    if (str[i] == "(" || str[i] == "[" || str[i] == "{") {
      stack.push(str[i]);
    } else {
      if (stack.length != 0) {
        if (str[i] == ")") {
          let item = stack.pop();
          if (item != "(") {
            return false;
          }
        }
        if (str[i] == "]") {
          let item = stack.pop();
          if (item != "[") {
            return false;
          }
        }
        if (str[i] == "}") {
          let item = stack.pop();
          if (item != "{") {
            return false;
          }
        }
      } else {
        return false;
      }
    }
  }
  if (stack.length != 0) {
    return false;
  }
  return true;
}

// Example usage:
console.log(checkBalancedParentheses("[{}]")); // true
console.log(checkBalancedParentheses("[{}{}{}{]")); // false
console.log(checkBalancedParentheses("({[]}){}[][({})]")); // true

function testCheckBalancedParentheses() {
  let tests = [
    { str: "[{}]", expected: true },
    { str: "[{}{}{}{]", expected: false },
    { str: "({[]}){}[][({})]", expected: true },
    { str: "([)]", expected: false },
  ];
  for (let { str, expected } of tests) {
    let result = checkBalancedParentheses(str);
    let pass = result === expected;
    console.log(`Test str='${str}': ${pass ? "Success" : "Fail"}`);
  }
}
testCheckBalancedParentheses();

module.exports = checkBalancedParentheses;
