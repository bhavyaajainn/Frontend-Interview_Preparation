// Find factorial of a number
function factorial(num) {
  let ans = 1;
  while (num > 0) {
    ans = ans * num;
    num--;
  }
  return ans;
}

// Recursive solution
function recursiveFactorial(num) {
  return num < 1 ? 1 : num * recursiveFactorial(num - 1);
}

class Stack {
  constructor() { this.items = []; }
  push(val) { this.items.push(val); }
  pop() { return this.items.pop(); }
  isEmpty() { return this.items.length === 0; }
}

// Stack-based solution
function factorialWithStack(num) {
  let s = new Stack();

  while (num > 0) {
    s.push(num--);
  }

  let ans = 1;
  while (!s.isEmpty()) {
    ans = ans * s.pop();
  }
  return ans;
}

// Sample test cases
function testFactorial() {
  let tests = [
    { num: 5, expected: 120 },
    { num: 10, expected: 3628800 },
    { num: 12, expected: 479001600 },
    { num: 0, expected: 1 },
  ];
  for (let { num, expected } of tests) {
    let result = factorial(num);
    let pass = result === expected;
    console.log(`factorial: Test num=${num}: ${pass ? "Success" : "Fail"}`);
    let recResult = recursiveFactorial(num);
    let recPass = recResult === expected;
    console.log(
      `recursiveFactorial: Test num=${num}: ${recPass ? "Success" : "Fail"}`,
    );
    let stackResult = factorialWithStack(num);
    let stackPass = stackResult === expected;
    console.log(
      `factorialWithStack: Test num=${num}: ${stackPass ? "Success" : "Fail"}`,
    );
  }
}
testFactorial();

module.exports = { factorial, recursiveFactorial, factorialWithStack };
