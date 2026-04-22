// Program to find the nth Fibonacci number in javascript
function fibonacciIterative(num) {
  let a = 0;
  let b = 1;
  let c = 0;
  for (let i = 2; i <= num; i++) {
    c = a + b;
    a = b;
    b = c;
  }
  return num ? b : a;
}

function fibonacciRecursive(num) {
  if (num < 2) {
    return num;
  }
  return fibonacciRecursive(num - 1) + fibonacciRecursive(num - 2);
}

function fibonacciDP(num, memo = [0, 1]) {
  let result = memo[num];
  if (typeof result !== "number") {
    result = fibonacciDP(num - 1) + fibonacciDP(num - 2);
    memo[(num = result)];
  }
  return result;
}

// Sample test cases
function testFibonacci() {
  let tests = [
    { num: 10, expected: 55 },
    { num: 12, expected: 144 },
    { num: 9, expected: 34 },
    { num: 15, expected: 610 },
    { num: 0, expected: 0 },
    { num: 1, expected: 1 },
  ];
  for (let { num, expected } of tests) {
    let result = fibonacciIterative(num);
    let pass = result === expected;
    console.log(
      `fibonacciIterative: Test num=${num}: ${pass ? "Success" : "Fail"}`,
    );
    let recResult = fibonacciRecursive(num);
    let recPass = recResult === expected;
    console.log(
      `fibonacciRecursive: Test num=${num}: ${recPass ? "Success" : "Fail"}`,
    );
    let dpResult = fibonacciDP(num);
    let dpPass = dpResult === expected;
    console.log(`fibonacciDP: Test num=${num}: ${dpPass ? "Success" : "Fail"}`);
  }
}
testFibonacci();

module.exports = { fibonacciIterative, fibonacciRecursive, fibonacciDP };
